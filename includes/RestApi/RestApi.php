<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\RestApi\RestApiFilter;

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
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SiteImagesController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\PluginsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeVariationsController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ApprovedThemesController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\Themes\\PatternsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\FlowController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SettingsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\EventsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SitePagesController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeInstallerController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeFontsController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeColorsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SiteClassificationController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SiteGenController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\BlockRenderController',
	);

	/**
	 * Setup the custom REST API
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		// create an instance of the RestApiFilter to filter the responses for header menu navigation
		new RestApiFilter();
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
