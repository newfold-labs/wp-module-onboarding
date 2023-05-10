<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
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
		Brands::set_current_brand( container() );
		$customer_data = Data::customer_data();

		$enable_onboarding = self::verify_onboarding_criteria( $customer_data );

		// Check if he is a Non-Ecom Cust and Disable Redirect and Module
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
	 * @param array $customer_data The brand customer data.
	 * @return boolean
	 */
	public static function verify_onboarding_criteria( $customer_data ) {
		$brand_enabled_flows = Flows::get_flows();

		foreach ( $brand_enabled_flows as $flow => $enabled ) {
			if ( ! $enabled ) {
				continue;
			}

			switch ( $flow ) {
				case 'ecommerce':
					if ( self::is_new_commerce_signup( $customer_data ) ) {
						return true;
					}
					break;
				case 'wp-setup':
					if ( self::is_net_new_signup( $customer_data ) ) {
						return true;
					}
					break;
			}
		}

		return false;
	}

	/**
	 * Get signup date of the install.
	 *
	 * @param array $customer_data The customer data to be checked for signup date.
	 * @return string|boolean
	 */
	public static function get_signup_date( $customer_data ) {
		// Get the signup_date from customer data.
		if ( isset( $customer_data['signup_date'] ) ) {
			return gmdate( 'Y-m-d H:i:s', strtotime( $customer_data['signup_date'] ) );
		}

		// Get the signup_date from the container's install_date.
		if ( ! empty( container()->plugin()->install_date ) ) {
			return gmdate( 'Y-m-d H:i:s', container()->plugin()->install_date );
		}

		// Get the signup_date from the mm_install_date option.
		$install_date = \get_option( Options::get_option_name( 'install_date', false ), false );
		if ( false !== $install_date ) {
			return gmdate( 'Y-m-d H:i:s', strtotime( $install_date ) );
		}

		return false;
	}

	/**
	 * Determines if the signup data is after the brand's net_new_signup_date_threshold.
	 *
	 * @param array $customer_data The brand customer data.
	 * @return boolean
	 */
	public static function is_net_new_signup( $customer_data ) {
		$current_brand = Data::current_brand();
		if ( ! isset( $current_brand['config']['net_new_signup_date_threshold'] ) ) {
			return false;
		}
		$net_new_signup_date_threshold = gmdate( 'Y-m-d H:i:s', strtotime( $current_brand['config']['net_new_signup_date_threshold'] ) );

		// Get the actual signup date of the install.
		$signup_date = self::get_signup_date( $customer_data );

		// As a safety measure, return false if a signup date cannot be determined.
		if ( false === $signup_date ) {
			return false;
		}

		// Determine whether the commerce install is a net new signup.
		return $signup_date >= $net_new_signup_date_threshold;
	}

	/**
	 * Determine if the install is a new commerce signup
	 *
	 * @param array $customer_data The site's customer data.
	 * @return boolean
	 */
	public static function is_new_commerce_signup( $customer_data ) {
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

		// Determine whether the commerce install is a net new signup.
		$is_net_new_signup = self::is_net_new_signup( $customer_data );
		if ( ! $is_net_new_signup ) {
			return false;
		}

		return true;
	}
}
