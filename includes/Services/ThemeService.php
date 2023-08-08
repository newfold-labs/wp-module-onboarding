<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\ThemeInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\ThemeInstallTask;
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
