<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Preview;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType;
use NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType;
use WP_Forge\UpgradeHandler\UpgradeHandler;

/**
 * Class FlowService
 */
class FlowService {

	/**
	 * Initialize Flow Data on refresh.
	 *
	 * @return boolean
	 */
	public static function initialize_flow_data() {
		$default_data = self::get_default_data();
		$data    = self::read_data_from_wp_option();

		if ( ! $data ) {
			return self::update_data_in_wp_option( $default_data );
		}

		$data['version'] = isset( $data['version'] ) ? $data['version'] : '';
		$upgrade_handler = new UpgradeHandler(
			NFD_ONBOARDING_DIR . '/includes/Data/Flows/Upgrades',
			$data['version'],
			$default_data['version']
		);

		// Returns true if the old version doesn't match the new version
		$upgrade_status = $upgrade_handler->maybe_upgrade();
		if ( $upgrade_status ) {
			$data = self::read_data_from_wp_option();
			$updated_data = self::update_data_recursive( $default_data, $data );
			// To update the options with the recent version of flow data
			$updated_data['version'] = $default_data['version'];
			return self::update_data_in_wp_option( $updated_data );
		}

		return false;
	}

	/**
	 * Default Blueprint Data set based on the flow type.
	 *
	 * @return array
	 */
	public static function get_default_data() {
		// check if data is available in the database if not then fetch the default dataset
		$data              = Flows::get_data();
		$data['createdAt'] = time();
		$data              = self::update_data_for_ecommerce( $data );
		return $data;
	}

	/**
	 * Get the Onboarding flow data.
	 *
	 * @return array
	 */
	public static function get_flow_data() {
		$result = self::read_data_from_wp_option();
		if ( ! $result ) {
			$result = self::get_default_data();
			self::update_data_in_wp_option( $result );
		}
		return $result;
	}

	/**
	 * Update the Onboarding flow data.
	 *
	 * @param array $params The params to update in flow data.
	 * @return array
	 */
	public static function update_flow_data( $params ) {
		if ( empty( $params ) ) {
			return new \WP_Error(
				'no_post_data',
				'No Data Provided',
				array( 'status' => 404 )
			);
		}

		$default_data = self::get_default_data();
		$mismatch_key = self::find_mismatch_key( $params, $default_data );
		if ( is_wp_error( $mismatch_key ) ) {
			return $mismatch_key;
		}

		$data = self::update_post_call_data_recursive( $params, $default_data );
		if ( is_wp_error( $data ) ) {
			return $data;
		}

		/*
		[TODO] Handle this and some of the site name, logo, description logic in a cleaner way.
		At least the primary and secondary update does not run on every flow data request.
		*/
		if ( ! empty( $params['data']['siteType']['primary']['refers'] ) &&
		( empty( $data['data']['siteType']['primary']['value'] ) || $data['data']['siteType']['primary']['value'] !== $params['data']['siteType']['primary']['value'] ) ) {
			if ( class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType' ) ) {
				$primary_type = new PrimaryType( $params['data']['siteType']['primary']['refers'], $params['data']['siteType']['primary']['value'] );
				if ( ! $primary_type->save() ) {
					return new \WP_Error(
						'wrong_param_provided',
						__( 'Wrong Parameter Provided : primary => value', 'wp-module-onboarding' ),
						array( 'status' => 404 )
					);
				}
			}
		}

		if ( ! empty( $params['data']['siteType']['secondary']['refers'] ) &&
		( empty( $data['data']['siteType']['secondary']['value'] ) || $data['data']['siteType']['secondary']['value'] !== $params['data']['siteType']['secondary']['value'] ) ) {
			if ( class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType' ) ) {
				$secondary_type = new SecondaryType( $params['data']['siteType']['secondary']['refers'], $params['data']['siteType']['secondary']['value'] );
				if ( ! $secondary_type->save() ) {
					return new \WP_Error(
						'wrong_param_provided',
						__( 'Wrong Parameter Provided : secondary => value', 'wp-module-onboarding' ),
						array( 'status' => 404 )
					);
				}
			}
		}

		// Update timestamp everytime the Onboarding flow data is updated.
		$data['updatedAt'] = time();

		// Update Blog Information from Basic Info
		if ( ( ! empty( $data['data']['blogName'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_name', false ), $data['data']['blogName'] );
		}

		if ( ( ! empty( $data['data']['blogDescription'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_description', false ), $data['data']['blogDescription'] );
		}

		if ( ( ! empty( $data['data']['siteLogo'] ) ) && ! empty( $data['data']['siteLogo']['id'] ) ) {
				\update_option( Options::get_option_name( 'site_icon', false ), $data['data']['siteLogo']['id'] );
				\update_option( Options::get_option_name( 'site_logo', false ), $data['data']['siteLogo']['id'] );
		} else {
			\update_option( Options::get_option_name( 'site_icon', false ), 0 );
			\delete_option( Options::get_option_name( 'site_logo', false ) );
		}

		if ( ! self::update_data_in_wp_option( $data ) ) {
			return new \WP_Error(
				'database_update_failed',
				'There was an error saving the data',
				array( 'status' => 404 )
			);
		}

		return $data;
	}

	/**
	 * Function to update the Flow Data (Blueprint) in an array recursively in comparison to Flows::get_data() (Database)
	 *
	 * @param array $default_data Blueprint Data
	 * @param array $data WP Options Data
	 *
	 * @return array
	 */
	private static function update_data_recursive( $default_data, $data ) {
		$updated_data = array();

		foreach ( $default_data as $key => $value ) {
			// To align the new data OR datatype of the respective values with the one set in the blueprint
			if ( ! array_key_exists( $key, $data ) || ( gettype( $value ) !== gettype( $data[ $key ] ) ) ) {
				$updated_data[ $key ] = $value;
				continue;
			}

			// Accepts the value of non array OR empty array values from options
			if ( ! is_array( $value ) || ( is_array( $value ) && count( $value ) === 0 ) ) {
				$updated_data[ $key ] = $data[ $key ];
				continue;
			}

			// To handle Indexed Arrays gracefully
			if ( self::is_array_indexed( $value ) ) {
				// To check if an Indexed Array is further Nested or Not
				foreach ( $value as $index_key => $index_value ) {
					// For Indexed Arrays having Non Associative Array Values
					( ! is_array( $index_value ) && isset( $data[ $key ] ) ) ?
						$updated_data[ $key ]   = $data[ $key ]
						: $updated_data[ $key ] = $value;
				}
				continue;
			}

			// To handle Associative Arrays gracefully
			$updated_data[ $key ] = self::update_data_recursive( $value, $data[ $key ] );
		}
		return $updated_data;
	}

	/**
	 * Function to update the Database recursively based on Values opted or entered by the User
	 *
	 * @param array $params Params Data
	 * @param array $default_data Default Blueprint Data
	 *
	 * @return \WP_Error|array
	 */
	private static function update_post_call_data_recursive( $params, &$default_data ) {
		$exception_list = Flows::get_exception_list();

		foreach ( $default_data as $key => $value ) {
			if ( ! array_key_exists( $key, $params ) ) {
				return new \WP_Error(
					'param_not_provided',
					'Parameter Not Provided : ' . $key,
					array( 'status' => 400 )
				);
			}

			// Verifies the value of Exception List keys from the database and options
			if ( isset( $exception_list[ $key ] ) ) {
				$default_data[ $key ] = $params[ $key ];
				continue;
			}

			// Error thrown if the datatype of the parameter does not match
			if ( gettype( $value ) !== gettype( $params[ $key ] ) ) {
				return new \WP_Error(
					'wrong_param_type_provided',
					'Wrong Parameter Type Provided : ' . $key . ' => ' . gettype( $params[ $key ] ) . '. Expected: ' . gettype( $value ),
					array( 'status' => 400 )
				);
			}

			// Accepts non-Array Values entered by the user or if the Database value is Empty/Indexed Array, to avoid Associative arrays to be overwritten (Eg: data)
			if ( ! is_array( $value ) || self::is_array_indexed( $value ) ) {
				$default_data[ $key ] = $params[ $key ];
				continue;
			}

			// To handle Indexed Arrays gracefully
			if ( self::is_array_indexed( $params[ $key ] ) && ! self::is_array_indexed( $value ) && count( $params[ $key ] ) > 0 ) {
				// Verify if a value expected as an Associative Array is NOT an Indexed Array
				return new \WP_Error(
					'wrong_param_type_provided',
					'Wrong Parameter Type Provided : ' . $key . ' => Indexed Array. Expected: Associative Array',
					array( 'status' => 400 )
				);
			}

			// To handle Associative Arrays gracefully
			$nested_data = self::update_post_call_data_recursive( $params[ $key ], $value );
			if ( is_wp_error( $nested_data ) ) {
				return $nested_data;
			}
			$default_data[ $key ] = $nested_data;
		}
		return $default_data;
	}

	/**
	 * Logic to check for an Indexed Array
	 *
	 * @param array $array To verify for an Indexed Array
	 *
	 * @return boolean
	 */
	private static function is_array_indexed( $array ) {
		return count( array_filter( array_keys( $array ), 'is_string' ) ) === 0;
	}

	/**
	 * Switch the Onboarding flow.
	 *
	 * @param string $flow A valid Onboarding flow for a brand.
	 * @return \WP_Error|boolean
	 */
	public static function switch_flow( $flow ) {
		// Get all the enabled flows for a brand.
		$enabled_flows = Flows::get_flows();
		// If the request flow does not exist or is not enabled then return an error.
		if ( ! isset( $enabled_flows[ $flow ] ) || true !== $enabled_flows[ $flow ] ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Flow not enabled.',
				array( 'status' => 400 )
			);
		}

		// Reset the Plugin Install Status and Queue.
		PluginInstallTaskManager::reset_install_status();

		// Get the pre requisites for a flow.
		$pre_requisites = Preview::get_pre_requisites( $flow );
		if ( ! isset( $pre_requisites ) || ! isset( $pre_requisites['plugins'] ) ) {
			return true;
		}

		// Install and activate all the required plugins.
		foreach ( $pre_requisites['plugins'] as $plugin => $active ) {
			// Skip if the plugin installation if it is already active.
			if ( 'activated' === $active ) {
				continue;
			}

			$plugin_install_task = new PluginInstallTask( $plugin, true );
			$status              = $plugin_install_task->execute();

			if ( \is_wp_error( $status ) ) {
				return $status;
			}
		}

		return true;
	}

	/**
	 * Function to search for key in array recursively with case sensitive exact match
	 *
	 * @param array  $params Param Data
	 * @param array  $default_data Default Blueprint Data
	 * @param string $header_key Array Level in Recursion
	 *
	 * @return \WP_error|boolean
	 */
	public static function find_mismatch_key( $params, $default_data, $header_key = 'Base Level' ) {
		foreach ( $params as $key => $value ) {
			if ( is_array( $default_data ) ) {
				// Error if the key added by the user is not present in the database
				if ( ! array_key_exists( $key, $default_data ) ) {
					return new \WP_Error(
						'wrong_param_provided',
						'Wrong Parameter Provided',
						array(
							'status'                  => 400,
							'Mismatched Parameter(s)' => $header_key . ' => ' . $key,
						)
					);
				}

				// To check sub-Arrays: Indexed/Empty Arrays
				if ( ! is_array( $value ) || empty( $value ) || ( ! empty( $value ) && empty( $default_data[ $key ] ) ) || self::is_array_indexed( $value ) ) {
					continue;
				}

				// For Associative Arrays
				$verify_key = self::find_mismatch_key( $value, $default_data[ $key ], $key );
				if ( is_wp_error( $verify_key ) ) {
					return $verify_key;
				}
			}
		}
		return true;
	}

	/**
	 * Read Onboarding flow data from the wp_option.
	 *
	 * @return array
	 */
	public static function read_data_from_wp_option() {
		return \get_option( Options::get_option_name( 'flow' ), false );
	}

	/**
	 * Update flow data params if the current flow is ecommerce.
	 *
	 * @param array $data The flow data.
	 *
	 * @return array
	 */
	private static function update_data_for_ecommerce( $data ) {
		// get current flow type
		$flow_type = Data::current_flow();
		if ( 'ecommerce' === $flow_type ) {
			// update default data with ecommerce data
			$data['data']['topPriority']['priority1'] = 'selling';
			$data['data']['siteType']['referTo']      = 'business';
		}
		return $data;
	}

	/**
	 * Update Onboarding flow data in the wp_option.
	 *
	 * @param array $data flow data.
	 *
	 * @return array
	 */
	private static function update_data_in_wp_option( $data ) {
		return \update_option( Options::get_option_name( 'flow' ), $data );
	}
}
