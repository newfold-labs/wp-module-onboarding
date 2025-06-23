<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\AppService;
use NewfoldLabs\WP\Module\Onboarding\Data\Config;

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
	 * @return \WP_REST_Response The response object.
	 */
	public function complete(): \WP_REST_Response {
		try {
			( new AppService() )->complete();
			return new \WP_REST_Response( array(), 200 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array( 'error' => 'Encountered an error while completing the app service.' ),
				500
			);
		}
	}
}
