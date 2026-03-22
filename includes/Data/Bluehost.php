<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

class Bluehost {
	public static function get_data(): array {
		return array(
			'pluginDashboardPage'     => self::get_plugin_dashboard_page(),
			'dashboardRedirectParams' => self::get_dashboard_redirect_params(),
			'brands'                 => self::get_brands(),
		);
	}

	public static function get_plugin_dashboard_page(): string {
		return \admin_url( 'admin.php?page=bluehost' );
	}

	public static function get_dashboard_redirect_params(): array {
		return array(
			'referrer' => 'nfd-onboarding',
		);
	}

	public static function get_brands(): array {
		return array(
			'bluehost',
			'bluehost-india',
		);
	}

	public static function get_current_brand(): string {
		return defined( 'NFD_ONBOARDING_BLUEHOST_BRAND' ) ? NFD_ONBOARDING_BLUEHOST_BRAND : 'bluehost';
	}

		/**
	 * Sets the hosting brand for which Onboarding is active.
	 *
	 * @param string $brand The brand name. Allowed values are 'bluehost' and 'bluehost-india'.
	 * @return void
	 */
	public static function set_current_brand( string $brand = 'bluehost' ) {
		if ( ! defined( 'NFD_ONBOARDING_BLUEHOST_BRAND' ) ) {
			if ( empty( $brand ) || ! in_array( $brand, self::get_brands() ) ) {
				$brand = 'bluehost';
			}

			$brand = sanitize_title_with_dashes( str_replace( '_', '-', $brand ) );
			define( 'NFD_ONBOARDING_BLUEHOST_BRAND', $brand );
		}
	}
}
