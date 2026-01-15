<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\PreviewsService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;

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
		// If Onboarding is running for the first time...
		if ( StatusService::handle_started() ) {
			// Trash sample page.
			LegacySiteGenService::trash_sample_page();

			// Initialize services.
			SettingsService::initialize();
			PluginService::initialize();
		}
	}

	/**
	 * Complete onboarding.
	 *
	 * @param string $selected_sitegen_homepage The selected sitegen homepage to publish.
	 * @return void
	 * @throws \Exception When homepage publishing fails.
	 */
	public function complete( string $selected_sitegen_homepage ): void {
		// Publish selected homepage.
		$result = ( new SiteGenService() )->publish_homepage( $selected_sitegen_homepage );
		if ( \is_wp_error( $result ) ) {
			throw new \Exception( esc_html( $result->get_error_message() ) );
		}
		// Trash Preview pages.
		PreviewsService::trash_preview_pages();

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

	/**
	 * Complete blueprint onboarding.
	 *
	 * @return void
	 */
	public function complete_blueprint(): void {
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
