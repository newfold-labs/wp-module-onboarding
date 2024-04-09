<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;

/**
 * Class for handling analytics events.
 */
class EventService {

	/**
	 * Sends a Hiive Event to the data module API.
	 *
	 * @param array $event The event to send.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function send( $event ) {
		$event = self::validate( $event );
		if ( ! $event ) {
			return new \WP_Error(
				'nfd_module_onboarding_error',
				__( 'Bad event structure/value.', 'wp-module-onboarding' )
			);
		}

		$event_data_request = new \WP_REST_Request(
			\WP_REST_Server::CREATABLE,
			NFD_MODULE_DATA_EVENTS_API
		);
		$event_data_request->set_body_params( $event );

		$response = rest_do_request( $event_data_request );
		if ( $response->is_error() ) {
			return $response->as_error();
		}

		return $response;
	}

	/**
	 * Validates the category of an event.
	 *
	 * @param string $category The category of an event.
	 * @return boolean
	 */
	public static function validate_category( $category ) {
		$default_categories = Events::get_category();
		foreach ( $default_categories as $event_category ) {
			if ( $event_category === $category ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Validates the action performed in an event.
	 *
	 * @param string $action The action performed in an event.
	 * @return boolean
	 */
	public static function validate_action( $action ) {
		$valid_actions = Events::get_valid_actions();
		if ( ! isset( $valid_actions[ $action ] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Sanitizes and validates the action and category parameters of an event.
	 *
	 * @param array $event The event to sanitize and validate.
	 * @return array|boolean
	 */
	public static function validate( $event ) {
		if ( ! isset( $event['action'] ) || ! self::validate_action( $event['action'] ) ) {
			return false;
		}

		if ( ! isset( $event['category'] ) || ! self::validate_category( $event['category'] ) ) {
			return false;
		}

		return $event;
	}
}
