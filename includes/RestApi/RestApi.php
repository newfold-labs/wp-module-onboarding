<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

/**
 * Instantiate controllers and register routes.
 */
final class RestApi {

	protected $controllers = array(
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SiteImagesController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeGeneratorController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\PluginsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeVariationsController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ApprovedThemesController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\PatternsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\FlowController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\SettingsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\EventsController',
		'NewfoldLabs\\WP\\Module\\Onboarding\\RestApi\\PagesController',
		'NewfoldLabs\WP\\Module\\Onboarding\\RestApi\\Themes\\ThemeInstallerController',
	);

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

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
} // END \NewfoldLabs\WP\Module\Onboarding\RestApi()
