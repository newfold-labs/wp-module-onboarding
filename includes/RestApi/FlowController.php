<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\GlobalStylesService;
use NewfoldLabs\WP\Module\Onboarding\Services\StatusService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\TemplatePartsService;

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
					'callback'            => array( $this, 'get' ),
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
	public function get() {
		return new \WP_REST_Response(
			FlowService::get_data(),
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

		// Mark Onboarding as started only on the first REST API request from the React App.
		update_option( Options::get_option_name( 'redirect' ), '0' );
		StatusService::handle_started();

		$flow_data = FlowService::update_data( $params );
		if ( is_wp_error( $flow_data ) ) {
			return $flow_data;
		}

		return new \WP_REST_Response(
			$flow_data,
			200
		);
	}

	/**
	 * Handles the completion of different onboarding flows.
	 *
	 * This function processes the completion of various onboarding flows,
	 * such as site generation and site page publishing, and updates global
	 * styles and template parts if necessary.
	 *
	 * @param \WP_REST_Request $request The request object containing the flow parameter.
	 *
	 * @return \WP_REST_Response|\WP_Error A WP_REST_Response object on success, or a WP_Error object on failure.
	 */
	public function complete( $request ) {
		// Retrieve the 'flow' parameter from the request
		$flow = $request->get_param( 'flow' );

		if ( 'sitegen' === $flow ) {
			// Read flow data from the WordPress options table
			$flow_data_option = FlowService::read_data_from_wp_option( false );
			// Check if flow data does not exist or 'data' key is not set
			if ( false === $flow_data_option || ! isset( $flow_data_option['data'] ) ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					__( 'Flow data does not exist to generate a child theme.', 'wp-module-onboarding' ),
					array( 'status' => 500 )
				);
			}
			// Retrieve homepage data and the active homepage from the flow data
			$homepage_data   = $flow_data_option['sitegen']['homepages']['data'];
			$active_homepage = $flow_data_option['sitegen']['homepages']['active'];
			// Complete the Sitegen flow using the retrieved data
			SiteGenService::complete( $active_homepage, $homepage_data );
			return new \WP_REST_Response(
				array(),
				201
			);
		}
		// If the flow is not 'sitegen', proceed with publishing site pages
		$site_pages_publish_request = new \WP_REST_Request(
			'POST',
			'/newfold-onboarding/v1/site-pages/publish'
		);
		// Execute the request to publish site pages
		$site_pages_publish_response = rest_do_request( $site_pages_publish_request );
		if ( $site_pages_publish_response->is_error() ) {
			return $site_pages_publish_response->as_error();
		}

		// Get the post ID of the active custom global styles and update it
		$active_custom_global_styles_post_id = GlobalStylesService::get_active_custom_global_styles_post_id();
		$status                              = GlobalStylesService::update_diy_global_style_variation( $active_custom_global_styles_post_id, );
		if ( is_wp_error( $status ) ) {
			return $status;
		}

		// Update the selected template parts
		$status = TemplatePartsService::update_diy_selected_template_parts();
		if ( is_wp_error( $status ) ) {
			return $status;
		}

		// Return a successful response after completing all processes
		return new \WP_REST_Response(
			array(
				'message' => __( 'Success.', 'wp-module-onboarding' ),
			),
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

		if ( ! PluginService::initialize() ) {
			return new \WP_REST_Response(
				array(),
				500
			);
		}

		return new \WP_REST_Response(
			array(),
			200
		);
	}
}
