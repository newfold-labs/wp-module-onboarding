<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

class AppService {

	/**
	 * App Service constructor.
	 *
	 * @return AppService
	 */
	public function __construct() {
		return $this;
	}

	/**
	 * Initialize the App Service.
	 *
	 * @return void
	 */
	public function start(): void {
		// Disable SSO redirect.
		update_option( Options::get_option_name( 'redirect' ), '0' );
		// If Onboarding is running for the first time...
		if ( StatusService::handle_started() ) {
			// Initialize services.
			SettingsService::initialize();
			PluginService::initialize();
		}
	}

	public function complete(): void {
		// Publish the header.
		// Publish the footer.
		// Publish selected homepage.
		// Set the color palette.
		// Trash preview posts.
	}
}