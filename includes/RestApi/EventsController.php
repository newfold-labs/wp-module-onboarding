<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\EventService;

/**
 * Controller to send analytics events.
 */
class EventsController extends \WP_REST_Controller {

	/**
	 * The namespace of the controller.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The REST base endpoint.
	 *
	 * @var string
	 */
	protected $rest_base = '/events';

	/**
	 * Register routes that the controller will expose.
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
					'callback'            => array( $this, 'send' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => $this->get_send_args(),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/batch',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'send_batch' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Args for a single event.
	 *
	 * @return array
	 */
	public function get_send_args() {
			return array(
				'action'   => array(
					'required'          => true,
					'description'       => __( 'Event action', 'wp-module-onboarding' ),
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_title',
					'validate_callback' => array( EventService::class, 'validate_action' ),
				),
				'category' => array(
					'default'           => Events::get_category()[0],
					'description'       => __( 'Event category', 'wp-module-onboarding' ),
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_title',
					'validate_callback' => array( EventService::class, 'validate_category' ),
				),
				'data'     => array(
					'description' => __( 'Event data', 'wp-module-onboarding' ),
					'type'        => 'object',
				),
			);
	}

	/**
	 * Sends a Hiive Event to the data module API.
	 *
	 * @param \WP_REST_Request $request The incoming request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function send( \WP_REST_Request $request ) {
		return EventService::send( $request->get_params() );
	}

	/**
	 * Sends an array of Hiive Events to the data module API programmatically.
	 *
	 * @param \WP_REST_Request $request The incoming request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function send_batch( \WP_REST_Request $request ) {
		$events = $request->get_json_params();
		if ( ! rest_is_array( $events ) ) {
			return new \WP_Error(
				'nfd_module_onboarding_error',
				__( 'Request does not contain an array of events.', 'wp-module-onboarding' )
			);
		}

		$response_errors = array();
		foreach ( $events as $index => $event ) {
			$response = EventService::send( $event );
			if ( is_wp_error( $response ) ) {
				array_push(
					$response_errors,
					array(
						'index' => $index,
						'data'  => $response,
					)
				);
			}
		}

		if ( ! empty( $response_errors ) ) {
			return new \WP_Error(
				'nfd_module_onboarding_error',
				__( 'Some events failed.', 'wp-module-onboarding' ),
				array(
					'data' => $response_errors,
				)
			);
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}
}
