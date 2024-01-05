<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;

/**
 * Tracks the Status of Onboarding.
 */
class StatusService {

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
				// If the page is nfd-onboarding
				if ( isset( $_GET['page'] ) && WP_Admin::$slug === \sanitize_text_field( $_GET['page'] ) ) {
					if ( 'started' !== get_option( Options::get_option_name( 'status' ) ) ) {
						update_option( Options::get_option_name( 'status' ), 'started' );
							do_action( 'newfold/onboarding/started' );
					}
				}
				break;
			default:
				if ( 'started' === get_option( Options::get_option_name( 'status' ) ) ) {
					update_option( Options::get_option_name( 'status' ), 'completed' );
						do_action( 'newfold/onboarding/completed' );
				}
				break;
		}
	}
}
