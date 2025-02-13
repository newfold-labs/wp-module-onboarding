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
		$install_date_timestamp = get_option(Options::get_option_name( 'bluehost_plugin_install_date', false ));
		
		// If the option is not set or is invalid, return false
		if (!$install_date_timestamp) {
			return false;
		}

		// Calculate the timestamp for 275 days ago (9 months)
		$nine_months_ago = time() - (275 * 24 * 60 * 60);
		
		return $install_date_timestamp >= $nine_months_ago;
	}

	/**
	 * Determines if a user is eligible for Restarting Onboarding again
	 * Toggles a wp_option to reflect the user's eligibility status.
	 *
	 * @return void
	 */
	public static function determine_onboarding_restart_eligibility() {
		\do_action('qm/debug', self::is_site_created_within_last_9_months());
		return;
		
		//Check if the brand is eligible for Restarting Onboarding
		if(isset(Brands::get_brands()[NFD_ONBOARDING_PLUGIN_BRAND]['config']['canRestartOnboarding']) || false == Brands::get_brands()[NFD_ONBOARDING_PLUGIN_BRAND]['config']['canRestartOnboarding']){
			return;
		}

		//Check if hasAISiteGen Capability is active and is created in the last 9 months
		if(false == Config::has_ai_sitegen() || false == self::is_site_created_within_last_9_months()){
			return;
		}

		// Get Flow value and check if Total Onboarding Tries is less than 3
		$flow_data = get_option( Options::get_option_name( 'flow' ), false );
		if(isset($flow_data)){
			$totalOnboardingTries = $flow_data['totalOnboardingTries'];
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
