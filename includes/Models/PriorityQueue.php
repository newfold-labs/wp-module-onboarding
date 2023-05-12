<?php
namespace NewfoldLabs\WP\Module\Onboarding\Models;

/**
 * Max heap implementation of a Priority Queue.
 */
class PriorityQueue extends \SplPriorityQueue {

	/**
	 * Defines the logic to use when comparing two priorities.
	 *
	 * @param mixed $priority1
	 * @param mixed $priority2   
	 * @return int
	 */
	public function compare( $priority1, $priority2 ) {
		if ( $priority1 === $priority2 ) {
			   return 0;
		}
		 return $priority1 < $priority2 ? -1 : 1;
	}

	/**
	 * Converts the max heap to an array.
	 *
	 * @return array
	 */
	public function to_array() {
		 $array = array();
		while ( $this->valid() ) {
			 array_push( $array, $this->extract() );
		}
		 return $array;
	}
}
