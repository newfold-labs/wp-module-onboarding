<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

	public static function initalize_flow_data() { 
         if ( ! ( $flow_data = self::read_flow_data_from_wp_option() ) ) {
            $flow_data =  self::get_default_flow_data();
			return \update_option( Options::get_option_name( 'flow' ), $flow_data );;
		}
		$default_flow_data = self::get_default_flow_data();
		$updated_flow_data = self::update_flow_data_recursive($default_flow_data, $flow_data);
		return \update_option( Options::get_option_name( 'flow' ), $updated_flow_data );
    }

    public static function get_default_flow_data() {
		// check if data is available in the database if not then fetch the default dataset
		$flow_data              = Flows::get_data();
		$flow_data['createdAt'] = time();
		// get current flow type
		$flow_type = Data::current_flow();
		// update default data if flow type is ecommerce
		if($flow_type == 'ecommerce') 
			$flow_data = self::update_default_data_for_ecommerce( $flow_data );
		return $flow_data;
	}

	public static function update_flow_data($params) {
		$flow_data = FlowService::read_flow_data_from_wp_option();
		return self::update_post_call_data_recursive($flow_data, $params);
	}

	/*
	 * function to update the Flow Data (Blueprint) in an array recursively in comparison to Flows::get_data() (Database)
	 */	
	private static function update_flow_data_recursive($default_flow_data, $flow_data) {
		$flow_data_fixes = Flows::get_fixes();
		$exception_list = Flows::get_exception_list();
		$updated_flow_data = array();
		foreach ($default_flow_data as $key => $value)
		{ 
			// To align the datatype of the respective values with the one set in the blueprint
			if(strcmp(gettype($value), gettype($flow_data[$key])) != 0) {
				$updated_flow_data[$key] = $value;
				continue;
			}

			// Any Key renamed is updated in the database with NewKey and the value from the OldKey is retained or not based on retain_existing_value
			if($flow_data_fixes) {
				foreach ($flow_data_fixes as $old_key=>$new_val) {
					if (array_key_exists($old_key, $flow_data) && array_key_exists($new_val['new_key'], $default_flow_data)) {
						if($new_val['retain_existing_value'])
							$flow_data[$new_val['new_key']] = $flow_data[$old_key];
						else
							$flow_data[$new_val['new_key']] = $default_flow_data[$new_val['new_key']];
						unset($flow_data[$old_key]);
					}	
				}
			}

			if(array_key_exists($key, $flow_data)) {

				// Accepts the value of Exception List keys as is from the database OR non array OR empty array values
				if(($exception_list && isset($exception_list[$key])) || !is_array($value) || (is_array($value) && sizeof($value) === 0))
					$updated_flow_data[$key] = $flow_data[$key];

				else {
					// To handle Indexed Arrays gracefully
					if (count(array_filter(array_keys($value), 'is_string')) === 0) {
						// To check if an Indexed Array is further Nested or Not
						foreach($value as $index_key => $index_value) {
							// For Indexed Arrays having values as Non Associative Array
							if(!is_array($index_value)) { 
								if(isset($flow_data[$key]))
									$updated_flow_data[$key] = $flow_data[$key]; 
								else
									$updated_flow_data[$key] = $value;
							}
							// For Indexed Arrays having values as an Associative Array
							// Currently Blueprint has no such check, hence commenting the below condition check
							// else {
							// 	if(!isset($flow_data[$key][$index_key]))
							// 		$updated_flow_data[$key][$index_key] = $index_value;
							// 	else
							// 		$updated_flow_data[$key][$index_key] = self::update_flow_data_recursive($index_value, $flow_data[$key][$index_key]);
							// }
						}
					}
					else 
						$updated_flow_data[$key] = self::update_flow_data_recursive($value, $flow_data[$key]);
				}
			}

			// Adds or deletes key-value pairs in DB based on the modification in the blueprint
			else
				$updated_flow_data[$key] = $value;
		}
		return $updated_flow_data;
	}

	/*
	 * function to update the Database recursively based on Values opted or entered by the User
	 */	
	private static function update_post_call_data_recursive(&$flow_data, $params) {
		static $mismatch_data_type = '';
		$exception_list = Flows::get_exception_list();

		foreach ($flow_data as $key => $value)
		{ 		
			// Updates value entered by the user
			if (array_key_exists($key, $params)){			

				// Accepts the value of Exception List keys as is from the database
				if($exception_list && isset($exception_list[$key])) {
					$flow_data[$key] = $params[$key];
					continue;
				}

				// Error thrown if the datatype of the parameter does not match
				if(strcmp(gettype($value), gettype($params[$key])) != 0) {
					$mismatch_data_type = $key. ' => '. gettype($params[$key]) . '. Expected: ' . gettype($value);
					break;
				}

				// Accepts non-Array Values entered by the user
				elseif(!is_array($value))
					$flow_data[$key] = $params[$key];

				else {
					// To handle Indexed Arrays gracefully
					if (count(array_filter(array_keys($params[$key]), 'is_string')) === 0 ) {
						// If the Database value is empty or an indexed Array, to avoid Associative arrays to be overwritten (Eg: data)
						if((sizeof($value) === 0) || (count(array_filter(array_keys($value), 'is_string')) === 0))
							$flow_data[$key] = $params[$key];
						else
							$flow_data[$key] = $value;
						
						// For Indexed Arrays having nested Associative Arrays
						// Currently Database has no such check, hence commenting the below condition check
						// foreach($params[$key] as $index_key=>$index_value) {
						// 	if(is_array($index_value)) 
						// 		$flow_data[$key][$index_key] = self::update_post_call_data_recursive($value[$index_key], $index_value);
						// }
					}

					// To handle Associative Arrays gracefully
					else 
						$flow_data[$key] = self::update_post_call_data_recursive($value, $params[$key]);
				}	
			}

			// if there is an empty value in the DB or any key is not sent by user, the default value (if any) or the existing DB value is retained
			else
				$flow_data[$key] = $value;						
		}

		return (!empty($mismatch_data_type))? $mismatch_data_type : $flow_data;
	}

    /*
	 * Read onboarding flow options from database
	*/
	public static function read_flow_data_from_wp_option() {
		return \get_option( Options::get_option_name( 'flow' ), false );
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
		$data['data']['siteType']['referTo'] = 'business';
		return $data;
	}

    /*
	 * function to search for key in array recursively with case sensitive exact match
	 */
	public static function check_key_in_nested_array( $params, $flow_data, $header_key = 'Base Level' ) {
		static $mismatch_key = [];
		$exception_list = Flows::get_exception_list();
		foreach($params as $key => $value){
			if(!isset($exception_list[$key]) && is_array($flow_data)) {
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
		}
		return implode(", ", $mismatch_key);
	}
}