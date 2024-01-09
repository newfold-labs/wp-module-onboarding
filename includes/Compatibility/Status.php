<?php
namespace NewfoldLabs\WP\Module\Onboarding\Compatibility;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Class Status
 */
class Status {

	/**
	 * Default Scan Status
	 *
	 * @var string
	 */
	public static $default = 'unscanned';

	/**
	 * Get Scan Status
	 *
	 * @param null|string $type Set to 'all' to return the data array
	 */
	public static function get( $type = null ) {
		$data = \get_option( Options::get_option_name( 'compatibility_results' ), self::$default );
		if ( 'all' === $type ) {
			return $data;
		}
		if ( is_array( $data ) && ! empty( $data['status'] ) ) {
			return $data['status'];
		}

		return self::$default;
	}

	/**
	 * Set Scan Status
	 *
	 * @param object $status - Scan object to set
	 */
	public static function set( $status ) {
		$data = array();
		if ( ! empty( $status ) && is_string( $status ) ) {
			$data['status']    = $status;
			$data['timestamp'] = current_time( 'mysql' );

			return \update_option( Options::get_option_name( 'compatibility_results' ), $data );
		} elseif ( ! empty( $status && is_object( $status ) ) ) {
			$data['status']    = $status->result;
			$data['timestamp'] = \current_time( 'mysql' );
		}

		\update_option( Options::get_option_name( 'compatibility_results' ), $data );

		return false;
	}

	/**
	 * Reset/Delete the stored scan results
	 */
	public static function reset() {
		\delete_option( Options::get_option_name( 'compatibility_results' ) );
	}
}
