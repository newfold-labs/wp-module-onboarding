<?php
/**
 * Onboarding module bootstrap.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

/*
 * Eager-load Onboarding\Data\* before any autoloader can resolve them.
 *
 * wp-module-onboarding-data is still pulled in transitively by brand plugins
 * (e.g. wp-plugin-bluehost) and ships classes under the same
 * NewfoldLabs\WP\Module\Onboarding\Data\ namespace. Composer's PSR-4 routing
 * picks the longest matching prefix, so onboarding-data's `Data\` prefix
 * shadows our `Onboarding\` prefix for everything in this folder. Requiring
 * our files here binds the class symbols first; PHP then skips autoload for
 * them. Remove once brand plugins drop the onboarding-data dependency.
 */
foreach (
	array(
		'Brands',
		'Plugins',
		'Languages',
		'Options',
		'Config',
		'Runtime',
		'Events',
		'Bluehost',
	) as $nfd_onboarding_data_class
) {
	require_once __DIR__ . '/includes/Data/' . $nfd_onboarding_data_class . '.php';
}
unset( $nfd_onboarding_data_class );

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\ModuleController;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Safe_Mode;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ImageSideloadTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Services\MediaService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteGenImageService;
use NewfoldLabs\WP\Module\Onboarding\Application;

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
					define( 'NFD_ONBOARDING_VERSION', '4.0.8' );
				}
				if ( ! defined( 'NFD_ONBOARDING_DIR' ) ) {
					define( 'NFD_ONBOARDING_DIR', __DIR__ );
				}
				if ( ! defined( 'NFD_ONBOARDING_BUILD_DIR' ) && defined( 'NFD_ONBOARDING_VERSION' ) ) {
					define( 'NFD_ONBOARDING_BUILD_DIR', __DIR__ . '/build/' . NFD_ONBOARDING_VERSION );
				}
				if ( ! defined( 'NFD_MODULE_DATA_EVENTS_API' ) ) {
					define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
				}
				if ( ! defined( 'NFD_ONBOARDING_BUILD_URL' ) && defined( 'NFD_ONBOARDING_VERSION' ) ) {
					define( 'NFD_ONBOARDING_BUILD_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-onboarding/build/' . NFD_ONBOARDING_VERSION );
				}
				if ( ! defined( 'NFD_ONBOARDING_PLUGIN_URL' ) ) {
					define( 'NFD_ONBOARDING_PLUGIN_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-onboarding' );
				}
				if ( ! defined( 'NFD_ONBOARDING_PLUGIN_DIRNAME' ) ) {
					define( 'NFD_ONBOARDING_PLUGIN_DIRNAME', dirname( $container->plugin()->basename ) );
				}
				if ( ! defined( 'NFD_ONBOARDING_BLUEHOST_BRAND' ) ) {
					define( 'NFD_ONBOARDING_BLUEHOST_BRAND', $container->plugin()->brand );
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

	// Clear site capabilities transient after onboarding is completed so CTBs are accessible right away
	add_action(
		'newfold/onboarding/completed',
		function () {
			delete_transient( 'nfd_site_capabilities' );
		}
	);


	// Queue content image sideloading for onboarding-generated pages when onboarding completes.
	add_action( 'newfold/onboarding/completed', array( SiteGenImageService::class, 'schedule_after_onboarding' ) );
	// Add action to process image sideload queue for onboarding-generated pages
	add_action( SiteGenImageService::CRON_HOOK, array( ImageSideloadTaskManager::class, 'process_queue' ) );
	// Process a batch of pending images on each cron run for onboarding-generated CPTs.
	add_action( MediaService::CRON_HOOK, array( MediaService::class, 'sideload_pending_images' ) );

	// Daily re-scan of onboarding pages to sideload images replaced after onboarding.
	add_action( SiteGenImageService::DAILY_CRON_HOOK, array( SiteGenImageService::class, 'daily_sync' ) );
	add_action( 'init', array( SiteGenImageService::class, 'schedule_daily_images_importer' ) );
}
