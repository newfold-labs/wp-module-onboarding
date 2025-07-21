<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Config;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Config;

class SettingsService {

	/**
	 * Initialize WordPress Options, Permalinks and Configuration.
	 *
	 * @return void
	 */
	public static function initialize(): void {
		if ( \get_option( Options::get_option_name( 'settings_initialized' ), false ) ) {
			return;
		}

		// Update wp_options
		$init_options = Options::get_initialization_options();
		foreach ( $init_options as $option_key => $option_value ) {
			\update_option( Options::get_option_name( $option_key, false ), $option_value );
		}
		// Can't be part of initialization constants as they are static.
		\update_option( Options::get_option_name( 'start_date' ), gmdate( 'U' ) );

		// Flush permalinks
		flush_rewrite_rules();

		// Add constants to the WordPress configuration (wp-config.php)
		$wp_config_constants = Config::get_wp_config_initialization_constants();
		$wp_config           = new WP_Config();
		foreach ( $wp_config_constants as $constant_key => $constant_value ) {
			if ( $wp_config->constant_exists( $constant_key ) ) {
				$wp_config->update_constant( $constant_key, $constant_value );
				continue;
			}
			$wp_config->add_constant( $constant_key, $constant_value );
		}

		\update_option( Options::get_option_name( 'settings_initialized' ), true );
	}
}
