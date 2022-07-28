<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;

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
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( $this, 'check_install_permissions' ),
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
			'plugin'   => array(
				'type'     => 'string',
				'required' => true,
			),
			'activate' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'queue'    => array(
				'type'    => 'boolean',
				'default' => true,
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

	public function initialize() {
		if ( \get_option( Options::get_option_name( 'plugins_init_status' ), 'init' ) !== 'init' ) {
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		 \update_option( Options::get_option_name( 'plugins_init_status' ), 'installing' );

		 $init_plugins = Plugins::get_init();
		foreach ( $init_plugins as $init_plugin ) {
			if ( ! PluginInstaller::exists( $init_plugin['slug'], $init_plugin['activate'] ) ) {
				 PluginInstaller::add_to_queue( $init_plugin['slug'], $init_plugin['activate'] );
			}
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}

	/**
	 * Install the requested plugin via a zip url (or) slug.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function install( \WP_REST_Request $request ) {
		$plugin     = $request->get_param( 'plugin' );
		  $activate = $request->get_param( 'activate' );
		  $queue    = $request->get_param( 'queue' );

		if ( PluginInstaller::exists( $plugin, $activate ) ) {
			return new \WP_REST_Response(
				array(),
				200
			);
		}

		if ( $queue ) {
			 PluginInstaller::add_to_queue( $plugin, $activate );
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		  return PluginInstaller::install( $plugin, $activate );
	}
}
