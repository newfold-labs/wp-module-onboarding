<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Class for handling analytics events.
 */
class EventService {

	/**
	 * Initialize event tracking hooks.
	 */
	public static function init() {
		// Hook into option updates to track events when data is saved to database
		add_action( 'updated_option', array( __CLASS__, 'handle_option_update' ), 10, 3 );
		add_action( 'added_option', array( __CLASS__, 'handle_option_update' ), 10, 3 );
	}

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
				$start_time      = get_option( Options::get_option_name( 'start_time' ) );

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

	/**
	 * Handle option updates and track relevant events.
	 *
	 * @param string $option The option name.
	 * @param mixed  $old_value The old option value for updated_option, or new value for added_option.
	 * @param mixed  $value The new option value (only for updated_option).
	 */
	public static function handle_option_update( $option, $old_value, $value = null ) {
		// Handle added_option hook (only 2 params: option name and value)
		if ( null === $value ) {
			$value     = $old_value;
			$old_value = null;
		}

		// Track primary and secondary types from site classification
		if ( self::is_site_classification_option( $option ) ) {
			self::track_site_classification( $option, $old_value, $value );
		}
	}

	/**
	 * Track site classification changes (primary/secondary types).
	 *
	 * @param string $option The option name.
	 * @param mixed  $old_value The old option value.
	 * @param mixed  $new_value The new option value.
	 */
	private static function track_site_classification( $option, $old_value, $new_value ) {
		if ( ! is_array( $new_value ) || $new_value === $old_value ) {
			return;
		}

		// Track primary type
		if ( self::is_primary_type_option( $option ) && isset( $new_value['value'] ) ) {
			self::send(
				array(
					'action'   => 'primary_type_set',
					'category' => 'wonder_start',
					'data'     => array(
						'primary_type' => $new_value['value'],
						'source'       => 'database_saved',
					),
				)
			);
		}

		// Track secondary type
		if ( self::is_secondary_type_option( $option ) && isset( $new_value['value'] ) ) {
			self::send(
				array(
					'action'   => 'secondary_type_set',
					'category' => 'wonder_start',
					'data'     => array(
						'secondary_type' => $new_value['value'],
						'source'         => 'database_saved',
					),
				)
			);
		}
	}

	/**
	 * Check if option is a site classification option.
	 *
	 * @param string $option The option name.
	 * @return bool
	 */
	private static function is_site_classification_option( $option ) {
		return self::is_primary_type_option( $option ) || self::is_secondary_type_option( $option );
	}

	/**
	 * Check if option is a primary type option.
	 *
	 * @param string $option The option name.
	 * @return bool
	 */
	private static function is_primary_type_option( $option ) {
		return strpos( $option, 'nfd_data_site_classification_primary' ) !== false;
	}

	/**
	 * Check if option is a secondary type option.
	 *
	 * @param string $option The option name.
	 * @return bool
	 */
	private static function is_secondary_type_option( $option ) {
		return strpos( $option, 'nfd_data_site_classification_secondary' ) !== false;
	}
}
