<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

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

		// Add timestamp and ttl to specific events
		$event = self::add_timestamp_and_ttl( $event );

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

	/**
	 * Adds timestamp and ttl properties to specific events (onboarding_started and onboarding_complete).
	 *
	 * @param array $event The event to enhance.
	 * @return array The enhanced event.
	 */
	private static function add_timestamp_and_ttl( $event ) {
		$current_time = time();

		switch ( $event['action'] ) {
			case 'onboarding_started':
				// Add timestamp to onboarding_started event
				$event['data']['timestamp'] = $current_time;
				break;

			case 'onboarding_complete':
				// Add timestamp and ttl to onboarding_complete event
				$event['data']['timestamp'] = $current_time;

				// Use the same completion time that was stored in handle_completed()
				$completion_time = get_option( Options::get_option_name( 'completed_time' ) );
				$start_time = get_option( Options::get_option_name( 'start_time' ) );

				if ( $start_time ) {
					if ( $completion_time ) {
						// Use stored completion time
						$ttl_seconds = $completion_time - $start_time;
					} else {
						// Fallback to current time if completion_time not found
						$ttl_seconds = $current_time - $start_time;
					}

					if ( $ttl_seconds >= 0 ) {
						$event['data']['ttl'] = $ttl_seconds;
					}
				}
				break;
		}

		return $event;
	}
}
