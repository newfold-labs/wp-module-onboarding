<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginActivationTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginDeactivationTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginDeactivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Class for providing plugin related services.
 */
class PluginService {
	/**
	 * Queues the initial list of Plugin Installs.
	 *
	 * @return boolean
	 */
	public static function initialize() {

		$init_plugins = Plugins::get_init();

		foreach ( $init_plugins as $init_plugin ) {
			$init_plugin_type = PluginInstaller::get_plugin_type( $init_plugin['slug'] );
			$init_plugin_path = PluginInstaller::get_plugin_path( $init_plugin['slug'], $init_plugin_type );
			if ( ! $init_plugin_path ) {
				continue;
			}
			// Checks if a plugin with the given slug and activation criteria already exists.
			if ( ! PluginInstaller::is_plugin_installed( $init_plugin_path ) ) {
					// Add a new PluginInstallTask to the Plugin install queue.
					PluginInstallTaskManager::add_to_queue(
						new PluginInstallTask(
							$init_plugin['slug'],
							$init_plugin['activate'],
							isset( $init_plugin['priority'] ) ? $init_plugin['priority'] : 0
						)
					);
					continue;
			}

			if ( ! $init_plugin['activate'] && PluginInstaller::is_active( $init_plugin_path ) ) {
				PluginDeactivationTaskManager::add_to_queue(
					new PluginDeactivationTask(
						$init_plugin['slug']
					)
				);
			}

			if ( $init_plugin['activate'] && ! PluginInstaller::is_active( $init_plugin_path ) ) {
				PluginActivationTaskManager::add_to_queue(
					new PluginActivationTask(
						$init_plugin['slug']
					)
				);
			}
		}

		return true;
	}
}
