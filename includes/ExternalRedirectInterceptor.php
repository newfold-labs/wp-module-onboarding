<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Bluehost;

/**
 * Class to intercept redirect calls and filter them.
 *
 * The purpose of this class is to prevent any redirects while the user is on the onboarding page.
 * The only allowed redirect is to the brand plugin page.
 */
class ExternalRedirectInterceptor {
	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( ! isset( $_GET['page'] ) || \sanitize_text_field( $_GET['page'] ) !== WP_Admin::$slug ) {
			return;
		}

		\add_filter( 'wp_redirect', array( $this, 'wp_redirect' ), 10, 1 );
	}

	/**
	 * Intercept wp_redirect calls and filter them.
	 *
	 * @param string $location The location to redirect to.
	 */
	public function wp_redirect( $location ): string {
		$brand_plugin_url = Bluehost::get_plugin_dashboard_page();

		// Check if the location contains any whitelisted params.
		$location_has_whitelisted_params = $this->url_has_whitelisted_params( $location );

		// Allow the redirect if it has whitelisted params.
		if ( $location_has_whitelisted_params ) {
			return $location;
		}

		// Check if the location is the brand plugin page.
		$location_is_brand_plugin_url = strpos( $location, $brand_plugin_url );
		// Intercept if the redirect is going anywhere other than the brand plugin page.
		if ( false === $location_is_brand_plugin_url || 0 !== $location_is_brand_plugin_url ) {
			return '';
		}

		// Allow the redirect if it's going to the brand plugin page.
		return $location;
	}

	/**
	 * Check if the URL has any whitelisted params.
	 *
	 * @param string $url The URL to check.
	 * @return bool True if the URL has any whitelisted params, false otherwise.
	 */
	private function url_has_whitelisted_params( string $url ): bool {
		$whitelisted_params = array(
			'referrer' => WP_Admin::$slug,
		);

		foreach ( $whitelisted_params as $key => $value ) {
			if ( false !== strpos( $url, $key . '=' . $value ) ) {
				return true;
			}
		}

		return false;
	}
}
