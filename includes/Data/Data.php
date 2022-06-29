<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * CRUD methods for Onboarding config for use in API, CLI and runtime.
 */
final class Data {
	/**
	 * Runtime data for Onboarding application
	 */
	public static function runtime() {
		return array(
			'url'               => \NFD_ONBOARDING_BUILD_URL,
			'admin'             => \admin_url(),
			'currentBrand'      => self::current_brand(),
			'currentPlan'       => self::current_plan(),
			'currentFlow'       => self::current_flow(),
			'pluginInstallHash' => Permissions::rest_get_plugin_install_hash(),
		);
	}

	/**
	 * Establish brand to apply to Onboarding experience.
	 *
	 * [TODO]: Pull brand from container.
	 *
	 * @return array
	 */
	public static function current_brand() {

		$brand = \get_option( 'mm_brand', 'newfold' );
		// This case arises when the option mm_brand exists but has an empty string as it's value.
		if ( empty( $brand ) ) {
			$brand = 'newfold';
		}
		\apply_filters( 'nfd_module_onboarding_brand', $brand );

		$brands = Brands::get_brands();

		return array_key_exists( $brand, $brands ) ? $brands[ $brand ] : array( 'brand' => $brand );
	}

	/**
	 * Get current hosting plan.
	 *
	 * [TODO]: Pull the actual plan.
	 *
	 * @return string
	 */
	public static function current_plan() {
		return 'shared';
	}
	
	/**
	 * Get the current onboarding flow.
	 *
	 * @return string
	 */
	public static function current_flow() {
		$flows = Flows::get_flows();

		if ( isset( $_GET['flow'] ) ) {
               $current_flow_type = \sanitize_text_field( $_GET['flow'] );
          }

		if ( ! empty( $current_flow_type ) && isset( $flows[ $current_flow_type ] ) ) {
			return $current_flow_type;
		}

		$current_flow_type = \get_option( 'nfd_onboarding_flow_preset', false );
		if ( $current_flow_type && isset( $flows[ $current_flow_type ] ) ) {
			return $current_flow_type;
		}

		return Flows::get_default_flow();
	}
} // END \NewfoldLabs\WP\Module\Onboarding\Data()
