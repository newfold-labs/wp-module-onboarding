<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Data\Themes as ThemeInstallerData;
use NewfoldLabs\WP\Module\Installer\Services\ThemeInstaller;

/**
 * Class for providing theme related services.
 */
class ThemeService {
	/**
	 * The Bluehost blueprint theme slug used by the installer module.
	 *
	 * @var string
	 */
	private const BLUEPRINT_THEME_SLUG = 'nfd_slug_bluehost_blueprint';

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
		$installer_data = ThemeInstallerData::get()['nfd_slugs'][ self::BLUEPRINT_THEME_SLUG ] ?? null;
		if ( ! $installer_data ) {
			return false;
		}

		// If the theme is NOT installed OR activated...
		if ( ! ThemeInstaller::exists( self::BLUEPRINT_THEME_SLUG, true ) ) {
			// If the theme is installed but not activated. Activate it.
			if ( ThemeInstaller::is_theme_installed( $installer_data['stylesheet'] ) ) {
				\switch_theme( $installer_data['stylesheet'] );
				return true;
			}

			// Install and activate the theme.
			$installer_response = ThemeInstaller::install_from_zip(
				$installer_data['url'],
				true,
				$installer_data['stylesheet']
			);

			// If the installation fails, retry.
			if ( is_wp_error( $installer_response ) ) {
				return self::retry();
			}
		}

		return true;
	}
}
