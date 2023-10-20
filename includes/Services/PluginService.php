<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\WP_ADMIN;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use function NewfoldLabs\WP\ModuleLoader\container;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginActivationTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginDeactivationTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginDeactivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteFeatures;

/**
 * Class for providing plugin related services.
 */
class PluginService {
	/**
	 * Queues the initial list of Plugin Installs for a flow.
	 *
	 * @return boolean
	 */
	public static function initialize() {

		// Get the initial list of plugins to be installed based on the plan.
		$init_plugins = array_merge( Plugins::get_init(), SiteFeatures::get_init() );

		foreach ( $init_plugins as $init_plugin ) {
			$init_plugin_type = PluginInstaller::get_plugin_type( $init_plugin['slug'] );
			$init_plugin_path = PluginInstaller::get_plugin_path( $init_plugin['slug'], $init_plugin_type );
			// Checks if a plugin with the given slug and activation criteria already exists.
			if ( ! PluginInstaller::is_plugin_installed( $init_plugin_path ) ) {
					// Add a new PluginInstallTask to the Plugin install queue.
					PluginInstallTaskManager::add_to_queue(
						new PluginInstallTask(
							$init_plugin['slug'],
							true,
							$init_plugin['priority']
						)
					);
					continue;
			}

			if ( PluginInstaller::is_active( $init_plugin_path ) ) {
				PluginDeactivationTaskManager::add_to_queue(
					new PluginDeactivationTask(
						$init_plugin['slug']
					)
				);
			}
		}

		return true;
	}

	/**
	 * Activates the initial list of plugins, filtering out non-selected site features.
	 *
	 * @return boolean
	 */
	public static function activate_init_plugins() {
		$init_plugins             = Plugins::get_init();
		$filtered_init_plugins    = SiteFeatures::filter( $init_plugins, true );
		$site_features_selected   = SiteFeatures::get_selected();
		$site_features_unselected = SiteFeatures::get_unselected();
		$final_init_plugins       = array_merge( $filtered_init_plugins, $site_features_selected );

		foreach ( $final_init_plugins as $init_plugin ) {
			$init_plugin_type = PluginInstaller::get_plugin_type( $init_plugin['slug'] );
			$init_plugin_path = PluginInstaller::get_plugin_path( $init_plugin['slug'], $init_plugin_type );
			// Checks if a plugin with the given slug and activation criteria already exists.
			if ( PluginInstaller::is_plugin_installed( $init_plugin_path ) ) {
					// Add a new PluginInstallTask to the Plugin install queue.
					PluginActivationTaskManager::add_to_queue(
						new PluginActivationTask(
							$init_plugin['slug']
						)
					);
					continue;
			}

			PluginInstallTaskManager::add_to_queue(
				new PluginInstallTask(
					$init_plugin['slug'],
					true,
					isset( $init_plugin['priority'] ) ? $init_plugin['priority'] : 0
				)
			);
		}

		foreach ( $site_features_unselected as $init_plugin ) {
			$init_plugin_type = PluginInstaller::get_plugin_type( $init_plugin['slug'] );
			$init_plugin_path = PluginInstaller::get_plugin_path( $init_plugin['slug'], $init_plugin_type );
			// Checks if a plugin with the given slug and activation criteria already exists.
			if ( PluginInstaller::is_plugin_installed( $init_plugin_path ) ) {
					// Add a new PluginDeactivationTask to the Plugin Deactivation queue.
					PluginDeactivationTaskManager::add_to_queue(
						new PluginDeactivationTask(
							$init_plugin['slug']
						)
					);
					continue;
			}

			PluginInstallTaskManager::add_to_queue(
				new PluginInstallTask(
					$init_plugin['slug'],
					false,
					isset( $init_plugin['priority'] ) ? $init_plugin['priority'] : 0
				)
			);
		}

		return true;
	}

	/**
	 * Sets up a Transient to activate plugins and filter_active_plugins
	 *
	 * @return boolean
	 */
	public static function configure_activation_transient() {
		global $pagenow;

		switch ( $pagenow ) {
			case 'index.php':
				// If the page is nfd-onboarding
				if ( isset( $_GET['page'] ) && WP_ADMIN::$slug === \sanitize_text_field( $_GET['page'] ) ) {
					if ( '1' !== get_transient( Options::get_option_name( 'filter_active_plugins' ) ) ) {
						set_transient( Options::get_option_name( 'filter_active_plugins' ), '1', 20 * MINUTE_IN_SECONDS );
					}
				}
				break;
			default:
				if ( '1' === get_transient( Options::get_option_name( 'filter_active_plugins' ) ) ) {
					delete_transient( Options::get_option_name( 'filter_active_plugins' ) );
					self::activate_init_plugins();
				}
				break;
		}

		// Add hook to activate plugins after transient is deleted
		add_filter(
			'option_active_plugins',
			function( $plugins ) {
				if ( '1' === get_transient( Options::get_option_name( 'filter_active_plugins' ) ) ) {
					return array( container()->plugin()->basename );
				}
				return $plugins;
			}
		);

	}
}
