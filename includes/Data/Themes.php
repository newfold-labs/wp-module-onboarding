<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Installer\Data\Themes as ThemeInstallerData;

class Themes {
	public static function get_data() {
		return array(
			'bluehostBlueprint' => array(
				'slug'     => 'nfd_slug_bluehost_blueprint',
				'activate' => true,
				'priority' => 20,
			),
		);
	}

	/**
	 * Get the bluehost blueprint theme data.
	 *
	 * @param bool $with_installer_data Whether to include the installer data from the Installer Module.
	 * @return array The bluehost blueprint theme data.
	 */
	public static function get_bluehost_blueprint_theme($with_installer_data = true) {
		$theme = self::get_data()['bluehostBlueprint'];

		if ($with_installer_data) {
			$theme['installer_data'] = ThemeInstallerData::get()[$theme['slug']];
		}

		return $theme;
	}

	/**
	 * Get the active theme on the site.
	 *
	 * @return string
	 */
	public static function get_active_theme() {
		return ( \wp_get_theme() )->get( 'TextDomain' );
	}
}
