<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;

class ReduxStateController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The endpoint base
	 *
	 * @var string
	 */
	protected $rest_base = '/redux-state';

	/**
	 * Registers rest routes for ReduxStateController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/input-slice',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_input_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_input_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/sitegen-slice',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_sitegen_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_sitegen_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/blueprints-slice',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_blueprints_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_blueprints_slice_state' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}


	/**
	 * Get the input slice state.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_input_slice_state() {
		$data = \get_option( Options::get_option_name( 'state_input' ), false );
		if ( ! $data ) {
			$data = array();
		}

		return new \WP_REST_Response(
			$data,
			200
		);
	}

	/**
	 * Update the input slice state.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function update_input_slice_state( \WP_REST_Request $request ): \WP_REST_Response {
		$data = json_decode( $request->get_body(), true );
		if ( ! $data ) {
			return new \WP_REST_Response(
				'Invalid data',
				400
			);
		}

		$result = ReduxStateService::update( 'input', $data );
		if ( ! $result ) {
			return new \WP_REST_Response(
				'Failed to update input slice state',
				500
			);
		}

		return new \WP_REST_Response(
			$data,
			200
		);
	}

	/**
	 * Get the sitegen slice state.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_sitegen_slice_state() {
		$data = \get_option( Options::get_option_name( 'state_sitegen' ), false );
		if ( ! $data ) {
			$data = array();
		}

		return new \WP_REST_Response( $data, 200 );
	}

	/**
	 * Update the sitegen slice state.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function update_sitegen_slice_state( \WP_REST_Request $request ): \WP_REST_Response {
		$data = json_decode( $request->get_body(), true );
		if ( ! $data ) {
			return new \WP_REST_Response(
				'Invalid data',
				400
			);
		}

		$result = ReduxStateService::update( 'sitegen', $data );
		if ( ! $result ) {
			return new \WP_REST_Response(
				'Failed to update sitegen slice state',
				500
			);
		}

		return new \WP_REST_Response( $data, 200 );
	}

	/**
	 * Get the blueprints slice state.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_blueprints_slice_state() {
		$data = \get_option( Options::get_option_name( 'state_blueprints' ), false );
		if ( ! $data ) {
			$data = array();
		}

		return new \WP_REST_Response( $data, 200 );
	}

	/**
	 * Update the blueprints slice state.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function update_blueprints_slice_state( \WP_REST_Request $request ): \WP_REST_Response {
		$data = json_decode( $request->get_body(), true );
		if ( ! $data ) {
			return new \WP_REST_Response(
				'Invalid data',
				400
			);
		}

		$result = ReduxStateService::update( 'blueprints', $data );
		if ( ! $result ) {
			return new \WP_REST_Response(
				'Failed to update blueprints slice state',
				500
			);
		}

		return new \WP_REST_Response( $data, 200 );
	}
}
