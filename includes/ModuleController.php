<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;

use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\activate;
use function NewfoldLabs\WP\ModuleLoader\deactivate;


/**
 * Class ModuleController
 */
class ModuleController {

	/**
	 * Initialize the Module Controller functionality.
	 */
	public static function init() {
		// Check the conditions after the step_theme loads as only after that the moudle had been registered prior
		add_action( 'after_setup_theme', array( __CLASS__, 'module_switcher' ), 10, 0 );
	}

	/**
	 * Check if the user is a valid Ecommerce and subsequently enable/disable modules
	 */
	public static function module_switcher() {

		$module_name   = 'onboarding';
		$customer_data = Data::customer_data();

		// Sample data for Testing
		// $customer_data['plan_subtype'] = 'wc_standard';
		// $customer_data['signup_date']  = '2022-08-18T15:30:00.000Z';

		// Check if he is a Non-Ecom Cust and Disable Redirect and Module
		if ( ! self::is_ecom_customer( $customer_data ) ) {

			// Check if the Module Does Exist
			if ( ModuleRegistry::get( $module_name ) ) {

				// Disable the Redirect for Onboarding SPA
				LoginRedirect::disable_redirect();

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
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @param array $customer_data The customer data to be parsed.
	 * @return boolean
	 */
	public static function is_ecom_customer( $customer_data ) {

		if ( isset( $_GET['flow'] ) && 'ecommerce' === \sanitize_text_field( $_GET['flow'] ) ) {
			return true;
		}

		// August 18
		$new_cust_date = gmdate( 'Y-m-d H:i:s', strtotime( '2022-08-18T15:30:00.000Z' ) );

		if ( isset( $customer_data['signup_date'] ) ) {

			// Convert the Customer Signup Date to a Php known format
			$cust_signup_date = gmdate( 'Y-m-d H:i:s', strtotime( $customer_data['signup_date'] ) );

			// Check if the Customer is a new Customer
			$is_new_cust = $cust_signup_date >= $new_cust_date;

			// Check if the Customer has an Ecom Plan
			$has_ecom_plan = false;
			if ( isset( $customer_data['plan_subtype'] ) ) {
				$has_ecom_plan = Flows::is_ecommerce_plan( $customer_data['plan_subtype'] );
			}
			if ( ! $has_ecom_plan ) {
				$has_ecom_plan = Flows::is_commerce_priority();
			}

			if ( $has_ecom_plan && $is_new_cust ) {
				return true;
			}
		}

		// If the Customer is not a Ecommerce Customer or is an Old Customer
		return false;
	}
}
