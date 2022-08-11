<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use Bluehost\WP\Data\Customer;
use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\isActive;

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
		add_action( 'after_setup_theme', array( __CLASS__, 'module_switcher' ), 10, 3 );
	}

    /**
	 * Check if the user is a valid Ecommerce and subsequently enable/disable modules
	 */
	public static function module_switcher() {

        $customer_data = self::customer_data();
        $customer_data['plan_subtype'] = 'wc_standard';
        $customer_data['signup_date']  = '2022-08-18T17:00:00.000Z';

		if( !self::is_ecom_customer( $customer_data ) ){
			
			if( ModuleRegistry::get('onboarding') && isActive('onboarding')){

        		\do_action('qm/debug', 'Activated and Running');
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
		$newCustDate = '2022-08-18T17:00:00.000Z';
		$commerce_plans = ["wc_standard", "wc_premium"];

		if ( isset( $customer_data['plan_subtype'] ) && isset( $customer_data['signup_date'] ) ) {

			// If the Customer has a ecommerce plan and is a New Customer to the Company
			if( in_array($customer_data['plan_subtype'], $commerce_plans) && $customer_data['signup_date'] > $newCustDate ){
				return true;
			}
		}

		// If the Customer is not a Ecommerce Customer or is an Old Customer
		return false;
	}
}