<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\FlowService;


/**
 * Class FlowController
 */
class FlowController {

	/**
	 * @var string
	 * This is the REST API namespace that will be used for our custom API
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * @var string
	 * This is the REST endpoint
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
					'methods'  => \WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Fetch onboarding flow details from database.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_onboarding_flow_data( \WP_REST_Request $request ) {
		$result = FlowService::read_flow_data_from_wp_option();
		if( ! $result )
			$result = FlowService::get_default_flow_data();

		return new \WP_REST_Response(
			$result,
			200
		);
	}

	/**
	 * Save / Update onboarding flow details to database.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function save_onboarding_flow_data( \WP_REST_Request $request ) {
		$default_flow_data = FlowService::get_default_flow_data();
		$params    = json_decode( $request->get_body(), true );

		if ( is_null( $params ) ) {
			return new \WP_Error(
				'no_post_data',
				'No Data Provided',
				array( 'status' => 404 )
			);
		}
		
		$mismatch_key = FlowService::check_key_in_nested_array($params, $default_flow_data);
		if ( ! empty($mismatch_key) )  {
			return new \WP_Error(
				'wrong_param_provided',
				"Wrong Parameter Provided",
				array( 'status' => 404 , 'Mismatched Parameter(s)' => $mismatch_key)
			);
		}

		$flow_data = FlowService::update_post_call_data_recursive( $default_flow_data, $params );
		if(!is_array($flow_data)) {
			return new \WP_Error(
				'wrong_param_type_provided',
				"Wrong Parameter Type Provided : ". $flow_data,
				array( 'status' => 404 )
			);
		}

		// update timestamp once data is updated
		$flow_data['updatedAt'] = time();

		// Update Blog Information from Basic Info
		if ( ( ! empty( $flow_data['data']['blogName'] ) ) ) {
			 \update_option( Options::get_option_name( 'blog_name', false ), $flow_data['data']['blogName'] );
		}

		if ( ( ! empty( $flow_data['data']['blogDescription'] ) ) ) {
			 \update_option( Options::get_option_name( 'blog_description', false ), $flow_data['data']['blogDescription'] );
		}

		if ( ( ! empty( $flow_data['data']['siteLogo'] ) ) && ! empty( $flow_data['data']['siteLogo']['id'] ) ) {
				  \update_option( Options::get_option_name( 'site_icon', false ), $flow_data['data']['siteLogo']['id'] );
		} else {
			 \update_option( Options::get_option_name( 'site_icon', false ), 0 );
		}

		// save data to database
		if ( ! FlowService::update_wp_options_data_in_database( $flow_data ) ) {
			return new \WP_Error(
				'database_update_failed',
				'There was an error saving the data',
				array( 'status' => 404 )
			);
		}

		return new \WP_REST_Response(
			$flow_data,
			200
		);
	}
}
