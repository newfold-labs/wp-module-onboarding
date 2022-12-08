<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

	public static function initalize_flow_data() { 
         if ( ! ( $flow_data = self::read_flow_data_from_wp_option() ) ) {
            $flow_data =  self::get_default_flow_data();
			return self::update_wp_options_data_in_database( $flow_data );
		}
		$default_flow_data = self::get_default_flow_data();
		$updated_flow_data = array();
		$updated_flow_data = self::update_flow_data_recursive($default_flow_data, $flow_data, $updated_flow_data);
		return self::update_wp_options_data_in_database($updated_flow_data);
    }

    public static function get_default_flow_data() {
		// check if data is available in the database if not then fetch the default dataset
		$flow_data              = Flows::get_data();
		$flow_data['createdAt'] = strval(time());
		// get current flow type
		$flow_type = Data::current_flow();
		// update default data if flow type is ecommerce
		if($flow_type == 'ecommerce') 
			$flow_data = self::update_default_data_for_ecommerce( $flow_data );
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
					foreach ($flow_data_fixes as $old_key=>$new_val) {
						if (isset($flow_data) && array_key_exists($old_key, $flow_data) && array_key_exists($new_val['new_key'], $default_flow_data)) {
							if($new_val['retain_existing_value'])
								$flow_data[$new_val['new_key']] = $flow_data[$old_key];
							else
								$flow_data[$new_val['new_key']] = $default_flow_data[$new_val['new_key']];
							unset($flow_data[$old_key]);
						}	
					}
				}

				// To update an existing value if the key exists in both, the blueprint and database
				// All keys in the database and not in blueprint are not included
				if (isset($flow_data) && array_key_exists($key, $flow_data) && !is_array($value)) {					
					// Retains the user entered value at the time of onboarding
					if(isset($flow_data[$key])) 
						$updated_flow_data[$key] = $flow_data[$key];

					// Updates any default value added to an Existing Key in the blueprint into the database
					else
						$updated_flow_data[$key] = $value;
				}

				// Adds new key-value pair added to the blueprint into the database
				else
					$updated_flow_data[$key] = $value;

				if ( is_array( $value ) ) {

					// For Keys having Empty Arrays. Eg: isViewed, other
					if(empty($value)) 
						$updated_flow_data[$key] = $flow_data[$key];

					// To handle Indexed Arrays gracefully
					if (count(array_filter(array_keys($value), 'is_string')) === 0) {

						// To check if an Indexed Array is further Nested or Not
						foreach($value as $index_key => $index_value) {

							// For Indexed Arrays having values as an Array: Indexed/Associative
							if(is_array($index_value)) {
								if(empty($flow_data[$key][$index_key]))
									$updated_flow_data[$key][$index_key] = $index_value;
								else
									$updated_flow_data[$key][$index_key] = $flow_data[$key][$index_key];
							}

							// For Indexed Arrays having values as a String/Boolean
							else {
								if(empty($flow_data[$key]))
									$updated_flow_data[$key] = $value;
								else
									$updated_flow_data[$key] = $flow_data[$key];
							}
						}
					}
					else
						$updated_flow_data[$key] = self::update_flow_data_recursive($value, $flow_data[$key], $updated_flow_data[$key]);
				}
			}
			return $updated_flow_data;
		  }
	}

	/*
	 * function to update the Database recursively based on Values opted or entered by the User
	 */	
	public static function update_post_call_data_recursive(&$default_flow_data, &$flow_data, &$updated_flow_data, &$params, &$flag = '') {
		{
			foreach ($flow_data as $key => $value)
			{ 
				if(is_array($params[$key]) && !is_array($value)) {
					$flag = $key. ' => '. gettype($params[$key]) . '. Expected: ' . gettype($value);
					break;
				}

				// Updates value entered by the user
				if (isset($params) && array_key_exists($key, $params)) {
					if(strcmp(gettype($value), gettype($params[$key])) === 0) {
						if(!is_bool($params[$key]) && empty($params[$key]) && !empty($default_flow_data[$key])) {
							$updated_flow_data[$key] = $default_flow_data[$key];
						}
						else
							$updated_flow_data[$key] = $params[$key];
					}
					else {
						$flag = $key. ' => '. gettype($params[$key]) . '. Expected: ' . gettype($value);
						break;
					}
				}

				// Retains the DB Value if no input from the User
				else $updated_flow_data[$key] = $value;

				if ( is_array( $value )) {

					// if there is an empty value in the DB or any key is not sent, the default value (if any) or the existing DB value is retained
					if(empty($params[$key])) {
						if(!empty($value) && !empty($default_flow_data[$key]))
							$updated_flow_data[$key] = $value;
						else
							$updated_flow_data[$key] = $default_flow_data[$key];
					}
					
					// To handle Indexed Arrays gracefully
					if (isset($params[$key]) && count(array_filter(array_keys($params[$key]), 'is_string')) === 0 ) {
						foreach($params[$key] as $index_key=>$index_value) {
							if(is_array($index_value))
								$updated_flow_data[$key][$index_key] = self::update_post_call_data_recursive($default_flow_data[$key][$index_key], $value[$index_key], $updated_flow_data[$key][$index_key], $index_value, $flag);
						}
					}
					else
						$updated_flow_data[$key] = self::update_post_call_data_recursive($default_flow_data[$key], $value, $updated_flow_data[$key], $params[$key], $flag);
				}							
			}
			return (!empty($flag))? $flag : $updated_flow_data;
		}
	}

    /*
	 * Read onboarding flow options from database
	*/
	public static function read_flow_data_from_wp_option() {
		return \get_option( Options::get_option_name( 'flow' ), false );
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
		$data['data']['siteType'] = array('label' => '', 'referTo' => 'business', 'primary' => '',  'secondary' => '' );
		return $data;
	}

    /*
	 * function to search for key in array recursively with case sensitive exact match
	 */
	public static function check_key_in_nested_array( $params, $flow_data, $header_key = 'Base Level' ) {
		static $mismatch_key = [];
		foreach($params as $key => $value){
			if(!array_key_exists($key, $flow_data))
				$mismatch_key[]  = $header_key. " => " . $key;
			elseif ( is_array( $value ) && !empty($value)) {
				if (count(array_filter(array_keys($value), 'is_string')) === 0) {
					foreach($value as $index_key=>$index_value) {
						if(is_array($index_value))
							self::check_key_in_nested_array($value[$index_key], $flow_data[$key][$index_key], $key. " : " . $index_key);
						else
							continue;
					}
				}
				else
					self::check_key_in_nested_array($value, $flow_data[$key], $key);
			}
		}
		return implode(", ", $mismatch_key);
	}
}