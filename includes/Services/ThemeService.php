<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Class for providing theme related services.
 */
class ThemeService {
	/**
	 * Number of retry attempts made.
	 *
	 * @var int
	 */
	private static $retries = 0;

	/**
	 * Maximum number of retries allowed.
	 *
	 * @var int
	 */
	private static $max_retries = 3;

	/**
	 * Retry the theme installation.
	 *
	 * @return bool True if the retry was successful, false otherwise.
	 */
	private static function retry(): bool {
		++self::$retries;
		if ( self::$retries < self::$max_retries ) {
			return self::initialize();
		}

		return false;
	}

	/**
	 * Initialize the theme installation.
	 *
	 * @return bool True if the installation was successful, false otherwise.
	 */
	public static function initialize(): bool {
		$bluehost_blueprint_theme = Themes::get_bluehost_blueprint_theme();

		// If the theme is NOT installed OR activated...
		if ( ! ThemeInstaller::exists( $bluehost_blueprint_theme['slug'], $bluehost_blueprint_theme['activate'] ) ) {
			// If the theme is installed but not activated. Activate it.
			if ( ThemeInstaller::is_theme_installed( $bluehost_blueprint_theme['installer_data']['stylesheet'] ) ) {
				\switch_theme( $bluehost_blueprint_theme['installer_data']['stylesheet'] );
				return true;
			}

			// Install and activate the theme.
			$installer_response = ThemeInstaller::install_from_zip(
				$bluehost_blueprint_theme['installer_data']['url'],
				true,
				$bluehost_blueprint_theme['installer_data']['stylesheet']
			);

			// If the installation fails, retry.
			if ( is_wp_error( $installer_response ) ) {
				return self::retry();
			}
		}

		return true;
	}
}
