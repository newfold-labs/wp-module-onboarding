<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Brands;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;
use NewfoldLabs\WP\Module\Onboarding\Data\Config;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;
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
	 * Checks if the WordPress site was created within the last 9 months (275 days)
	 * using the 'bluehost_plugin_install_date' option.
	 *
	 * @return bool True if the site was created within the last 275 days, false otherwise.
	 */
	private static function is_site_created_within_last_9_months(): bool {
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
	 * Checks if the user is eligible to restart onboarding based on brand configuration and AI SiteGen capability.
	 *
	 * @return bool True if eligible, false otherwise.
	 */
	public static function is_onboarding_restart_eligible(): bool {
		// Check if the brand is eligible for Restarting Onboarding
		$brand_config = Brands::get_brands()[ NFD_ONBOARDING_PLUGIN_BRAND ]['config'] ?? array();
		if ( empty( $brand_config['canRestartOnboarding'] ) || ! $brand_config['canRestartOnboarding'] ) {
			return false;
		}

		// Check if AI SiteGen Hiive capability is active and the site was created in the last 9 months
		if ( ! Config::has_ai_sitegen() || ! self::is_site_created_within_last_9_months() ) {
			return false;
		}

		return true;
	}

	/**
	 * Handles the flow data and updates the restart eligibility status based on total onboarding tries.
	 *
	 * @return void
	 */
	public static function update_onboarding_restart_status(): void {
		if ( isset( $_GET['page'] ) && \sanitize_text_field( wp_unslash( $_GET['page'] ) ) === 'nfd-onboarding' ) {
			return;
		}

		// Don't do anything if the customer is not eligible
		if ( ! self::is_onboarding_restart_eligible() ) {
			return;
		}

		// Get flow data
		$flow_data   = get_option( Options::get_option_name( 'flow' ) );
		$active_flow = $flow_data['activeFlow'];
		$homepages   = $flow_data['sitegen']['homepages'];

		if ( isset( $flow_data['onboardingRetries'] ) && ! empty( $flow_data['onboardingRetries'] ) ) {
			// Increment the total onboarding tries
			$flow_data['onboardingRetries']['retryCount'] = ( $flow_data['onboardingRetries']['retryCount'] ?? 0 ) + 1;

			// Update the flow data with the incremented total onboarding tries count
			update_option( Options::get_option_name( 'flow' ), $flow_data );

			// Determine eligibility for restarting onboarding
			$current_retry_count = $flow_data['onboardingRetries']['retryCount'];
			$can_restart         = $current_retry_count < $flow_data['onboardingRetries']['maxRetryCount'];

			// Update the eligibility status in wp_option
			update_option( Options::get_option_name( 'can_restart' ), $can_restart );

			if ( $can_restart ) {
				// Module AI prefix
				$prefix = 'nfd-ai-site-gen-';
				// Sitemeta Options
				$enabled_identifiers = array_keys( array_filter( SiteGenService::enabled_identifiers() ) );

				// Delete enabled identifiers options
				foreach ( $enabled_identifiers as $identifier ) {
					delete_option( $prefix . SiteGenService::get_identifier_name( $identifier ) );
				}

				// Extra NFD-AI Options
				$sitegen_identifiers = array(
					'keywords',
					'homepages',
					'generatedpatterns',
					'contentstructures',
					'siteclassificationmapping',
					'refinedsitedescription',
				);
				foreach ( $sitegen_identifiers as $identifier ) {
					delete_option( $prefix . $identifier );
				}

				delete_option( Options::get_option_name( 'flow' ) );
				$flow_data_copy                                    = Flows::get_data();
				$flow_data_copy['activeFlow']                      = $active_flow;
				$flow_data_copy['sitegen']['homepages']            = $homepages;
				$flow_data_copy['onboardingRetries']['retryCount'] = $current_retry_count;

				// Update the flow data with the incremented total onboarding tries count and add to db
				add_option( Options::get_option_name( 'flow' ), $flow_data_copy );

				delete_option( Options::get_option_name( 'start_date' ) );
				delete_option( Options::get_option_name( 'status' ) );
				delete_option( Options::get_option_name( 'sitegen_regenerated_homepages' ) );
			}
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
		$site_info = array();

		// Get experience level and site type from ReduxStateService
		$data = ReduxStateService::get( 'input' );
		$site_info['experience_level'] = $data['experienceLevel'] ?? 'advanced';
		$site_info['site_type'] = $data['siteType'] ?? 'business';

		// Save to database option
		update_option( Options::get_option_name( 'site_info' ), $site_info );
	}
}
