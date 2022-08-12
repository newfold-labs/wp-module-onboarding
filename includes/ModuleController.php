<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use Bluehost\WP\Data\Customer;
use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\isActive;
use function NewfoldLabs\WP\ModuleLoader\activate;
use function NewfoldLabs\WP\ModuleLoader\deactivate;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;

/**
 * Class ModuleController
 * 
 */
class ModuleController {

    /**
	 * Initialize the Ecommerce Validator functionality.
	 */
	public static function init() {
		// Check the conditions after the step_theme loads as only after that the moudle had been registered prior
		add_action( 'after_setup_theme', array( __CLASS__, 'module_switcher' ), 10, 0 );
	}

    /**
	 * Check if the user is a valid Ecommerce and subsequently enable/disable modules
	 */
	public static function module_switcher() {

		$moudle_name = 'onboarding';
        $customer_data = self::customer_data();

		// Sample data for Testing
        // $customer_data['plan_subtype'] = 'wc_standard';
        // $customer_data['signup_date']  = '2022-08-18T17:00:00.000Z';

		// Check if he is a Non-Ecom Cust and Disable Redirect and Module
		if( !self::is_ecom_customer( $customer_data ) ){

			// Check if the Module Does Exist
			if( ModuleRegistry::get( $moudle_name ) ){

				// Disable the Redirect for Onboarding SPA
        		LoginRedirect::disable_redirect();

				// Deactivate the Module
				deactivate( $moudle_name );
			}
		}
		else {
			// Check if the Module Does Exist
			if( ModuleRegistry::get( $moudle_name ) ){
				
				// Enable the Redirect for Onboarding SPA
        		LoginRedirect::enable_redirect();

				// Activate the Module
				activate( $moudle_name );
			}
		}
        
	}

    /**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return mixed
	 */
	public static function customer_data() {

		if ( class_exists( 'Bluehost\WP\Data\Customer' ) ) {
			 return Customer::collect();
		}
		 return array();
	}

	/**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return bool
	 */
	public static function is_ecom_customer( $customer_data ) {
		
		// August 18 at 10AM Mountain Time
		$newCustDate = date("Y-m-d H:i:s", strtotime('2022-08-18T17:00:00.000Z'));
		
		if ( isset( $customer_data['plan_subtype'] ) && isset( $customer_data['signup_date'] ) ) {
			
			// Convert the Customer Signup Date to a Php known format
			$cust_signup_date = date("Y-m-d H:i:s", strtotime( $customer_data['signup_date'] ));

			// Check if the Customer is a new Customer
			$is_new_cust = $cust_signup_date >= $newCustDate;
			
			// Check if the Customer has an Ecom Plan
			$has_ecom_plan = Flows::get_flow_from_plan_subtype( $customer_data['plan_subtype'] ) == "ecommerce";

			if( $has_ecom_plan  &&  $is_new_cust ){
				return true;
			}
		}

		// If the Customer is not a Ecommerce Customer or is an Old Customer
		return false;
	}
}