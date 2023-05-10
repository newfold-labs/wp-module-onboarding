<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Preview;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType;
use NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType;

/**
 * Class FlowService
 */
class FlowService {

	/**
	 * Get the Onboarding flow data.
	 *
	 * @return array
	 */
	public static function get_flow_data() {
		$result = self::read_data_from_wp_option();
		if ( ! $result ) {
			$result              = Flows::get_data();
			$result['createdAt'] = time();
			$result              = self::update_data_for_ecommerce( $result );
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

		$flow_data = self::get_flow_data();

		foreach ( $params as $key => $param ) {
			$value = self::array_search_key( $key, $flow_data );
			if ( false === $value ) {
				return new \WP_Error(
					'wrong_param_provided',
					"Wrong Parameter Provided : $key",
					array( 'status' => 404 )
				);
			}
		}

		/*
		[TODO] Handle this and some of the site name, logo, description logic in a cleaner way.
		At least the primary and secondary update does not run on every flow data request.
		*/
		if ( ! empty( $params['data']['siteType']['primary']['refers'] ) &&
		( empty( $flow_data['data']['siteType']['primary']['value'] ) || $flow_data['data']['siteType']['primary']['value'] !== $params['data']['siteType']['primary']['value'] ) ) {
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
		( empty( $flow_data['data']['siteType']['secondary']['value'] ) || $flow_data['data']['siteType']['secondary']['value'] !== $params['data']['siteType']['secondary']['value'] ) ) {
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

		$flow_data = array_replace_recursive( $flow_data, $params );

		// Update timestamp everytime the Onboarding flow data is updated.
		$flow_data['updatedAt'] = time();

		// Update Blog Information from Basic Info
		if ( ( ! empty( $flow_data['data']['blogName'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_name', false ), $flow_data['data']['blogName'] );
		}

		if ( ( ! empty( $flow_data['data']['blogDescription'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_description', false ), $flow_data['data']['blogDescription'] );
		}

		if ( ( ! empty( $flow_data['data']['siteLogo'] ) ) && ! empty( $flow_data['data']['siteLogo']['id'] ) ) {
				\update_option( Options::get_option_name( 'site_icon', false ), $flow_data['data']['siteLogo']['id'] );
				\update_option( Options::get_option_name( 'site_logo', false ), $flow_data['data']['siteLogo']['id'] );
		} else {
			\update_option( Options::get_option_name( 'site_icon', false ), 0 );
			\delete_option( Options::get_option_name( 'site_logo', false ) );
		}

		if ( ! self::update_data_in_wp_option( $flow_data ) ) {
			return new \WP_Error(
				'database_update_failed',
				'There was an error saving the data',
				array( 'status' => 404 )
			);
		}

		return $flow_data;
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
		}
		return $data;
	}

	/**
	 * Update Onboarding flow data in the wp_option.
	 *
	 * @param array $data default blueprint flow data.
	 *
	 * @return array
	 */
	private static function update_data_in_wp_option( $data ) {
		return \update_option( Options::get_option_name( 'flow' ), $data );
	}

	/**
	 * Search for $needle_key in $array recursively.
	 *
	 * @param string $needle_key The key to be searched for.
	 * @param array  $array The array in which the search occurs.
	 *
	 * @return boolean
	 */
	private static function array_search_key( $needle_key, $array ) {
		foreach ( $array as $key => $value ) {
			if ( strcmp( $key, $needle_key ) === 0 ) {
				return true;
			}
			if ( is_array( $value ) ) {
				$result = self::array_search_key( $needle_key, $value );
				if ( false !== $result ) {
					return $result;
				}
			}
		}
		return false;
	}

}
