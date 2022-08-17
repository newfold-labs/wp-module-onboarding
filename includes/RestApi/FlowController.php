<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;


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
		// check if data is available in the database if not then fetch the default dataset
		if ( ! ( $result = $this->read_details_from_wp_options() ) ) {
			$result              = Flows::get_data();
			$result['createdAt'] = time();
			// update default data if flow type is ecommerce
			$result = $this->update_default_data_for_ecommerce( $result );
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
			  $flow_data              = Flows::get_data();
			  $flow_data['createdAt'] = time();
			  // update default data if flow type is ecommerce
			  $flow_data = $this->update_default_data_for_ecommerce( $flow_data );
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

	/**
	 * check the current flow type and update default data if flowtype is ecommerce.
	 *
	 * @param default flow data.
	 *
	 * @return array
	 */
	public function update_default_data_for_ecommerce( $data ) {
		// get current flow type
		$flow_type = Data::current_flow();
		if($flow_type == 'ecommerce') {
			// update default data with ecommerce data
			$data['data']['topPriority']['priority1'] = 'selling';
			$data['data']['siteType'] = array('label' => '', 'referTo' => 'business');
		}
		return $data;
	}

	/*
	 * Read onboarding flow options from database
	 */
	public function read_details_from_wp_options() {
		return \get_option( Options::get_option_name( 'flow' ) );
	}

	/*
	 * add onboarding flow options
	 */
	public function save_details_to_wp_options( $data ) {
		return \add_option( Options::get_option_name( 'flow' ), $data );
	}

	/*
	 * update onboarding flow options
	 */
	public function update_wp_options_data_in_database( $data ) {
		return \update_option( Options::get_option_name( 'flow' ), $data );
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
