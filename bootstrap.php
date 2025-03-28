<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Application;
use NewfoldLabs\WP\Module\Onboarding\ModuleController;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Safe_Mode;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;

use function NewfoldLabs\WP\ModuleLoader\register;

/**
 * Register Onboarding with Newfold Module Loader
 *
 * @return void
 */
function nfd_wp_module_onboarding_register() {
	// wp-module-onboarding
	register(
		array(
			'name'     => 'onboarding',
			'label'    => __( 'Onboarding', 'wp-module-onboarding' ),
			'callback' => function ( Container $container ) {

				// Set Global Constants
				if ( ! defined( 'NFD_ONBOARDING_VERSION' ) ) {
					define( 'NFD_ONBOARDING_VERSION', '2.6.5' );
				}
				if ( ! defined( 'NFD_ONBOARDING_DIR' ) ) {
					define( 'NFD_ONBOARDING_DIR', __DIR__ );
				}
				if ( ! defined( 'NFD_ONBOARDING_SCRIPTS_URL' ) ) {
					define( 'NFD_ONBOARDING_SCRIPTS_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-onboarding/src/Scripts' );
				}
				if ( ! defined( 'NFD_ONBOARDING_BUILD_DIR' ) && defined( 'NFD_ONBOARDING_VERSION' ) ) {
					define( 'NFD_ONBOARDING_BUILD_DIR', __DIR__ . '/build/' . NFD_ONBOARDING_VERSION );
				}
				if ( ! defined( 'NFD_MODULE_DATA_EVENTS_API' ) ) {
					define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
				}
				if ( ! defined( 'NFD_ONBOARDING_BUILD_URL' && defined( 'NFD_ONBOARDING_VERSION' ) ) ) {
					define( 'NFD_ONBOARDING_BUILD_URL', $container->plugin()->url . '/vendor/newfold-labs/wp-module-onboarding/build/' . NFD_ONBOARDING_VERSION );
				}
				if ( ! defined( 'NFD_ONBOARDING_PLUGIN_DIRNAME' ) ) {
					define( 'NFD_ONBOARDING_PLUGIN_DIRNAME', dirname( $container->plugin()->basename ) );
				}

				if ( 'compatible' !== Status::get() ) {
					$compatibility_scan = new Scan();
					Status::set( $compatibility_scan );
					if ( 'compatible' !== $compatibility_scan->result ) {
						return new Safe_Mode( $compatibility_scan );
					}
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
	// Handle Module Disable if Non-Ecommerce
	ModuleController::init();
}
