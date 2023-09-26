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
		$site_capabilities = new SiteCapabilities();
		return $site_capabilities->get( $capability );
	}

	/**
	 * Checks if the site is on Jarvis hosting.
	 *
	 * @return boolean
	 */
	public static function is_jarvis() {
		return self::get_site_capability( 'isJarvis' );
	}
}
