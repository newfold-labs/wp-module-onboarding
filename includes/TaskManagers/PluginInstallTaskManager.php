<?php
namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Models\PriorityQueue;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Manages the execution of PluginInstallTasks.
 */
class PluginInstallTaskManager {

	 /**
	  * The number of times a PluginInstallTask can be retried.
	  *
	  * @var int
	  */
	private static $retry_limit = 1;

	private static $queue_name = 'plugin_install_queue';

	function __construct() {
		// Ensure there is a thirty second option in the cron schedules
		add_filter( 'cron_schedules', array( $this, 'add_thirty_seconds_schedule' ) );

		// Thirty second cron hook
		add_action( 'nfd_module_onboarding_plugin_install_cron', array( $this, 'install' ) );

		// Register the cron task
		if ( ! wp_next_scheduled( 'nfd_module_onboarding_plugin_install_cron' ) ) {
			wp_schedule_event( time(), 'thirty_seconds', 'nfd_module_onboarding_plugin_install_cron' );
		}
	}

	public static function get_queue_name() {
		 return self::$queue_name;
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
					self::add_to_queue(
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
	 * Queue out a PluginInstallTask with the highest priority in the plugin install queue and execute it.
	 *
	 * @return array|false
	 */
	public function install() {
		/*
		   Get the plugins queued up to be installed, the PluginInstall task gets
		  converted to an associative array before storing it in the option. */
		$plugins = \get_option( Options::get_option_name( self::$queue_name ), array() );

		/*
		   Conversion of the max heap to an array will always place the PluginInstallTask with the highest
		  priority at the beginning of the array */
		$plugin_to_install = array_shift( $plugins );

		// Recreate the PluginInstall task from the associative array.
		$plugin_install_task = new PluginInstallTask(
			$plugin_to_install['slug'],
			$plugin_to_install['activate'],
			$plugin_to_install['priority'],
			$plugin_to_install['retries']
		);

		// Update status to the current slug being installed.
		\update_option( Options::get_option_name( 'plugins_init_status' ), $plugin_install_task->get_slug() );

		// Execute the PluginInstall Task.
		$status = $plugin_install_task->execute();
		if ( \is_wp_error( $status ) ) {

			   // If there is an error, then increase the retry count for the task.
			   $plugin_install_task->increment_retries();

			   /*
				If the number of retries have not exceeded the limit
				then re-queue the task at the end of the queue to be retried. */
			if ( $plugin_install_task->get_retries() <= self::$retry_limit ) {
					array_push( $plugins, $plugin_install_task->to_array() );
			}
		}

		// If there are no more plugins to be installed then change the status to completed.
		if ( empty( $plugins ) ) {
			\update_option( Options::get_option_name( 'plugins_init_status' ), 'completed' );
		}

		// Update the plugin install queue.
		 return \update_option( Options::get_option_name( self::$queue_name ), $plugins );
	}

	/**
	 * @param PluginInstallTask $plugin_install_task
	 *
	 * Adds a new PluginInstallTask to the Plugin Install queue.
	 * The Task will be inserted at an appropriate position in the queue based on it's priority.
	 *
	 * @return array|false
	 */
	public static function add_to_queue( PluginInstallTask $plugin_install_task ) {
		/*
		   Get the plugins queued up to be installed, the PluginInstall task gets
		   converted to an associative array before storing it in the option. */
		$plugins = \get_option( Options::get_option_name( self::$queue_name ), array() );

		$queue = new PriorityQueue();
		foreach ( $plugins as $queued_plugin ) {

			/*
			   Check if there is an already existing PluginInstallTask in the queue
			   for a given slug and activation criteria. */
			if ( $queued_plugin['slug'] === $plugin_install_task->get_slug()
				  && $queued_plugin['activate'] === $plugin_install_task->get_activate() ) {
				 return false;
			}
			 $queue->insert( $queued_plugin, $queued_plugin['priority'] );
		}

		// Insert a new PluginInstallTask at the appropriate position in the queue.
		$queue->insert(
			$plugin_install_task->to_array(),
			$plugin_install_task->get_priority()
		);

		 return \update_option( Options::get_option_name( self::$queue_name ), $queue->to_array() );
	}
}
