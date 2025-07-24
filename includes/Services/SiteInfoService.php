<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;

/**
 * Service for handling onboarding site information persistence and retrieval.
 */
class SiteInfoService {

	/**
	 * Database option name for storing onboarding site information.
	 */
	const SITE_INFO_OPTION = 'nfd_module_onboarding_site_info';

	/**
	 * Save onboarding site information to database option for other modules to access.
	 *
	 * @return void
	 */
	public static function save_site_info(): void {
		$site_info = array();

		// Get experience level from FlowService
		$experience_level              = FlowService::get_experience_level();
		$site_info['experience_level'] = $experience_level;

		// Get site type from flow data
		$flow_data = FlowService::read_data_from_wp_option( false );
		if ( $flow_data && isset( $flow_data['data']['siteType']['primary']['value'] ) ) {
			$site_info['site_type'] = $flow_data['data']['siteType']['primary']['value'];
		} else {
			// Fallback to default site type
			$site_info['site_type'] = 'business';
		}

		// Save to database option
		update_option( self::SITE_INFO_OPTION, $site_info );
	}

	/**
	 * Get the stored onboarding site information.
	 *
	 * @return array
	 */
	public static function get_site_info(): array {
		return get_option( self::SITE_INFO_OPTION, array() );
	}

	/**
	 * Delete the stored onboarding site information.
	 *
	 * @return bool
	 */
	public static function delete_site_info(): bool {
		return delete_option( self::SITE_INFO_OPTION );
	}
}
