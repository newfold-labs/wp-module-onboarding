<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

class FlowService {

    /**
	 * @var array
	 * This is the key if a user tries to add a param externally
	 */
	protected static $mismatch_key = [];

    public static function initalise_onboarding_flow_data() {
        if ( ! ( $result = self::read_details_from_wp_options() ) ) {
            $result = self::default_onboarding_data();
        }
		$result = self::diff_onboarding_data($result);
		$result = self::delete_diff_onboarding_data($result);
		self::update_wp_options_data_in_database($result);
        return $result;
    }

    private static function default_onboarding_data() {
		// check if data is available in the database if not then fetch the default dataset
		$result              = Flows::get_data();
		$result['createdAt'] = time();
		// update default data if flow type is ecommerce
		$result = self::update_default_data_for_ecommerce( $result );
		self::update_wp_options_data_in_database( $result );
		return $result;
	}

	/*
	 * function to compare and add Flows::get_data() items to database
	 */
	private static function diff_onboarding_data($result) {
		if ( array_diff(self::flatten_array(Flows::get_data()), self::flatten_array($result)) ) {
			$result = array_replace_recursive( Flows::get_data(), $result);
			self::update_wp_options_data_in_database( $result );
		}
		return $result;
	}

	/*
	 * function to delete a key in array which does not exist in Flows::get_data()
	 */
	private static function delete_diff_onboarding_data($result) {
		$delete_flow_item = array_diff(self::flatten_array($result), self::flatten_array(Flows::get_data()));

		if ($delete_flow_item) {
			foreach ( $delete_flow_item as $key => $value ) {
				if (in_array($value, array_keys($result), true) ) {
					unset($result[$value]);
				}
				else {
					return self::delete_wp_options_data_in_database($value, $result);
				}
		}}
	}

	/*
	 * function to delete a key in array recursively which does not exist in Flows::get_data()
	 */
	private static function delete_wp_options_data_in_database( $data, &$arrFlow ) {
		foreach ( $arrFlow as $key => $value) {
				if (is_array($value)) {
					if (in_array($data, array_keys($value), true) ) {
						unset($arrFlow[$key][$data]);
					}
					else {
						$arrFlow[$key] = self::delete_wp_options_data_in_database( $data, $value );
					}
				}
			}
			return $arrFlow;
	}

    /*
	 * Read onboarding flow options from database
	*/
	public static function read_details_from_wp_options() {
		return \get_option( Options::get_option_name( 'flow' ) );
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
		// get current flow type
		$flow_type = Data::current_flow();
		if($flow_type == 'ecommerce') {
			// update default data with ecommerce data
			$data['data']['topPriority']['priority1'] = 'selling';
			$data['data']['siteType'] = array('label' => '', 'referTo' => 'business');
		}
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
	public static function check_key_in_nested_array( $arrParam, $arrFlow ) {
		foreach($arrParam as $key => $value){
			if(!array_key_exists($key, $arrFlow))
			{
				if (count(array_filter(array_keys($arrParam), 'is_string')) === 0) {
					self::$mismatch_key[] = implode(", ", array_keys($value));
				}
				self::$mismatch_key[]  = $key;
				break;
			}
			elseif ( is_array( $value ) && !empty($value) )
			{
				$new_diff = self::check_key_in_nested_array($value, $arrFlow[$key]);
				if($new_diff)
				{
					$difference[$key] = $value;
					self::$mismatch_key[] = $value;
					break;
				}
			}
		}
		return self::$mismatch_key[0];
	}
}