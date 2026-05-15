<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Bluehost;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\activate;
use function NewfoldLabs\WP\ModuleLoader\deactivate;


/**
 * Class ModuleController
 */
class ModuleController {

	/**
	 * The name of the module.
	 *
	 * @var string
	 */
	public static $module_name = 'onboarding';

	/**
	 * Initialize the Module Controller functionality.
	 */
	public static function init() {
		// Enable/Disable the module after_setup_theme.
		\add_action( 'after_setup_theme', array( __CLASS__, 'module_switcher' ), 10, 0 );
	}

	/**
	 * Enable/Disable Onboarding based on certain checks.
	 *
	 * @return void
	 */
	public static function module_switcher() {
		$current_brand         = Bluehost::get_current_brand();
		$module_exists         = ModuleRegistry::get( self::$module_name );
		$can_access_onboarding = self::can_access_onboarding( $current_brand );

		if ( $can_access_onboarding && $module_exists ) {
			activate( self::$module_name );
			return;
		}

		if ( $module_exists ) {
			deactivate( self::$module_name );
		}
	}

	/**
	 * Check if the site is eligible for Onboarding.
	 *
	 * @param string $brand The brand to check.
	 * @return boolean
	 */
	public static function can_access_onboarding( $brand ): bool {
		// Allow if 'nfd_module_onboarding_activate' query param is passed OR previously passed.
		$activate_transient_name = Options::get_option_name( 'activate_param' );
		if ( '1' === get_transient( $activate_transient_name ) ) {
			return true;
		}
		$activate_param_name = Options::get_option_name( 'activate' );
		if ( isset( $_GET[ $activate_param_name ] ) && Permissions::is_authorized_admin() ) {
			// Set a 30 day transient that reflects this parameter being passed.
			set_transient( $activate_transient_name, '1', 2592000 );
			return true;
		}

		// Brand eligibility check.
		if ( self::is_brand_eligible( $brand ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Checks if a particular brand is eligible for Onboarding.
	 *
	 * @param string $brand The brand to check.
	 * @return boolean
	 */
	public static function is_brand_eligible( $brand ): bool {
		return in_array( $brand, Bluehost::get_brands() );
	}
}
