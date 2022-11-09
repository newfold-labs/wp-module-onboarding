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
	 * @var array
	 * This is the key if a user tries to add a param externally
	 */
	protected $mismatch_key = [];

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

		if ( array_diff($this->flatten_array(Flows::get_data()), $this->flatten_array($result)) ) {
				$result = array_replace_recursive( Flows::get_data(), $result);
				$this->save_details_to_wp_options( $result );
		}

		$delete_flow_item = array_diff($this->flatten_array($result), $this->flatten_array(Flows::get_data()));

		if ($delete_flow_item) {
			foreach ( $delete_flow_item as $key => $value ) {
				if (in_array($value, array_keys($result), true) ) {
					unset($result[$value]);
				}
				else {
					$this->delete_wp_options_data_in_database($value, $result);
				}
		}}

		return new \WP_REST_Response(
			$result,
			200
		);
	}

	public function flatten_array( $array ) {
		$all_keys = array();
		foreach ($array as $key => $value) {
			$all_keys[] = $key;
			if (is_array($value)) {
				$all_keys = array_merge($all_keys, $this->flatten_array($value));
			}
		}
		return $all_keys;
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

		if ( array_diff($this->flatten_array(Flows::get_data()), $this->flatten_array($flow_data)) ) {
			$flow_data = array_replace_recursive( Flows::get_data(), $flow_data);
			$this->save_details_to_wp_options( $flow_data );
		}

		$delete_flow_item = array_diff($this->flatten_array($flow_data), $this->flatten_array(Flows::get_data()));

		if ($delete_flow_item) {
			foreach ( $delete_flow_item as $key => $value ) {
				if (in_array($value, array_keys($flow_data), true) ) {
					unset($flow_data[$value]);
				}
				else {
					$this->delete_wp_options_data_in_database($value, $flow_data);
				}
		}}

		$mismatch_key = $this->check_key_in_nested_array($params, Flows::get_data());
		if ( isset($mismatch_key) )  {
			return new \WP_Error(
				'wrong_param_provided',
				"Wrong Parameter Provided : $mismatch_key",
				array( 'status' => 404 )
			);
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
	 * function to delete a key in array recursively which does not exist in Flows::get_data()
	 */
	public function delete_wp_options_data_in_database( $data, &$arrFlow ) {
		foreach ( $arrFlow as $key => $value) {
				if (is_array($value)) {
					if (in_array($data, array_keys($value), true) ) {
						unset($arrFlow[$key][$data]);
					}
					else {
						$arrFlow[$key] = $this->delete_wp_options_data_in_database( $data, $value );
					}
				}
			}
			return $arrFlow;
	}

	/*
	 * function to search for key in array recursively with case sensitive exact match
	 */
	public function check_key_in_nested_array( $arrParam, $arrFlow ) {
		foreach($arrParam as $key => $value){
			if(!array_key_exists($key, $arrFlow))
			{
				if (count(array_filter(array_keys($arrParam), 'is_string')) === 0) {
					$this->mismatch_key[] = implode(", ", array_keys($value));
				}
				$this->mismatch_key[]  = $key;
				break;
			}
			elseif ( is_array( $value ) && !empty($value) )
			{
				$new_diff = $this->check_key_in_nested_array($value, $arrFlow[$key]);
				if($new_diff)
				{
					$difference[$key] = $value;
					$this->mismatch_key[] = $value;
					break;
				}
			}
		}
		return $this->mismatch_key[0];
	}
}
