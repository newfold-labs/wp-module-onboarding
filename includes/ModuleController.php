<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Brands;
use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\activate;
use function NewfoldLabs\WP\ModuleLoader\deactivate;
use function NewfoldLabs\WP\ModuleLoader\container;


/**
 * Class ModuleController
 */
class ModuleController {

	/**
	 * Initialize the Module Controller functionality.
	 */
	public static function init() {
		// Enable/Disable the module after_setup_theme.
		\add_action( 'after_setup_theme', array( __CLASS__, 'module_switcher' ), 10, 0 );
	}

	/**
	 * Enable/Disable Onboarding based on certain checks.
	 */
	public static function module_switcher() {
		$module_name = 'onboarding';
		// Set brand context for the module.
		$current_brand = Brands::set_current_brand( container() );

		$enable_onboarding = self::verify_onboarding_criteria( $current_brand );

		// Check if he is a Non-Ecommerce Customer and Disable Redirect and Module
		if ( ! $enable_onboarding ) {

			// Check if the Module Does Exist
			if ( ModuleRegistry::get( $module_name ) ) {

				// Deactivate the Module
				deactivate( $module_name );
			}
		} else {

			// Check if the Module Does Exist
			if ( ModuleRegistry::get( $module_name ) ) {

				// Activate the Module
				activate( $module_name );
			}
		}

	}

	/**
	 * Verify all the necessary criteria to enable Onboarding for the site.
	 *
	 * @param string $brand_name The kebab cased name of the brand.
	 * @return boolean
	 */
	public static function verify_onboarding_criteria( $brand_name ) {
		// Check if nfd_module_onboarding_activate query param was passed previously.
		$activate_transient_name = Options::get_option_name( 'activate_param' );
		if ( '1' === get_transient( $activate_transient_name ) ) {
			return true;
		}

		// If the transient does not exist, check if nfd_module_onboarding_activate query param has been passed.
		$activate_param_name = Options::get_option_name( 'activate' );
		if ( isset( $_GET[ $activate_param_name ] ) && Permissions::is_authorized_admin() ) {
				// Set a 30 day transient that reflects this parameter being passed.
				set_transient( $activate_transient_name, '1', 2592000 );
				return true;
		}

		$eligible_brand = self::is_brand_eligible( $brand_name );
		if ( ! $eligible_brand ) {
			return false;
		}

		$customer_data       = Data::customer_data();
		$brand_enabled_flows = Flows::get_flows();
		foreach ( $brand_enabled_flows as $flow => $enabled ) {
			if ( ! $enabled ) {
				continue;
			}

			switch ( $flow ) {
				case 'ecommerce':
					if ( self::is_commerce_signup( $customer_data ) ) {
						return true;
					}
					break;
				case 'wp-setup':
					return true;
			}
		}

		return false;
	}

	/**
	 * Checks if a particular brand name is eligible for Onboarding.
	 *
	 * @param string $brand_name The kebab cased name of the brand.
	 * @return boolean
	 */
	public static function is_brand_eligible( $brand_name ) {
		if ( false !== strpos( $brand_name, 'hostgator' ) && 'hostgator-br' !== $brand_name ) {
			return false;
		}

		return true;
	}

	/**
	 * Determine if the install is a new commerce signup
	 *
	 * @param array $customer_data The site's customer data.
	 * @return boolean
	 */
	public static function is_commerce_signup( $customer_data ) {
		// Determine if the flow=ecommerce param is set.
		if ( isset( $_GET['flow'] ) && 'ecommerce' === \sanitize_text_field( $_GET['flow'] ) ) {
			return true;
		}

		// Determine if the install is on a commerce plan (or) has Woocommerce active (commerce priority).
		$is_commerce = false;
		if ( isset( $customer_data['plan_subtype'] ) ) {
			$is_commerce = Flows::is_ecommerce_plan( $customer_data['plan_subtype'] );
		}
		if ( ! $is_commerce ) {
			$is_commerce = Flows::is_commerce_priority();
		}
		if ( ! $is_commerce ) {
			return false;
		}

		return true;
	}
}
