<?php

namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Tasks\ImageSideloadTask;

/**
 * Task Manager for Image Sideloading
 *
 * Manages a queue of ImageSideloadTask objects and processes them in FIFO order.
 */
class ImageSideloadTaskManager {

	/**
	 * Option name for storing the queue
	 *
	 * @var string
	 */
	const QUEUE_OPTION = 'nfd_module_onboarding_image_sideload_queue';

	/**
	 * Option name for storing the processing status
	 *
	 * @var string
	 */
	const STATUS_OPTION = 'nfd_module_onboarding_image_sideload_status';

	/**
	 * Add a task to the queue
	 *
	 * @param ImageSideloadTask $task The task to add
	 * @return bool True on success, false on failure
	 */
	public static function add_to_queue( ImageSideloadTask $task ) {
		$queue = self::get_queue();

		// Check if task already exists
		$task_id = $task->get_id();
		foreach ( $queue as $existing_task ) {
			if ( $existing_task['id'] === $task_id ) {
				return false; // Task already exists
			}
		}

		// Add task to queue (FIFO - add to end)
		$queue[] = array(
			'id'      => $task_id,
			'post_id' => $task->get_post_id(),
			'urls'    => $task->get_image_urls(),
			'status'  => 'pending',
			'created' => time(),
		);

		self::set_queue( $queue );
		return true;
	}

	/**
	 * Get the current queue
	 *
	 * @return array
	 */
	public static function get_queue() {
		$queue = get_option( self::QUEUE_OPTION, array() );
		if ( ! is_array( $queue ) ) {
			$queue = array();
		}
		return $queue;
	}

	/**
	 * Set the queue
	 *
	 * @param array $queue The queue to set
	 * @return void
	 */
	public static function set_queue( $queue ) {
		update_option( self::QUEUE_OPTION, $queue );
	}

	/**
	 * Get the processing status
	 *
	 * @return string
	 */
	public static function get_status() {
		return get_option( self::STATUS_OPTION, 'idle' );
	}

	/**
	 * Set the processing status
	 *
	 * @param string $status The status to set
	 * @return void
	 */
	public static function set_status( $status ) {
		update_option( self::STATUS_OPTION, $status );
	}

	/**
	 * Process the next task in the queue
	 *
	 * @return bool|\WP_Error True if task was processed, false if queue is empty, WP_Error on failure
	 */
	public static function process_next_task() {
		$queue = self::get_queue();

		if ( empty( $queue ) ) {
			self::set_status( 'idle' );
			return false;
		}

		// Get the next task
		$task_data = array_shift( $queue );

		// Mark as processing
		$task_data['status']  = 'processing';
		$task_data['started'] = time();

		// Create task object and execute
		$task   = new ImageSideloadTask( $task_data['post_id'], $task_data['urls'] );
		$result = $task->execute();

		if ( is_wp_error( $result ) ) {
			// Mark as failed
			$task_data['status']    = 'failed';
			$task_data['error']     = $result->get_error_message();
			$task_data['completed'] = time();

			// Add back to queue for retry
			$queue[] = $task_data;

			self::set_queue( $queue );
			self::set_status( 'processing' );

			return $result;
		}

		// Mark as completed
		$task_data['status']    = 'completed';
		$task_data['completed'] = time();

		self::set_queue( $queue );
		self::set_status( 'processing' );

		return true;
	}

	/**
	 * Process the entire queue
	 *
	 * @param int $max_tasks Maximum number of tasks to process in one run (default: 5)
	 * @return array Array with 'processed' and 'remaining' counts
	 */
	public static function process_queue( $max_tasks = 5 ) {
		$processed     = 0;
		$queue         = self::get_queue();
		$initial_count = count( $queue );

		self::set_status( 'processing' );

		while ( $processed < $max_tasks && ! empty( $queue ) ) {
			$result = self::process_next_task();

			if ( false === $result ) {
				break; // Queue is empty
			}

			if ( is_wp_error( $result ) ) {
				// Continue processing other tasks even if one fails
				$processed++;
				continue;
			}

			$processed++;
		}

		$remaining = count( self::get_queue() );

		if ( 0 === $remaining ) {
			self::set_status( 'idle' );
		}

		return array(
			'processed' => $processed,
			'remaining' => $remaining,
			'total'     => $initial_count,
		);
	}

	/**
	 * Clear the queue
	 *
	 * @return void
	 */
	public static function clear_queue() {
		self::set_queue( array() );
		self::set_status( 'idle' );
	}

	/**
	 * Get queue statistics
	 *
	 * @return array
	 */
	public static function get_stats() {
		$queue = self::get_queue();
		$stats = array(
			'total'      => count( $queue ),
			'pending'    => 0,
			'processing' => 0,
			'completed'  => 0,
			'failed'     => 0,
		);

		foreach ( $queue as $task ) {
			$status = $task['status'] ?? 'pending';
			if ( isset( $stats[ $status ] ) ) {
				$stats[ $status ]++;
			}
		}

		return $stats;
	}
}
