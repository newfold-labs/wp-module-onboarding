<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

class AppService {

	/**
	 * Initialize the App Service.
	 *
	 * @return void
	 */
	public static function initialize(): void {
		// Disable SSO redirect.
		update_option( Options::get_option_name( 'redirect' ), '0' );
		// If Onboarding is running for the first time...
		if ( StatusService::handle_started() ) {
			// Initialize services.
			SettingsService::initialize();
			PluginService::initialize();
		}
	}
}