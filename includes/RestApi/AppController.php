<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\AppService;
use NewfoldLabs\WP\Module\Installer\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Services\ResetService;

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
			$this->rest_base . '/enable-jetpack-modules',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'enable_jetpack_modules' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/restart',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'restart' ),
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
		AppService::start();
		return new \WP_REST_Response( array(), 202 );
	}

	/**
	 * Complete onboarding backend process.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function complete(): \WP_REST_Response {
		try {
			AppService::complete();
			return new \WP_REST_Response( array(), 200 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array( 'error' => 'Encountered an error while completing the app service.' ),
				500
			);
		}
	}

	/**
	 * Enable Jetpack Forms and Blocks modules.
	 * Must be called before creating pages that contain Jetpack blocks.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function enable_jetpack_modules(): \WP_REST_Response {
		if ( ! class_exists( Plugins::class ) ) {
			return new \WP_REST_Response( array( 'error' => 'Installer module not available.' ), 500 );
		}

		$forms  = Plugins::toggle_jetpack_module( 'contact-form', true );
		$blocks = Plugins::toggle_jetpack_module( 'blocks', true );

		return new \WP_REST_Response(
			array(
				'contact-form' => $forms,
				'blocks'       => $blocks,
			),
			200
		);
	}

	/**
	 * Restart onboarding backend process.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function restart(): \WP_REST_Response {
		ResetService::reset();
		return new \WP_REST_Response( array( 'success' => true ), 200 );
	}
}
