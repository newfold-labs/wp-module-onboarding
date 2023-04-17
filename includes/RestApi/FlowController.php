<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\FlowService;

/**
 * Class FlowController
 */
class FlowController {

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
	protected $rest_base = '/flow';

	/**
	 * Registers rest routes for this controller class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/complete',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'complete' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/switch',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'switch' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => $this->get_switch_args(),
				),
			)
		);
	}

	/**
	 * Get the valid request params for the switch endpoint.
	 *
	 * @return array
	 */
	public function get_switch_args() {
		return array(
			'flow' => array(
				'required'          => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}

	/**
	 * Get Onboarding flow data.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_onboarding_flow_data() {
		return new \WP_REST_Response(
			FlowService::get_flow_data(),
			200
		);
	}

	/**
	 * Update the Onboarding flow data.
	 *
	 * @param \WP_REST_Request $request The incoming request.
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function save_onboarding_flow_data( \WP_REST_Request $request ) {
		$params = json_decode( $request->get_body(), true );

		$flow_data = FlowService::update_flow_data( $params );
		if ( \is_wp_error( $flow_data ) ) {
			return $flow_data;
		}

		return new \WP_REST_Response(
			$flow_data,
			200
		);
	}

	/**
	 * Flow completion API for child theme generation, verify child theme and publish site pages.
	 *
	 * @return \WP_REST_Response
	 */
	public function complete() {
		$site_pages_publish_request  = new \WP_REST_Request(
			'POST',
			'/newfold-onboarding/v1/site-pages/publish'
		);
		$site_pages_publish_response = \rest_do_request( $site_pages_publish_request );
		if ( $site_pages_publish_response->is_error() ) {
			return $site_pages_publish_response->as_error();
		}
		$child_theme_generation_request  = new \WP_REST_Request(
			'POST',
			'/newfold-onboarding/v1/themes/child/generate'
		);
		$child_theme_generation_response = \rest_do_request( $child_theme_generation_request );
		if ( $child_theme_generation_response->is_error() ) {
			return $child_theme_generation_response->as_error();
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	/**
	 * Switch the Onboarding flow.
	 *
	 * @param \WP_REST_Request $request The incoming switch request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function switch( \WP_REST_Request $request ) {
		$flow   = $request->get_param( 'flow' );
		$status = FlowService::switch_flow( $flow );
		if ( \is_wp_error( $status ) ) {
			return $status;
		}

		return new \WP_REST_Response(
			array(),
			200
		);
	}
}
