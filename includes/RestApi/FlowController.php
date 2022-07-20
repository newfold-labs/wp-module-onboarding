<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Permissions;


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
	 * @var string
	 * This is the key used to save the flow data into the wp_options table in the database
	 */
	protected $nfd_onboarding_options_flow_key = 'nfd_module_onboarding_flow';

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
	}

	/**
	 * Fetch onboarding flow details from database.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_onboarding_flow_data( \WP_REST_Request $request ) {
		// check if data is available in the database if not then fetch the default dataset
		if ( ! ( $result = $this->read_details_from_wp_options() ) ) {
			$result              = Flows::get_data();
			$result['createdAt'] = time();
			$this->save_details_to_wp_options( $result );
		}

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
		$flow_data = array();
		$params    = json_decode( $request->get_body(), true );

		if ( is_null( $params ) ) {
			return new \WP_Error(
				'no_post_data',
				'No Data Provided',
				array( 'status' => 404 )
			);
		}

		if ( ! ( $flow_data = $this->read_details_from_wp_options() ) ) {
			  $flow_data              = Flow::get_flow_data();
			  $flow_data['createdAt'] = time();
			  $this->save_details_to_wp_options( $flow_data );
		}

		foreach ( $params as $key => $param ) {
			if ( $value = $this->array_search_key( $key, $flow_data ) === false ) {
				return new \WP_Error(
					'wrong_param_provided',
					"Wrong Parameter Provided : $key",
					array( 'status' => 404 )
				);
			}
		}

		$flow_data = array_replace_recursive( $flow_data, $params );

		// update timestamp once data is updated
		$flow_data['updatedAt'] = time();

		// save data to database
		if ( ! $this->update_wp_options_data_in_database( $flow_data ) ) {
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

	/*
	 * Read onboarding flow options from database
	 */
	public function read_details_from_wp_options() {
		return \get_option( $this->nfd_onboarding_options_flow_key );
	}

	/*
	 * add onboarding flow options
	 */
	public function save_details_to_wp_options( $data ) {
		return \add_option( $this->nfd_onboarding_options_flow_key, $data );
	}

	/*
	 * update onboarding flow options
	 */
	public function update_wp_options_data_in_database( $data ) {
		return \update_option( $this->nfd_onboarding_options_flow_key, $data );
	}

	/*
	 * function to search for key in array recursively with case sensitive exact match
	 */
	public function array_search_key( $needle_key, $array ) {
		foreach ( $array as $key => $value ) {
			if ( strcmp( $key, $needle_key ) === 0 ) {
				return true;
			}
			if ( is_array( $value ) ) {
				if ( ( $result = $this->array_search_key( $needle_key, $value ) ) !== false ) {
					return $result;
				}
			}
		}
		return false;
	}
}
