<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Data\Options;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginControlTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginControlTask;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteFeatures;

/**
 * Class for providing plugin related services.
 */
class PluginService {
	/**
	 * Queues the initial list of Plugin Installs and site features for a flow.
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
		$init_plugins = array_merge( Plugins::get_init(), SiteFeatures::get_site_features_init_list() );

		foreach ( $init_plugins as $init_plugin ) {
			// Ensure all plugins are installed in deactivated state
			$init_plugin['activate'] = false;

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
	 * Checks if a Plugin slug should be activated.
	 *
	 * @param array $value The Plugin slug that will be checked.
	 * @return boolean
	 */
	private static function should_be_activated( $value ) {
		return true === $value['activate'];
	}

	/**
	 * Activated/Deactivates the requested site features(plugins).
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function activate_onboarding_plugins() {
		// Get the init list plugins with activation true
		$plugins = array_filter( Plugins::get_init(), array( __CLASS__, 'should_be_activated' ) );
		// Convert the slugs into a map for a faster match.
		$plugin_slugs          = array_column( $plugins, 'slug' );
		$site_features_plugins = FlowService::read_data_from_wp_option( false );

		// If Site Features were selected add those plugins with activation
		if ( isset( $site_features_plugins['data']['siteFeatures'] ) && count( $site_features_plugins['data']['siteFeatures'] ) > 0 ) {
			$site_features_plugins = $site_features_plugins['data']['siteFeatures'];
			foreach ( $site_features_plugins as $plugin => $decision ) {
				if ( true === $decision ) {
					if ( ! in_array( $plugin, $plugin_slugs ) ) {
						$plugin_slugs[] = $plugin;
					}
				}
			}
		}
		// Requeue the plugins that should be activated and are not installed yet.
		$plugin_slugs = PluginInstallTaskManager::requeue_with_changed_activation( $plugin_slugs );

		// TO-Do Ensure things work as expected for earlier installs and new ones
		foreach ( $plugin_slugs as $plugin ) {
			PluginControlTaskManager::add_to_queue(
				new PluginControlTask(
					$plugin,
					true
				)
			);
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}
}
