<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Data\SiteCapabilities;

/**
 * WordPress and Onboarding configuration data.
 */
final class Config {
	/**
	 * The values need to be a string, this can later be converted to raw values.
	 *
	 * @var array
	 */
	protected static $wp_config_initialization_constants = array(
		'AUTOSAVE_INTERVAL'    => '300',
		'WP_POST_REVISIONS'    => '20',
		'EMPTY_TRASH_DAYS'     => '7',
		'WP_AUTO_UPDATE_CORE'  => 'true',
		'WP_CRON_LOCK_TIMEOUT' => '120',
	);

	/**
	 * Get the initial values for wp-config constants.
	 *
	 * @return array
	 */
	public static function get_wp_config_initialization_constants() {
		return self::$wp_config_initialization_constants;
	}

	/**
	 * Get a specific site capability.
	 *
	 * @param string $capability Name/slug of the capability.
	 * @return boolean
	 */
	public static function get_site_capability( $capability ) {
		if ( ! self::check_permissions() ) {
			return false;
		}

		$site_capabilities = new SiteCapabilities();
		return $site_capabilities->get( $capability );
	}

	/**
	 * Gets the current customer capability if he has access to AI Sitegen.
	 *
	 * @return boolean
	 */
	public static function has_ai_sitegen() {
		return self::get_site_capability( 'hasAISiteGen' );
	}

	/**
	 * Gets the current site's capability if it can import via instaWp.
	 *
	 * @return boolean
	 */
	public static function can_migrate_site() {
		return self::get_site_capability( 'canMigrateSite' );
	}

	/**
	 * Gets the current site's capability if it has solution.
	 *
	 * @return boolean
	 */
	public static function has_solution() {
		return self::get_site_capability( 'hasSolution' );
	}

	/**
	 * Checks if the request is an onboarding request.
	 *
	 * @param string|null $request_url The request URL to check, if not provided, it will use the referer.
	 * @return bool
	 */
	public static function is_onboarding_request( ?string $request_url = null ): bool {
		try {
			$request_url = $request_url ?? wp_get_referer();
			$request_url = parse_url( $request_url );
			$home_url    = parse_url( home_url() );

			// Fail if request is not coming from the site
			if (
				isset( $request_url['host'] ) &&
				isset( $home_url['host'] ) &&
				$request_url['host'] !== $home_url['host']
			) {
				return false;
			}

			// Fail if request is not coming from the onboarding page
			if (
				! isset( $request_url['query'] ) ||
				0 !== strpos( $request_url['query'], 'page=nfd-onboarding' )
			) {
				return false;
			}

			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}

	/**
	 * Checks if the request is valid and has the necessary permissions.
	 *
	 * The capability check can be invoked many times during a request lifecycle.
	 * Sometimes we need to reach out to Hiive to get results.
	 * So we use this permission check to avoid unnecessary calls to Hiive.
	 *
	 * @return bool
	 */
	private static function check_permissions(): bool {
		if (
			current_user_can( 'manage_options' ) &&
			( self::is_onboarding_request() || wp_is_serving_rest_request() || is_admin() )
		) {
			return true;
		}

		return false;
	}
}
