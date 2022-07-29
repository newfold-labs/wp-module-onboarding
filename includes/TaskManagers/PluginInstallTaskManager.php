<?php
namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Models\PriorityQueue;

class PluginInstallTaskManager {

	 private $retry_limit = 1;

	function __construct() {
		 // Ensure there is a minutely option in the cron schedules
		add_filter( 'cron_schedules', array( $this, 'add_thirty_seconds_schedule' ) );

		// Minutely cron hook
		add_action( 'nfd_module_onboarding_plugin_install_cron', array( $this, 'install' ) );

		// Register the cron task
		if ( ! wp_next_scheduled( 'nfd_module_onboarding_plugin_install_cron' ) ) {
			wp_schedule_event( time(), 'thirty_seconds', 'nfd_module_onboarding_plugin_install_cron' );
		}
	}

	public function add_thirty_seconds_schedule( $schedules ) {
		if ( ! array_key_exists( 'thirty_seconds', $schedules ) || 30 !== $schedules['thirty_seconds']['interval'] ) {
			$schedules['thirty_seconds'] = array(
				'interval' => 30,
				'display'  => __( 'Once Every Thirty Seconds' ),
			);
		}

		 return $schedules;
	}

	public function install() {
		$plugins             = \get_option( Options::get_option_name( 'plugin_install_queue' ), array() );
		$plugin_to_install   = array_shift( $plugins );
		$plugin_install_task = new PluginInstallTask(
			$plugin_to_install['slug'],
			$plugin_to_install['activate'],
			$plugin_to_install['priority'],
			$plugin_to_install['retries'],
		);
		\update_option( Options::get_option_name( 'plugins_init_status' ), $plugin_install_task->get_slug() );
		$status = $plugin_install_task->execute();
		if ( \is_wp_error( $status ) ) {
			   $plugin_install_task->increment_retries();
			if ( $plugin_install_task->get_retries() <= $this->retry_limit ) {
					array_push( $plugins, $plugin_to_install->to_array() );
			}
		}
		if ( empty( $plugins ) ) {
			\update_option( Options::get_option_name( 'plugins_init_status' ), 'completed' );
		}
		 return \update_option( Options::get_option_name( 'plugin_install_queue' ), $plugins );
	}

	public static function add_to_queue( PluginInstallTask $plugin_install_task ) {
		$plugins = \get_option( Options::get_option_name( 'plugin_install_queue' ), array() );

		$queue = new PriorityQueue();
		foreach ( $plugins as $queued_plugin ) {
			if ( $queued_plugin['slug'] === $plugin_install_task->get_slug()
				  && $queued_plugin['activate'] === $plugin_install_task->get_activate() ) {
				 return;
			}
			 $queue->insert( $queued_plugin, $queued_plugin['priority'] );
		}

		$queue->insert(
			$plugin_install_task->to_array(),
			$plugin_install_task->get_priority()
		);

		 return \update_option( Options::get_option_name( 'plugin_install_queue' ), $queue->to_array() );
	}
}
