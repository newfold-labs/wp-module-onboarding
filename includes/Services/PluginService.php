<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginActivationTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginDeactivationTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginDeactivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Installer\Data\Options as InstallerOptions;
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

	/**
	 * Ensures critical plugins (Jetpack, Icon Block) are installed and active.
	 *
	 * Performs a synchronous install/activate for each critical plugin. Long-running:
	 * may take 10-30 seconds per plugin if a download is required.
	 *
	 * Returns null when all critical plugins are ready.
	 * Returns a 202 response with the list of plugins still pending when any failed
	 * to become active (e.g. download error, activation error), so the caller can retry.
	 *
	 * @return \WP_REST_Response|null
	 */
	public static function ensure_critical_plugins_active(): ?\WP_REST_Response {
		$critical = array( 'jetpack', 'icon-block' );
		$pending  = array();

		// Raise the time limit so wp.org downloads don't trip the default PHP timeout.
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 180 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}

		// Read the slug the background cron is currently processing (if any) so we can
		// skip our sync attempt and let cron finish — avoids "Could not copy file" races.
		$cron_current = get_option( InstallerOptions::get_option_name( 'plugins_init_status' ) );

		foreach ( $critical as $slug ) {
			try {
				$plugin_type = PluginInstaller::get_plugin_type( $slug );
				$plugin_path = PluginInstaller::get_plugin_path( $slug, $plugin_type );

				if ( ! $plugin_path ) {
					continue;
				}

				// Cron is installing this exact slug right now → don't race it.
				if ( $cron_current === $slug ) {
					$pending[] = $slug;
					continue;
				}

				if ( ! PluginInstaller::is_plugin_installed( $plugin_path ) ) {
					$result = PluginInstaller::install( $slug, true );
				} elseif ( PluginInstaller::is_active( $plugin_path ) ) {
					continue;
				} else {
					$result = PluginInstaller::activate( $slug );
				}

				if ( is_wp_error( $result ) ) {
					error_log( '[NFD Onboarding] ensure_critical_plugins_active(' . $slug . ') WP_Error: ' . $result->get_error_message() );
				} elseif ( false === $result ) {
					error_log( '[NFD Onboarding] ensure_critical_plugins_active(' . $slug . ') activation returned false' );
				}

				// Final readiness check.
				if ( ! PluginInstaller::is_active( $plugin_path ) ) {
					$pending[] = $slug;
				}
			} catch ( \Throwable $e ) {
				$pending[] = $slug;
				error_log( '[NFD Onboarding] ensure_critical_plugins_active(' . $slug . ') exception: ' . $e->getMessage() );
			}
		}

		// Enable Jetpack modules only once Jetpack is actually loaded.
		if ( class_exists( 'Jetpack' ) ) {
			\NewfoldLabs\WP\Module\Installer\Data\Plugins::toggle_jetpack_module( 'contact-form', true );
			\NewfoldLabs\WP\Module\Installer\Data\Plugins::toggle_jetpack_module( 'blocks', true );
		}

		if ( ! empty( $pending ) ) {
			foreach ( $pending as $slug ) {
				PluginInstallTaskManager::add_to_queue( new PluginInstallTask( $slug, true, 999 ) );
			}

			return new \WP_REST_Response(
				array(
					'status'  => 'installing',
					'pending' => $pending,
				),
				202
			);
		}

		return null;
	}
}
