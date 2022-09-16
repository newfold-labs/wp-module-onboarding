<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use Bluehost\WP\Data\Customer;

/**
 * CRUD methods for Onboarding config for use in API, CLI and runtime.
 */
final class Data {
	/**
	 * Runtime data for Onboarding application
	 */
	public static function runtime() {
		return array(
			'buildUrl'          => \NFD_ONBOARDING_BUILD_URL,
			'siteUrl'           => \get_site_url(),
			'restUrl'			=> \get_home_url() . '/index.php?rest_route=',
			'adminUrl'          => \admin_url(),
			'currentBrand'      => self::current_brand(),
			'currentPlan'       => self::current_plan(),
			'currentFlow'       => self::current_flow(),
			'pluginInstallHash' => Permissions::rest_get_plugin_install_hash(),
			'previewSettings'   => self::preview_settings(),
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

		$brand = \get_option( Options::get_option_name( 'brand', false ), 'newfold' );
		// This case arises when the option mm_brand exists but has an empty string as it's value.
		if ( empty( $brand ) ) {
			$brand = 'newfold';
		}
		$brand = \apply_filters( 'nfd_module_onboarding_brand', sanitize_title_with_dashes( str_replace('_', '-', $brand) ) );

		$brands = Brands::get_brands();

		return array_key_exists( $brand, $brands ) ? $brands[ $brand ] : array( 'brand' => $brand );
	}


	/**
	 * Get the current hosting plan information.
	 *
	 * @return array
	 */
	public static function current_plan() {
		$customer_data = self::customer_data();

		if ( isset( $customer_data['plan_type'] ) && isset( $customer_data['plan_subtype'] ) ) {
			 return array(
				 'flow'    => Flows::get_flow_from_plan_subtype( $customer_data['plan_subtype'] ),
				 'subtype' => $customer_data['plan_subtype'],
				 'type'    => $customer_data['plan_type'],
			 );
		}

		  return array(
			  'flow'    => self::current_flow(),
			  'subtype' => null,
			  'type'    => null,
		  );
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

	public static function preview_settings() {
		 $block_editor_context = new \WP_Block_Editor_Context( array( 'name' => 'core/edit-site' ) );
		 $custom_settings      = array(
			 'siteUrl' => \site_url(),
		 );

		 return array(
			 'settings'     => \get_block_editor_settings( $custom_settings, $block_editor_context ),
			 'globalStyles' => \wp_get_global_styles(),
		 );
	}

	/**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return array
	 */
	public static function customer_data() {
		if ( class_exists( 'Bluehost\WP\Data\Customer' ) ) {
			 return Customer::collect();
		}
		 return array();
	}
} // END \NewfoldLabs\WP\Module\Onboarding\Data()
