<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * App Service for handling onboarding application lifecycle.
 *
 * This service manages the start and completion of the onboarding process,
 * including initialization of required services, publishing selected content,
 * and saving site information for other modules to access.
 */
class AppService {

	/**
	 * Initialize the App Service.
	 *
	 * @return void
	 */
	public static function start(): void {
		// If Onboarding is running for the first time...
		if ( StatusService::handle_started() ) {
			// Initialize services.
			SettingsService::initialize();
			PluginService::initialize();
		}
	}

	/**
	 * Complete onboarding.
	 *
	 * @return void
	 * @throws \Exception When homepage publishing fails.
	 */
	public static function complete(): void {
		// Mark onboarding as completed.
		StatusService::handle_completed();

		// Purge all caches.
		container()->get( 'cachePurger' )->purge_all();

		// Create a survey to collect feedback.
		container()->get( 'survey' )->create_toast_survey(
			Events::get_category()[0] . '_sitegen_pulse',
			'customer_satisfaction_survey',
			array(
				'label_key' => 'value',
			),
			__( 'Help us improve', 'wp-module-onboarding' ),
			__( 'How satisfied were you with the ease of creating your website?', 'wp-module-onboarding' ),
		);
	}
}
