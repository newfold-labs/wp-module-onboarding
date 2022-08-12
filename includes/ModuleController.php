<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use Bluehost\WP\Data\Customer;
use NewfoldLabs\WP\ModuleLoader\ModuleRegistry;
use function NewfoldLabs\WP\ModuleLoader\isActive;
use function NewfoldLabs\WP\ModuleLoader\deactivate;

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
        \do_action('qm/debug', 'Ran Moudle Switcher');

		$moudle_name = 'onboarding';
        $customer_data = self::customer_data();
        $customer_data['plan_subtype'] = 'wc_standard';
        $customer_data['signup_date']  = '2022-08-18T17:00:00.000Z';

		if( !self::is_ecom_customer( $customer_data ) ){
        	\do_action('qm/debug', 'Inside If Loop');
        	\do_action('qm/debug', ModuleRegistry::get( $moudle_name));
        	\do_action('qm/debug', isActive( $moudle_name ));
			
			if( ModuleRegistry::get( $moudle_name ) && isActive( $moudle_name )){

        		\do_action('qm/debug', 'Activated and Running');
				\do_action('qm/debug', isActive( $moudle_name ));
				// Disable the Redirect for Onboarding SPA
        		LoginRedirect::disable_redirect();

				// Deactivate the Module
				deactivate( $moudle_name );
				\do_action('qm/debug', isActive( $moudle_name ));
			}
		}
        
	}

    /**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return mixed
	 */
	public static function customer_data() {
        // \do_action('qm/debug', 'Ran customer_data');
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
        \do_action('qm/debug', 'Ran is_ecom_customer');

		// August 18 at 10AM Mountain Time
		$newCustDate = '2022-08-18T17:00:00.000Z';
		$commerce_plans = ["wc_standard", "wc_premium"];

		if ( isset( $customer_data['plan_subtype'] ) && isset( $customer_data['signup_date'] ) ) {

			// If the Customer has a ecommerce plan and is a New Customer to the Company
			if( in_array( $customer_data['plan_subtype'], $commerce_plans ) && $customer_data['signup_date'] == $newCustDate ){
        		\do_action('qm/debug', 'Returned True');
				return true;
			}
		}

		// If the Customer is not a Ecommerce Customer or is an Old Customer
        \do_action('qm/debug', 'Returned False');
		return false;
	}
}