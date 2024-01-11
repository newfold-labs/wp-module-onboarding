<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;

/**
 * Tracks the Status of Onboarding.
 */
class StatusService {

	/**
	 * Handle Onboarding started event.
	 *
	 * @return void
	 */
	public static function handle_started() {
		if ( 'started' !== get_option( Options::get_option_name( 'status' ) ) ) {
			update_option( Options::get_option_name( 'status' ), 'started' );
			do_action( 'newfold/onboarding/started' );
		}
	}

	/**
	 * Handles Onboarding completed event.
	 *
	 * @return void
	 */
	public static function handle_completed() {
		if ( 'started' === get_option( Options::get_option_name( 'status' ) ) ) {
			update_option( Options::get_option_name( 'status' ), 'completed' );
			do_action( 'newfold/onboarding/completed' );
		}
	}

	/**
	 * Begin tracking the Onboarding status in an option.
	 *
	 * @return void
	 */
	public static function track() {
		global $pagenow;

		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		switch ( $pagenow ) {
			case 'index.php':
				// If the page is not nfd-onboarding.
				//phpcs:ignore
				if ( ! isset( $_GET['page'] ) || WP_Admin::$slug !== \sanitize_text_field( $_GET['page'] ) ) {
					self::handle_completed();
				}
				break;
			default:
				self::handle_completed();
		}
	}
}
