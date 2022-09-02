<?php
namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Tasks\ThemeInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Models\PriorityQueue;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Manages the execution of ThemeInstallTasks.
 */
class ThemeInstallTaskManager {

	 /**
	  * The number of times a ThemeInstallTask can be retried.
	  *
	  * @var int
	  */
	private static $retry_limit = 1;

	private static $queue_name = 'theme_install_queue';

	function __construct() {
		// Ensure there is a ten second option in the cron schedules
		add_filter( 'cron_schedules', array( $this, 'add_ten_seconds_schedule' ) );

		// Ten second cron hook
		add_action( 'nfd_module_onboarding_theme_install_cron', array( $this, 'install' ) );

		// Register the cron task
		if ( ! wp_next_scheduled( 'nfd_module_onboarding_theme_install_cron' ) ) {
			wp_schedule_event( time(), 'ten_seconds', 'nfd_module_onboarding_theme_install_cron' );
		}
	}

	public static function get_queue_name() {
		 return self::$queue_name;
	}

	public function add_ten_seconds_schedule( $schedules ) {
		if ( ! array_key_exists( 'ten_seconds', $schedules ) || 10 !== $schedules['ten_seconds']['interval'] ) {
			$schedules['ten_seconds'] = array(
				'interval' => 10,
				'display'  => __( 'Once Every Ten Seconds' ),
			);
		}

		 return $schedules;
	}

	public static function queue_initial_installs() {
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
				self::add_to_queue(
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

	/**
	 * Queue out a ThemeInstallTask with the highest priority in the theme install queue and execute it.
	 *
	 * @return array|false
	 */
	public function install() {
		/*
		   Get the theme install tasks queued up to be installed, the ThemeInstallTask gets
		  converted to an associative array before storing it in the option. */
		$themes = \get_option( Options::get_option_name( self::$queue_name ), array() );

		/*
		   Conversion of the max heap to an array will always place the ThemeInstallTask with the highest
		  priority at the beginning of the array */
		$theme_to_install = array_shift( $themes );

		// Recreate the ThemeInstallTask from the associative array.
		$theme_install_task = new ThemeInstallTask(
			$theme_to_install['slug'],
			$theme_to_install['activate'],
			$theme_to_install['priority'],
			$theme_to_install['retries']
		);

		// Update status to the current slug being installed.
		\update_option( Options::get_option_name( 'theme_init_status' ), $theme_install_task->get_slug() );

		// Execute the ThemeInstallTask.
		$status = $theme_install_task->execute();
		if ( \is_wp_error( $status ) ) {

			   // If there is an error, then increase the retry count for the task.
			   $theme_install_task->increment_retries();

			   /*
				If the number of retries have not exceeded the limit
				then re-queue the task at the end of the queue to be retried. */
			if ( $theme_install_task->get_retries() <= self::$retry_limit ) {
					array_push( $themes, $theme_install_task->to_array() );
			}
		}

		// If there are no more themes to be installed then change the status to completed.
		if ( empty( $themes ) ) {
			\update_option( Options::get_option_name( 'theme_init_status' ), 'completed' );
		}

		// Update the theme install queue.
		 return \update_option( Options::get_option_name( self::$queue_name ), $themes );
	}

	/**
	 * @param ThemeInstallTask $theme_install_task
	 *
	 * Adds a new ThemeInstallTask to the Theme Install queue.
	 * The Task will be inserted at an appropriate position in the queue based on it's priority.
	 *
	 * @return array|false
	 */
	public static function add_to_queue( ThemeInstallTask $theme_install_task ) {
		/*
		   Get the ThemeInstallTasks queued up to be installed, the ThemeInstallTask gets
		   converted to an associative array before storing it in the option. */
		$themes = \get_option( Options::get_option_name( self::$queue_name ), array() );

		$queue = new PriorityQueue();
		foreach ( $themes as $queued_theme ) {

			/*
			   Check if there is an already existing ThemeInstallTask in the queue
			   for a given slug and activation criteria. */
			if ( $queued_theme['slug'] === $theme_install_task->get_slug()
				  && $queued_theme['activate'] === $theme_install_task->get_activate() ) {
				 return false;
			}
			 $queue->insert( $queued_theme, $queued_theme['priority'] );
		}

		// Insert a new ThemeInstallTask at the appropriate position in the queue.
		$queue->insert(
			$theme_install_task->to_array(),
			$theme_install_task->get_priority()
		);

		 return \update_option( Options::get_option_name( self::$queue_name ), $queue->to_array() );
	}
}
