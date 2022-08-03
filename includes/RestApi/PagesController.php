<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Mustache\Mustache;

/**
 * class PagesController
 */
class PagesController
{

    /**
     * @var string
     */
    protected $namespace = 'newfold-onboarding/v1';

    /**
     * @var string
     */
    protected $rest_base = '/pages';

    /**
     * Registers rest routes for PagesController class.
     *
     * @return void
     */
    public function register_routes()
    {
        \register_rest_route(
            $this->namespace,
            $this->rest_base,
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'create_page' ),
                'permission_callback'   => array( Permissions::class, 'custom_post_authorized_admin' ),
                'args'                  => $this->get_request_params(),
            )
        );
    }

    /**
     * Endpoint create_page
     * 
     * @param $request WP_REST_Request
     */
    public function create_page( \WP_REST_Request $request )
    {
        $page = $request->get_param( 'page' );
        // check if page already exists using title
        $page_details = get_page_by_title( $page );
        if (!empty( $page_details )) {
            return new \WP_Error('page_already_exists', 'Provided page data already exists', array('status' => 400));
        }

        $mustache   = new Mustache();
        switch ( $page ) {
            case 'home':
                $title      = 'Home';
                $content    = $mustache->render_template( 'homePage', array() );
                break;

            case 'about':
                $title      = 'About';
                $content    = $mustache->render_template( 'aboutPage', array() );
                break;

            case 'contact':
                $title      = 'Contact';
		        $content    = $mustache->render_template( 'contactPage', array() );
                break;

            default:
                return new \WP_Error('no_page_data', 'No Page Data Provided', array('status' => 400));
        }

        // Create page object
        $page_data = array(
            'post_title'    => $title,
            'post_content'  => $content,
            'post_status'   => 'publish',
            'post_author'   => \wp_get_current_user()->ID,
            'post_type'     => 'page'
        );

        // Insert the page into the database
        if (wp_insert_post($page_data) > 0) {
            return new \WP_REST_Response("Page " . $page_data['post_title'] . " saved successfully", 200);
        } else {
            return new \WP_Error('error_saving_page', 'Error Saving Data Provided to Database', array('status' => 400));
        }
    }

    /**
     * Get query params for the route.
     *
     * @return array
     */
    public function get_request_params()
    {
        return array(
            'page' => array(
                'type'              => 'string',
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
                'description'       => 'Page name to be created.'
            ),
        );
    }
}
