<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\CustomerBluehost\CustomerBluehost;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Flows;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;

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
			'restUrl'           => \get_home_url() . '/index.php?rest_route=',
			'adminUrl'          => \admin_url(),
			'currentBrand'      => self::current_brand(),
			'currentPlan'       => self::current_plan(),
			'currentFlow'       => self::current_flow(),
			'pluginInstallHash' => PluginInstaller::rest_get_plugin_install_hash(),
			'previewSettings'   => array(
				'settings'        => Preview::get_settings(),
				'stepPreviewData' => Themes::step_preview_data(),
			),
		);
	}

	/**
	 * Establish brand to apply to Onboarding experience.
	 *
	 * @return array
	 */
	public static function current_brand() {
		$brands = Brands::get_brands();

		return array_key_exists( NFD_ONBOARDING_PLUGIN_BRAND, $brands ) ?
			$brands[ NFD_ONBOARDING_PLUGIN_BRAND ] :
			Brands::get_default_brand();
	}


	/**
	 * Get the current hosting plan information.
	 *
	 * @return array
	 */
	public static function current_plan() {
		$customer_data = self::customer_data();

		$current_flow = Flows::get_flow_from_customer_data( $customer_data );
		if ( false !== $current_flow ) {
			return array(
				'flow'    => $current_flow,
				'subtype' => $customer_data['plan_subtype'],
				'type'    => $customer_data['plan_type'],
			);
		}

		$current_flow = Flows::get_flow_from_params();
		if ( false !== $current_flow ) {
			return array(
				'flow'    => $current_flow,
				'subtype' => Flows::is_commerce_priority() ? 'wc_priority' : null,
				'type'    => null,
			);
		}

		$current_flow = Flows::get_flow_from_plugins();
		if ( false !== $current_flow ) {
			switch ( $current_flow ) {
				case 'ecommerce':
					return array(
						'flow'    => 'ecommerce',
						'subtype' => 'wc_priority',
						'type'    => null,
					);
			}
		}

		$current_flow = Flows::get_flow_from_top_priority();
		if ( false !== $current_flow ) {
			return array(
				'flow'    => 'ecommerce',
				'subtype' => 'wc_priority',
				'type'    => null,
			);
		}

		return array(
			'flow'    => Flows::get_default_flow(),
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
		$current_plan = self::current_plan();
		return $current_plan['flow'];
	}

	/**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return array
	 */
	public static function customer_data() {
		if ( class_exists( 'NewfoldLabs\WP\Module\CustomerBluehost\CustomerBluehost' ) ) {
			return CustomerBluehost::collect();
		}
		return array();
	}

	/**
	 * Determine whether the site is in coming soon mode.
	 *
	 * @return boolean
	 */
	public static function coming_soon() {
		// Check if nfd_coming_soon is set to true.
		$coming_soon = \get_option( Options::get_option_name( 'new_coming_soon', false ), null );
		if ( null !== $coming_soon ) {
			return 'true' === $coming_soon;
		}

		// Check if legacy mm_coming_soon is set to true.
		$coming_soon = \get_option( Options::get_option_name( 'old_coming_soon', false ), null );
		if ( null !== $coming_soon ) {
			return 'true' === $coming_soon;
		}

		// Assume site has been launched if both options do not exist.
		return false;
	}

}
