<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Flow;
use NewfoldLabs\WP\Module\Onboarding\Permissions;


/**
 * Class FlowController
 */
class FlowController
{

    /**
     * @var string
     * This is the REST api namespace that will be used for our custom API
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
    public function register_routes()
    {
        \register_rest_route(
            $this->namespace,
            $this->rest_base,
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_onboarding_flow_data'),
                    'permission_callback' => array($this, 'check_permissions'),
                    'args'                => array()
                ),
				array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'save_onboarding_flow_data'),
                    'permission_callback' => array($this, 'check_permissions'),
                    'args'                => array()
                )
            )
        );
    }

    /**
     * Fetch onboarding flow details from database.
     *
     * @param \WP_REST_Request $request Request model.
     *
     * @return array
     */
    public function get_onboarding_flow_data(\WP_REST_Request $request)
    {
	    // check if data is available in the database if not then fetch the default dataset
	    if(!($result = $this->read_details_from_wp_options())) {
	    	$result = Flow::get_flow_data();
			$result['createdAt'] = time();
			$this->save_details_to_wp_options($result);
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
     * @return array
     */
    public function save_onboarding_flow_data(\WP_REST_Request $request)
    {
		$flow_data = array();	
		$params = json_decode($request->get_body(), true);

		if(is_null($params)) {
			return new \WP_Error( 'no_post_data', 'No Data Provided', array( 'status' => 404 ) );
		}

		$flow_data = $this->read_details_from_wp_options();
		foreach($params as $key => $param){
			if($value = $this->array_search_key($key, $flow_data) === FALSE) {
				return new \WP_Error( 'wrong_param_provided', "Wrong Parameter Provided : $key", array( 'status' => 404 ) );
			}
		}
		
		$flow_data = $this->array_merge_recursive2($flow_data, $params);

		// update timestamp once data is updated
		$flow_data['updatedAt'] = time();

		// save data to database
		if(!$this->update_wp_options_data_in_database($flow_data)) {
			return new \WP_Error( 'database_update_failed', "There was an error saving the data", array( 'status' => 404 ) ); 
		}
	
		return new \WP_REST_Response(
			$flow_data,
			200
		);
    }

    /**
     * Check if caller has enough permissions to use the route.
     *
     * @return boolean
     */
    public function check_permissions()
    {
        return Permissions::rest_is_authorized_admin();
    }

    /*
     * Read onboarding flow options from database
     */
    public function read_details_from_wp_options()
    {
        return \maybe_unserialize(get_option($this->nfd_onboarding_options_flow_key));
    }

    /*
     * add onboarding flow options
     */
    public function save_details_to_wp_options($data)
    {
        return add_option($this->nfd_onboarding_options_flow_key, \maybe_serialize($data));
    }
	
    /*
	 * update onboarding flow options
	 */
    public function update_wp_options_data_in_database($data) {
		return update_option($this->nfd_onboarding_options_flow_key, \maybe_serialize($data));
    }

    /*
     * function to search for key in array recursively with case sensitive exact match
     */
	public function array_search_key( $needle_key, $array ) {
		foreach($array as $key => $value){
			if(strcmp($key, $needle_key) === 0 ) {
				return $value;
			}
			if(is_array($value)){
				if( ($result = $this->array_search_key($needle_key,$value)) !== false)
					return $result;
			}
  		}
  		return false;
	} 

    /*
     * function to merge associative arrays recursively and overriding emoty values
     */
	public function array_merge_recursive2($a, $b) {
	    // If one is not an array, give precedence to the other
		if (!is_array($a)) return $b;
		if (!is_array($b)) return $a;
		$merged = [];
		foreach(array_merge($a, $b) as $k => $v) {
			$merged[$k] = !isset($a[$k]) ? $b[$k]
						: (!isset($b[$k]) ? $a[$k]
						: $this->array_merge_recursive2($a[$k], $b[$k]));
		}
		return $merged;
	}
}
