<?php
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Application;
use function NewfoldLabs\WP\ModuleLoader\register;

/**
 * Register Onboarding with Newfold Module Loader
 *
 * @return void
 */
function nfd_wp_module_onboarding_register() {

	register(
		array(
		'name'  => 'onboarding',
		'label' => __('Onboarding', 'nfd_module_onboarding' ),
		'callback' => function ( Container $container ) {

			// Set Global Constants
			if ( ! defined( 'NFD_ONBOARDING_VERSION' ) ) {
				define( 'NFD_ONBOARDING_VERSION', '1.0.0' );
			}
			if ( ! defined( 'NFD_ONBOARDING_DIR' ) ) {
				define( 'NFD_ONBOARDING_DIR', __DIR__ );
			}
			if ( ! defined( 'NFD_ONBOARDING_BUILD_DIR' ) ) {
				define( 'NFD_ONBOARDING_BUILD_DIR', __DIR__ . '/build/' . NFD_ONBOARDING_VERSION );
			}
			if ( ! defined( 'NFD_MdefODULE_DATA_EVENTS_API' ) ) {
				define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
			}
			if ( ! defined( 'NFD_ONBOARDING_BUILD_URL' ) ) {
				define( 'NFD_ONBOARDING_BUILD_URL', BLUEHOST_PLUGIN_URL . '/vendor/newfold-labs/wp-module-onboarding/build/' . NFD_ONBOARDING_VERSION );
			}
			// Instantiate Onboarding Module Application
				new Application( $container );
			},
			
		'isActive' => true,
		'isHidden' => true,
		)
	);
}

/**
 * Tap WordPress Hooks to Instantiate Module Loader
 */
if ( is_callable( 'add_action' ) ) {
	add_action(
		'plugins_loaded',
		'nfd_wp_module_onboarding_register'
	);
}
