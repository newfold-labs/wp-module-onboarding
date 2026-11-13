<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Brand configuration accessor for multi-brand host plugins.
 */
final class BrandConfig {

	/**
	 * Current onboarding brand slug (e.g. bluehost, hostgator-us).
	 *
	 * @return string
	 */
	public static function get_brand_slug(): string {
		if ( defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ) {
			return NFD_ONBOARDING_PLUGIN_BRAND;
		}

		return 'bluehost';
	}

	/**
	 * Whether the slug is defined in Brands::get_brands().
	 *
	 * @param string $brand Brand slug.
	 * @return bool
	 */
	public static function is_known_brand( string $brand ): bool {
		return array_key_exists( $brand, Brands::get_brands() );
	}

	/**
	 * Brand plugin dashboard admin URL for the current brand.
	 *
	 * @return string
	 */
	public static function get_plugin_dashboard_page(): string {
		$current = Runtime::current_brand();

		return isset( $current['pluginDashboardPage'] ) ? $current['pluginDashboardPage'] : \admin_url( 'admin.php' );
	}

	/**
	 * Query args appended when redirecting to the brand plugin dashboard.
	 *
	 * @return array<string, string>
	 */
	public static function get_dashboard_redirect_params(): array {
		$current = Runtime::current_brand();

		if ( isset( $current['dashboardRedirectParams'] ) && is_array( $current['dashboardRedirectParams'] ) ) {
			return $current['dashboardRedirectParams'];
		}

		return array(
			'referrer' => 'nfd-onboarding',
		);
	}
}
