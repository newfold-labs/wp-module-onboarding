<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

    public static function initalize_flow_data() { 
        if ( ! ( $flow_data = self::read_flow_data_from_wp_option() ) )
            $flow_data = self::get_default_flow_data();
		$flow_data = self::update_flow_data(Flows::get_data(), $flow_data);
		self::update_wp_options_data_in_database($flow_data);
        return $flow_data;
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
	 * function to compare and add Flows::get_data() items to database
	 */
	private static function update_flow_data($default_flow_data, $flow_data) {
		$flow_data_fixes = Flows::get_fixes();

		//Update with the modified key/values
		if ($flow_data_fixes) {
			foreach($flow_data_fixes as $key=>$fixes_data) {
				$flow_data = self::rename_keys($fixes_data, $default_flow_data, $flow_data);
			}
		}

		// compare and add Blueprint flow data items to database
		$flow_data = array_replace_recursive( $default_flow_data, $flow_data);

		// delete_wp_options_data_in_database
		$flow_data = self::delete_wp_options_data_in_database($default_flow_data, $flow_data);

		self::update_wp_options_data_in_database( $flow_data );
		return $flow_data;
	}

	/*
	 * function to delete a key in array recursively which does not exist in Flows::get_data()
	 */
	private static function delete_wp_options_data_in_database( $default_flow_data, &$flow_data ) {
		foreach($flow_data as $key => $value) {
			if(!array_key_exists($key, $default_flow_data)) 
				unset($flow_data[$key]);
			elseif ( is_array( $value ) && !empty($value) )
				$flow_data[$key] = self::delete_wp_options_data_in_database($default_flow_data[$key], $value);
		}
		return $flow_data;
	}

	private static function rename_keys($fixes_data, &$default_flow_data, &$flow_data){
		foreach ($flow_data as $key => $value) {
			if (strcmp($key, $fixes_data['old_key']) == 0) {
				$key = $fixes_data['new_key'];
				if (array_key_exists('new_value', $fixes_data))
					$flow_data[$key] = $fixes_data['new_value'];
				unset($flow_data[$fixes_data['old_key']]);
			}
			if (is_array($value)) 
				$flow_data[$key] = self::rename_keys( $fixes_data, $default_flow_data[$key], $value);
		}
		return $flow_data; 
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
					if ( is_array($value) && !empty($value) ) 
						self::check_key_in_nested_array($value, $flow_data[$key], $key);
					else $mismatch_key[] = $header_key. " => " . $value;
				}
				else $mismatch_key[]  = $header_key. " => " . $key;
			}
			elseif ( is_array( $value ) && !empty($value) ) {
				self::check_key_in_nested_array($value, $flow_data[$key], $key);
			}
		}
		return implode(", ", $mismatch_key);
	}
}