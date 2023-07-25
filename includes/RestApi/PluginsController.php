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
			)
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

}
