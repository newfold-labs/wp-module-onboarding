<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

/**
 * Instantiate controllers and register routes.
 */
final class RestApi {

	/**
	 * List of custom REST API controllers
	 *
	 * @var array
	 */
	protected $controllers = array(
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\AppController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\BlueprintsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\PluginsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\ReduxStateController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SettingsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\EventsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\LogoGenController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\DesignController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\GlobalStylesController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SiteContentController',
	);

	/**
	 * Setup the custom REST API
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register the custom REST API routes
	 */
	public function register_routes() {
		foreach ( $this->controllers as $controller ) {
			/**
			 * Get an instance of the WP_REST_Controller.
			 *
			 * @var $instance WP_REST_Controller
			 */
			$instance = new $controller();
			$instance->register_routes();
		}
	}
}
