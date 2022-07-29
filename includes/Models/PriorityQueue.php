<?php
namespace NewfoldLabs\WP\Module\Onboarding\Models;

class PriorityQueue extends \SplPriorityQueue {
     public function compare( $priority1, $priority2 ) {
          if ( $priority1 === $priority2 ) return 0;
          return $priority1 < $priority2 ? -1 : 1;
     }

     public function to_array() {
          $array = array();
          while( $this->valid() ) {
               array_push( $array, $this->extract() );
          }
          return $array;
     }
}
