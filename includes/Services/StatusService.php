<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Brands;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;
use NewfoldLabs\WP\Module\Onboarding\Data\Config;

use function NewfoldLabs\WP\ModuleLoader\container;

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
	 * Checks if the WordPress site was created within the last 9 months (275 days)
	 * using the 'bluehost_plugin_install_date' option.
	 *
	 * @return bool True if the site was created within the last 275 days, false otherwise.
	 */
	private static function is_site_created_within_last_9_months() {
		$install_date_timestamp = get_option( Options::get_option_name( 'bluehost_plugin_install_date', false ) );

		// If the option is not set or is invalid, return false
		if ( ! $install_date_timestamp ) {
			return false;
		}

		// Calculate the timestamp for 275 days ago (9 months)
		$nine_months_ago = time() - ( 275 * 24 * 60 * 60 );

		return $install_date_timestamp >= $nine_months_ago;
	}

	/**
	 * Determines if a user is eligible for Restarting Onboarding again.
	 * Toggles a wp_option to reflect the user's eligibility status.
	 *
	 * @return void
	 */
	public static function determine_onboarding_restart_eligibility() {

		// Check if the brand is eligible for Restarting Onboarding
		$brand_config = Brands::get_brands()[ NFD_ONBOARDING_PLUGIN_BRAND ]['config'] ?? array();
		if ( empty( $brand_config['canRestartOnboarding'] ) || ! $brand_config['canRestartOnboarding'] ) {
			return;
		}

		// Check if AI SiteGen Hiive capability is active and the site was created in the last 9 months
		if ( ! Config::has_ai_sitegen() || ! self::is_site_created_within_last_9_months() ) {
			return;
		}

		// Get flow data and check if the total onboarding tries are less than or equal to 3
		$flow_data = get_option( Options::get_option_name( 'flow' ) );

		if ( isset( $flow_data ) ) {
			// Increment the total onboarding tries
			$flow_data['onboardingRetries']['retryCount'] = ( $flow_data['onboardingRetries']['retryCount'] ?? 0 ) + 1;

			// Update the flow data with the incremented total onboarding tries count
			update_option( Options::get_option_name( 'flow' ), $flow_data );

			// Determine eligibility for restarting onboarding
			$currentRetryCount = $flow_data['onboardingRetries']['retryCount'];
			$canRestart        = $currentRetryCount <= $flow_data['onboardingRetries']['maxRetryCount'];

			// Update the eligibility status in wp_option
			update_option( Options::get_option_name( 'can_restart' ), $canRestart );
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
