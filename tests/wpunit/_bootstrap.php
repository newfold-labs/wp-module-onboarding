<?php
/**
 * Bootstrap file for wpunit tests.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

$module_root = dirname( dirname( __DIR__ ) );

require_once $module_root . '/vendor/autoload.php';

// Required by onboarding-data when RestApi/RestApiFilter run (e.g. Data::current_brand()).
// Normally set by Brands::set_current_brand() when the module is registered with the container.
if ( ! defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ) {
	define( 'NFD_ONBOARDING_PLUGIN_BRAND', 'bluehost' );
}
