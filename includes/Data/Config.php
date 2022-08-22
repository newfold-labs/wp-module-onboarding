<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * WordPress and Onboarding configuration data.
 */
final class Config {
	 // The values need to be a string, this can later be converted to raw values.
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
}
