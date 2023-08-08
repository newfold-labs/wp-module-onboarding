<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\ThemeInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\ThemeInstallTask;
use NewfoldLabs\WP\Module\Installer\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Class for providing theme related services.
 */
class ThemeService {
	/**
	 * Retrieve status of init_list of plugins being queued.
	 *
	 * @return boolean
	 */
	public static function initialize() {

		// Checks if the init_list of themes have already been queued.
		if ( \get_option( Options::get_option_name( 'theme_init_status' ), 'init' ) !== 'init' ) {
			return true;
		}

		// Set option to installing to prevent re-queueing the init_list again on page load.
		\update_option( Options::get_option_name( 'theme_init_status' ), 'installing' );

		// Get the initial list of themes to be installed based on the plan.
		$init_themes = Themes::get_init();
		foreach ( $init_themes as $init_theme ) {
			// Checks if a theme with the given slug and activation criteria already exists.
			if ( ! ThemeInstaller::exists( $init_theme['slug'], $init_theme['activate'] ) ) {
				// Add a new ThemeInstallTask to the theme install queue.
				ThemeInstallTaskManager::add_to_queue(
					new ThemeInstallTask(
						$init_theme['slug'],
						$init_theme['activate'],
						$init_theme['priority']
					)
				);
			}
		}

		return true;
	}
}
