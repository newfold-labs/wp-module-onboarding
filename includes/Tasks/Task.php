<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

/**
 * Skeleton for any Task. All Tasks should inherit this abstract class.
 */
abstract class Task {

	/**
	 * Code a Task needs to run on execution.
	 *
	 * @return any
	 */
	abstract public function execute();

	/**
	 * Convert the Task object to an associative array.
	 *
	 * @return array
	 */
	abstract public function to_array();
}
