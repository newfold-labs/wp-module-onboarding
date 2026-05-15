<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;

/**
 * Tracks the Status of Onboarding.
 */
class StatusService {

	/**
	 * Handle Onboarding started event.
	 *
	 * @return bool True if the onboarding started was marked, false if it was already marked.
	 */
	public static function handle_started(): bool {
		$status = get_option( Options::get_option_name( 'status' ) );
		if ( 'started' !== $status && 'completed' !== $status ) {
			update_option( Options::get_option_name( 'status' ), 'started' );

			// Store start time when onboarding begins
			update_option( Options::get_option_name( 'start_time' ), time() );

			do_action( 'newfold/onboarding/started' );
			return true;
		}
		return false;
	}

	/**
	 * Handles Onboarding abandoned event.
	 *
	 * @return void
	 */
	public static function handle_abandoned(): void {
		if ( 'started' === get_option( Options::get_option_name( 'status' ) ) ) {
			update_option( Options::get_option_name( 'status' ), 'abandoned' );

			// Clean up time tracking when onboarding is abandoned
			delete_option( Options::get_option_name( 'start_time' ) );
			delete_option( Options::get_option_name( 'completed_time' ) );
		}
	}

	/**
	 * Handles Onboarding completed event.
	 *
	 * @return void
	 */
	public static function handle_completed(): void {
		if ( 'started' === get_option( Options::get_option_name( 'status' ) ) ) {
			update_option( Options::get_option_name( 'status' ), 'completed' );

			// Save onboarding site information to database option.
			self::save_site_info();

			// Store completion time
			update_option( Options::get_option_name( 'completed_time' ), time() );

			/**
			 * We're disabling the restart onboarding feature for now.
			 */
			// self::update_onboarding_restart_status();
			do_action( 'newfold/onboarding/completed' );
		}
	}

	/**
	 * Begin tracking the Onboarding status in an option.
	 *
	 * @return void
	 */
	public static function track(): void {
		// Ignore if the request is an AJAX request.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		// Ignore if the request is not for the onboarding page.
		if ( isset( $_GET['page'] ) && \sanitize_text_field( $_GET['page'] ) === WP_Admin::$slug ) {
			return;
		}

		// Handle abandoned event.
		self::handle_abandoned();
	}

	/**
	 * Save onboarding site information to database option for other modules to access.
	 *
	 * @return void
	 */
	public static function save_site_info(): void {
		$site_info                     = array();
		$site_info['experience_level'] = $data['experienceLevel'] ?? 'advanced';
		$site_info['site_type']        = $data['siteType'] ?? 'business';

		// Save to database option
		update_option( Options::get_option_name( 'site_info' ), $site_info );
	}
}
