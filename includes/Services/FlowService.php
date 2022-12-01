<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

	// An array to keep the Flow Data updated in the database
	protected $updated_flow_data = array();

    public static function initalize_flow_data() { 
        if ( ! ( $flow_data = self::read_flow_data_from_wp_option() ) )
            return self::get_default_flow_data();
		$updated_flow_data = self::update_flow_data_recursive(Flows::get_data(), $flow_data, $updated_flow_data);
		self::update_wp_options_data_in_database($updated_flow_data);
        return $updated_flow_data;
    }

    private static function get_default_flow_data() {
		// check if data is available in the database if not then fetch the default dataset
		$flow_data              = Flows::get_data();
		$flow_data['createdAt'] = time();
		// get current flow type
		$flow_type = Data::current_flow();
		// update default data if flow type is ecommerce
		if($flow_type == 'ecommerce') 
			$flow_data = self::update_default_data_for_ecommerce( $flow_data );
		self::update_wp_options_data_in_database( $flow_data );
		return $flow_data;
	}

	/*
	 * function to update the Flow Data (Blueprint) in an array recursively in comparison to Flows::get_data() (Database)
	 */	
	private static function update_flow_data_recursive(&$default_flow_data, &$flow_data, &$updated_flow_data) {
		{
			$flow_data_fixes = Flows::get_fixes();

			foreach ($default_flow_data as $key => $value)
			{ 

				// Any Key renamed is updated in the database with NewKey and the value from the OldKey is retained
				if($flow_data_fixes) {
					foreach ($flow_data_fixes as $old_key=>$new_key) {
						if (array_key_exists($old_key, $flow_data)) 
							$flow_data[$new_key] = $flow_data[$old_key];
						unset($flow_data[$old_key]);
					}
				}

				// To update an existing value if the key exists in both, the blueprint and database
				// All keys in the database and not in blueprint are not included
				if (array_key_exists($key, $flow_data) && !is_array($value) ) {

					// Updates any default value added to an Existing Key in the blueprint into the database
					if(isset($value) && empty($flow_data[$key])) {
						$updated_flow_data[$key] = $value;
					}

					// Retains the user updated value at the time of onboarding
					else
						$updated_flow_data[$key] = $flow_data[$key];
				}

				// Adds new key-value pair added to the blueprint into the database
				else
					$updated_flow_data[$key] = $value;

				if ( is_array( $value ) ) {
					if (count(array_filter(array_keys($flow_data[$key]), 'is_string')) === 0 && !empty($flow_data[$key])) {
						$updated_flow_data[$key] = $flow_data[$key];
					}
					else
						$updated_flow_data[$key] = self::update_flow_data_recursive($value, $flow_data[$key], $updated_flow_data[$key]);
				}
			}
			return $updated_flow_data;
		  }
	}

	public static function update_post_call_data_recursive(&$flow_data, &$params) {
		{
			foreach ($flow_data as $key => $value)
			{ 
				if (array_key_exists($key, $params) && !is_array($value)) {
					$flow_data[$key] = $params[$key];
				}

				else $flow_data[$key] = $value;
								
				if ( is_array( $value ) ) {
					if (count(array_filter(array_keys($params[$key]), 'is_string')) === 0 && !empty($params[$key])) {
						$flow_data[$key] = $params[$key];
					}
					else
						$flow_data[$key] = self::update_post_call_data_recursive($value, $params[$key]);
				}
			}
			return $flow_data;
		  }
	}

    /*
	 * Read onboarding flow options from database
	*/
	public static function read_flow_data_from_wp_option() {
		return \get_option( Options::get_option_name( 'flow' ), false );
	}

    /*
	 * add onboarding flow options
	 */
	private static function save_details_to_wp_options( $data ) {
		return \add_option( Options::get_option_name( 'flow' ), $data );
	}

	/*
	 * update onboarding flow options
	 */
	public static function update_wp_options_data_in_database( $data ) {
		return \update_option( Options::get_option_name( 'flow' ), $data );
	}

    /**
	 * check the current flow type and update default data if flowtype is ecommerce.
	 *
	 * @param default flow data.
	 *
	 * @return array
	 */
	private static function update_default_data_for_ecommerce( $data ) {
		// update default data with ecommerce data
		$data['data']['topPriority']['priority1'] = 'selling';
		$data['data']['siteType'] = array('label' => '', 'referTo' => 'business');
		return $data;
	}

    /*
	 * function to search for key in array recursively with case sensitive exact match
	 */
	public static function check_key_in_nested_array( $params, $flow_data, $header_key = 'Base Level' ) {
		static $mismatch_key = [];
		foreach($params as $key => $value){
			if(!array_key_exists($key, $flow_data))
			{
				if (count(array_filter(array_keys($params), 'is_string')) === 0) {
					continue;
				}
				$mismatch_key[]  = $header_key. " => " . $key;
			}
			elseif ( is_array( $value ) && !empty($value) ) {
				self::check_key_in_nested_array($value, $flow_data[$key], $key);
			}
		}
		return implode(", ", $mismatch_key);
	}
}