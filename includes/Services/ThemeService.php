<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Installer\Data\Themes as ThemeInstallerData;
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
		// Get the default sitegen theme to be installed.
		$init_themes   = Themes::get_init( true );
		$sitegen_theme = $init_themes['sitegen']['default'][0];

		// If the sitegen theme is NOT installed or activated...
		if ( ! ThemeInstaller::exists( $sitegen_theme['slug'], $sitegen_theme['activate'] ) ) {
			// Get the sitegen theme installer data.
			$themes_installer_data        = ThemeInstallerData::get()['nfd_slugs'];
			$sitegen_theme_installer_data = $themes_installer_data[ $sitegen_theme['slug'] ];

			// If the sitegen theme is installed but not activated.
			if ( ThemeInstaller::is_theme_installed( $sitegen_theme_installer_data['stylesheet'] ) ) {
				// Activate the sitegen theme.
				\switch_theme( $sitegen_theme_installer_data['stylesheet'] );
				return true;
			}

			// Install and activate the sitegen theme.
			$installer_response = ThemeInstaller::install_from_zip(
				$sitegen_theme_installer_data['url'],
				true,
				$sitegen_theme_installer_data['stylesheet']
			);

			// If the installation fails, retry.
			if ( is_wp_error( $installer_response ) ) {
				return self::retry();
			}
		}

		return true;
	}
}
