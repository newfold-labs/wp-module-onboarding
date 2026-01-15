<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\AppService;

/**
 * AppController class for handling onboarding application REST API endpoints.
 *
 * This controller manages the REST API routes and handlers for the onboarding
 * application functionality. It provides endpoints for starting and completing
 * the onboarding process.
 */
class AppController {

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
	protected $rest_base = '/app';

	/**
	 * Register the REST API routes for the onboarding application.
	 *
	 * Registers two main endpoints:
	 * - /app/start: Initiates the onboarding process
	 * - /app/complete: Completes the onboarding process with selected homepage
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/start',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'start' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/complete',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'complete' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/complete-blueprint',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'complete_blueprint' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Start onboarding backend process.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function start(): \WP_REST_Response {
		try {
			( new AppService() )->start();
			return new \WP_REST_Response( array(), 202 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array(
					'error' => 'Encountered an error while starting the app service.',
				),
				500
			);
		}
	}

	/**
	 * Complete onboarding backend process.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function complete( \WP_REST_Request $request ): \WP_REST_Response {
		$data                      = json_decode( $request->get_body(), true );
		$selected_sitegen_homepage = $data['selected_sitegen_homepage'] ?? false;
		if ( ! $selected_sitegen_homepage ) {
			return new \WP_REST_Response(
				array( 'error' => 'Selected sitegen homepage is required.' ),
				400
			);
		}

		try {
			( new AppService() )->complete( $selected_sitegen_homepage );
			return new \WP_REST_Response( array(), 200 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array( 'error' => 'Encountered an error while completing the app service.' ),
				500
			);
		}
	}

	/**
	 * Complete blueprint onboarding backend process.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function complete_blueprint( \WP_REST_Request $request ): \WP_REST_Response {
		try {
			( new AppService() )->complete_blueprint();
			return new \WP_REST_Response( array(), 200 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array( 'error' => 'Encountered an error while completing the blueprint app service.' ),
				500
			);
		}
	}
}
