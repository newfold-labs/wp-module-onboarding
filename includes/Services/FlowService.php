<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

    public static function initalize_flow_data() { 
		$flow_data = Flows::get_data();
		$flow_data_fixes = Flows::get_fixes();
        if ( ! ( $result = self::read_flow_data_from_wp_option() ) )
            $result = self::get_default_flow_data();
		if ($flow_data_fixes) {
			\do_action('qm/debug', $flow_data_fixes);
			foreach($flow_data_fixes as $key=>$value) {
				$result = self::rename_keys($value, $flow_data, $result);
				self::update_wp_options_data_in_database($result);
			}
		}
		$result = self::update_flow_data($result);
		self::update_wp_options_data_in_database($result);
		\do_action('qm/debug', $result);
        return $result;
    }

    private static function get_default_flow_data() {
		// check if data is available in the database if not then fetch the default dataset
		$result              = Flows::get_data();
		$result['createdAt'] = time();
		// get current flow type
		$flow_type = Data::current_flow();
		// update default data if flow type is ecommerce
		if($flow_type == 'ecommerce') 
			$result = self::update_default_data_for_ecommerce( $result );
		self::update_wp_options_data_in_database( $result );
		return $result;
	}

	/*
	 * function to compare and add Flows::get_data() items to database
	 */
	private static function update_flow_data($result) {
		if ( array_diff(self::flatten_array(Flows::get_data()), self::flatten_array($result)) ) {
			$result = array_replace_recursive( Flows::get_data(), $result);
			self::update_wp_options_data_in_database( $result );
		}
		$delete_flow_data = self::delete_wp_options_data_in_database(Flows::get_data(), $result);
		if ( ! is_null($delete_flow_data) )
			$result = $delete_flow_data;
		return $result;
	}

	/*
	 * function to delete a key in array recursively which does not exist in Flows::get_data()
	 */
	private static function delete_wp_options_data_in_database( $flow_data, &$result ) {
		foreach($result as $key => $value) {
			if(!array_key_exists($key, $flow_data)) 
				unset($result[$key]);
			elseif ( is_array( $value ) && !empty($value) )
				$result[$key] = self::delete_wp_options_data_in_database($flow_data[$key], $value);
		}
		return $result;
	}

	public static function rename_keys($flow_data_fixes, &$data, &$input){
		foreach ($input as $key => $value) {
			if (strcmp($key, $flow_data_fixes['old_key']) == 0) {
				if (array_key_exists('new_value', $flow_data_fixes)) {
					if(! array_key_exists('new_key', $flow_data_fixes)) 
						$input[$key] = $flow_data_fixes['new_value'];
					else{
						$key = $flow_data_fixes['new_key'];	
						unset($input[$flow_data_fixes['old_key']]);
						$input[$key] = $flow_data_fixes['new_value'];
					}
				}
				$key = $flow_data_fixes['new_key'];
				unset($input[$flow_data_fixes['old_key']]);
			}
			if (is_array($value)) 
				$input[$key] = self::rename_keys( $flow_data_fixes, $data[$key], $value);
		}
		return $input; 
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

    private static function flatten_array( $array ) {
		$all_keys = array();
		foreach ($array as $key => $value) {
			$all_keys[] = $key;
			if (is_array($value)) {
				$all_keys = array_merge($all_keys, self::flatten_array($value));
			}
		}
		return $all_keys;
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
					$mismatch_key[] = $header_key. " => " . $value;
				}
				else $mismatch_key[]  = $header_key. " =>  " . $key;
			}
			elseif ( is_array( $value ) && !empty($value) ) {
				self::check_key_in_nested_array($value, $flow_data, $key);
			}
		}
		return implode(", ", $mismatch_key);
	}
}