<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteFeatures;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;

/**
 * Class PluginsController
 */
class PluginsController {
	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The base of this controller's route.
	 *
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
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( PluginInstaller::class, 'check_install_permissions' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/site-features',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_site_features' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'set_site_features' ),
					'args'                => $this->set_site_features_args(),
					'permission_callback' => array( PluginInstaller::class, 'check_install_permissions' ),
				),
			)
		);
	}

	/**
	 * Get the set site features arguments.
	 *
	 * @return array
	 */
	public function set_site_features_args() {
		return array(
			'plugins' => array(
				'type'     => 'object',
				'required' => true,
			),
		);
	}

	/**
	 * Queue in the initial list of plugins to be installed.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize() {

		if ( PluginService::queue_initial_installs() ) {
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		return new \WP_REST_Response(
			array(),
			500
		);
	}

	/**
	 * Retrieves all the site features.
	 *
	 * @return array|\WP_Error
	 */
	public function get_site_features() {
		return SiteFeatures::get_with_selections();
	}

	/**
	 * Installs/Uninstalls the requested plugins.
	 *
	 * @param \WP_REST_Request $request the incoming request object.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function set_site_features( \WP_REST_Request $request ) {
		$plugin_body = json_decode( $request->get_body(), true );
		$plugins     = isset( $plugin_body['plugins'] ) ? $plugin_body['plugins'] : false;

		if ( ! $plugins ) {
			return new \WP_Error(
				'plugin_list_not_provided',
				'Plugins List Not Provided',
				array( 'status' => 404 )
			);
		}

		return PluginService::set_site_features( $plugins );
	}
}
