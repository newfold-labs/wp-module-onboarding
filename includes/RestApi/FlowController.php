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

    /*
     * @var array
     * This variable stores all the options for the flow
     */
    protected $options = array();

    /*
     * Initializing the data in the constructor 
     */
    public function __construct()
    {
    }

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
        $this->options = get_option($this->nfd_onboarding_options_flow_key);
		if($this->options) {
        	$this->options = unserialize($this->options);
		}
        return $this->options;
    }

    /*
     * update onboarding flow options
     */
    public function save_details_to_wp_options($data)
    {
        $this->options = serialize($data);
        return add_option($this->nfd_onboarding_options_flow_key, $this->options);
    }
}
