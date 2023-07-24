<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Data\Options;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginUninstallTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginUninstallTask;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Class for providing plugin related services.
 */
class PluginService {
	/**
	 * Queues the initial list of Plugin Installs for a flow.
	 *
	 * @return boolean
	 */
	public static function queue_initial_installs() {

		// Checks if the init_list of plugins have already been queued.
		if ( \get_option( Options::get_option_name( 'plugins_init_status' ), 'init' ) !== 'init' ) {
			return true;
		}

		// Set option to installing to prevent re-queueing the init_list again on page load.
		\update_option( Options::get_option_name( 'plugins_init_status' ), 'installing' );

		// Get the initial list of plugins to be installed based on the plan.
		$init_plugins = Plugins::get_init();

		foreach ( $init_plugins as $init_plugin ) {
			// Checks if a plugin with the given slug and activation criteria already exists.
			if ( ! PluginInstaller::exists( $init_plugin['slug'], $init_plugin['activate'] ) ) {
					// Add a new PluginInstallTask to the Plugin install queue.
					PluginInstallTaskManager::add_to_queue(
						new PluginInstallTask(
							$init_plugin['slug'],
							$init_plugin['activate'],
							$init_plugin['priority']
						)
					);
			}
		}

		return true;
	}

	/**
	 * Installs/Uninstalls the requested site features(plugins).
	 *
	 * @param \WP_REST_Request $request the incoming request object.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	/**
	 * Installs/Uninstalls the requested site features (plugins).
	 *
	 * @param array $plugins The list of plugin slugs.
	 * @return \WP_REST_Response
	 */
	public static function set_site_features( $plugins ) {

		foreach ( $plugins as $plugin => $decision ) {
			if ( $decision ) {
				// If the Plugin exists and is activated
				if ( PluginInstaller::exists( $plugin, $decision ) ) {
					continue;
				}

				PluginInstallTaskManager::add_to_queue(
					new PluginInstallTask(
						$plugin,
						true
					)
				);
			} else {
				PluginUninstallTaskManager::add_to_queue(
					new PluginUninstallTask(
						$plugin
					)
				);
			}
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}
}
