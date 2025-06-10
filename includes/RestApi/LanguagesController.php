<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\LanguageService;

/**
 * Controller for handling language-related endpoints.
 */
class LanguagesController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = '/languages';

	/**
	 * Register routes for LanguagesController.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_languages' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get available languages in WordPress.
	 *
	 * @return WP_REST_Response
	 */
	public function get_languages() {
		// Use LanguageService to get languages
		$languages = LanguageService::get_all_languages();

		return new \WP_REST_Response(
			array(
				'languages' => $languages,
			),
			200
		);
	}
}
