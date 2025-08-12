<?php
/**
 * Blueprints Controller
 *
 * @package NewfoldLabs\WP\Module\Onboarding\RestApi
 */

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\BlueprintsService;

class BlueprintsController {

	/**
	 * This is the REST API namespace that will be used for our custom API
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * This is the REST endpoint
	 *
	 * @var string
	 */
	protected $rest_base = '/blueprints';

	/**
	 * Register the routes for the blueprints controller.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-blueprints',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_blueprints' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get the blueprints.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function get_blueprints( \WP_REST_Request $request ): \WP_REST_Response {
		$blueprints = (new BlueprintsService())->fetch_blueprints();
		if ( is_wp_error( $blueprints ) ) {
			return new \WP_REST_Response( $blueprints->get_error_message(), 500 );
		}

		return new \WP_REST_Response( $blueprints, 200 );
	}
}