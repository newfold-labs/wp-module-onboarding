<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * [Class EventsController]
 */
class EventsController extends \WP_REST_Controller {

     /**
      * @var string
      */
     protected $namespace = 'newfold-onboarding/v1';

     /**
      * @var string
      */
     protected $rest_base = '/events';

     /**
      * Register REST routes for EventsController class.
      * 
      * @return void
      */
     public function register_routes() {
          \register_rest_route(
               $this->namespace,
               $this->rest_base,
               array(
                    array(
                         'methods'             => \WP_REST_Server::CREATABLE,
                         'callback'            => array( $this, 'send_event' ),
                         'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
                         'args'                => $this->get_send_event_args(),
                    ),
               )
          );
     }

     /**
      * Get args for the send_event endpoint.
      * 
      * @return array
      */
     public function get_send_event_args() {
               return array(
                    'slug' => array(
                         'required'          => true,
                         'type'              => 'string',
                         'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'data' => array(
                         'type' => 'object',
                    ),
               );
     }

     /**
      * Send events to the data module events API.
      * 
      * @param \WP_REST_Request $request
      * 
      * @return \WP_REST_Response|\WP_Error
      */
     public function send_event( \WP_REST_Request $request ) {
	     $event = Events::get_event( $request->get_param( 'slug' ) );
		if ( ! $event ) {
		     return new \WP_Error(
			     'event-error',
			     'No such event found',
			     array( 'status' => 404 )
		     );
          }

          $event['data'] = $request->get_param( 'data' );

          if ( ! empty( $event['data'] ) && ! empty( $event['data']['stepID'] ) ) {
               $event['data']['page'] = \admin_url( '/index.php?page=nfd-onboarding#' . $event['data']['stepID'] );
          }

          $event_data_request = new \WP_REST_Request(
               \WP_REST_Server::CREATABLE,
               NFD_MODULE_DATA_EVENTS_API
          );
          $event_data_request->set_body_params( $event );
          $response = \rest_do_request( $event_data_request );
          if ( $response->is_error() ) {
               return $response->as_error();
          }

          return new \WP_REST_Response(
               $response,
               $response->status
          );
     }
}
