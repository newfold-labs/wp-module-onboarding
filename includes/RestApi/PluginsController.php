<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Class PluginsController
 */
class PluginsController {

	/**
	 * @var string
	 */
	 protected $namespace = 'newfold-onboarding/v1';

	/**
	 * @var string
	 */
	protected $rest_base = '/plugins';

	/**
	 * Registers rest routes for PluginsController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/approved',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_approved_plugins' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/install',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'install' ),
					'args'                => $this->get_install_plugin_args(),
					'permission_callback' => array( $this, 'check_install_permissions' ),
				),
			)
		);
	}

	/**
	 * Get approved plugin slugs, urls and domains.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_approved_plugins() {

		return new \WP_REST_Response(
			Plugins::get_approved(),
			200
		);
	}

	/**
	 * Get args for the install route.
	 *
	 * @return array
	 */
	public function get_install_plugin_args() {
		return array(
			'plugin' => array(
				'type'     => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Verify caller has permissions to install plugins.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return boolean
	 */
	public function check_install_permissions( \WP_REST_Request $request ) {
		$install_hash = $request->get_header( 'X-NFD-ONBOARDING' );
		return Permissions::rest_verify_plugin_install_hash( $install_hash )
			&& Permissions::rest_is_authorized_admin();
	}

	/**
	 * Install the requested plugin via a zip url (or) slug.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function install( \WP_REST_Request $request ) {
		$plugin       = $request->get_param( 'plugin' );
		$plugins_list = Plugins::get();

		// Check if the plugin param contains a zip url.
		if ( \wp_http_validate_url( $plugin ) ) {
			$domain = \wp_parse_url( $plugin, PHP_URL_HOST );
			// If the zip URL/domain is not approved.
			if ( ! isset( $plugins_list['urls'][ $plugin ] )
				&& ! isset( $plugins_list['domains'][ $domain ] ) ) {
					return new \WP_Error(
						'plugin-error',
						"You do not have permission to install from {$plugin}.",
						array( 'status' => 400 )
					);
			}

			$status = $this->install_from_zip( $plugin );
			if ( \is_wp_error( $status ) ) {
				return $status;
			}

			return new \WP_REST_Response(
				array(),
				201
			);
		}

		// If it is not a zip URL then check if it is an approved slug.
		$plugin = \sanitize_text_field( $plugin );
		if ( ! isset( $plugins_list['wp_slugs'][ $plugin ] ) ) {
			return new \WP_Error(
				'plugin-error',
				"You do not have permission to install {$plugin}.",
				array( 'status' => 400 )
			);
		}

		$status = $this->install_from_wordpress( $plugin );
		if ( \is_wp_error( $status ) ) {
			return $status;
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	/**
	 * @param string $slug Representing the wordpress.org slug.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	protected function install_from_wordpress( $slug ) {
		$request = new \WP_REST_Request(
			'POST',
			'/wp/v2/plugins'
		);
		$request->set_body_params(
			array(
				'slug'   => $slug,
				'status' => 'active',
			)
		);

		$response = \rest_do_request( $request );
		if ( $response->is_error() ) {
			return $response->as_error();
		}

		return new \WP_REST_Response(
			null,
			200
		);
	}

	/**
	 * @param string $url URL to the zip for the plugin.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	protected function install_from_zip( $url ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/misc.php';
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		\wp_cache_flush();
		$skin     = new \WP_Ajax_Upgrader_Skin();
		$upgrader = new \Plugin_Upgrader( $skin );

		$result = $upgrader->install( $url );
		if ( \is_wp_error( $result ) ) {
			$result->add_data( array( 'status' => 500 ) );

			return $result;
		}
		if ( \is_wp_error( $skin->result ) ) {
			$skin->result->add_data( array( 'status' => 500 ) );

			return $skin->result;
		}
		if ( $skin->get_errors()->has_errors() ) {
			$error = $skin->get_errors();
			$error->add_data( array( 'status' => 500 ) );

			return $error;
		}
		if ( is_null( $result ) ) {
			// Pass through the error from WP_Filesystem if one was raised.
			if ( $wp_filesystem instanceof \WP_Filesystem_Base
				&& \is_wp_error( $wp_filesystem->errors ) && $wp_filesystem->errors->has_errors()
			) {
				return new \WP_Error(
					'unable_to_connect_to_filesystem',
					$wp_filesystem->errors->get_error_message(),
					array( 'status' => 500 )
				);
			}

			return new \WP_Error(
				'unable_to_connect_to_filesystem',
				'Unable to connect to the filesystem.',
				array( 'status' => 500 )
			);
		}

		$plugin_file = $upgrader->plugin_info();
		if ( ! $plugin_file ) {
			return new \WP_Error(
				'unable_to_determine_installed_plugin',
				'Unable to determine what plugin was installed.',
				array( 'status' => 500 )
			);
		}

		$status = \activate_plugin( $plugin_file );
		if ( \is_wp_error( $status ) ) {
			$status->add_data( array( 'status' => 500 ) );

			return $status;
		}

		return new \WP_REST_Response(
			null,
			200
		);
	}
}
