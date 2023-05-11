<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * List of Onboarding events.
 */
final class Events {

	 /**
	 * Contains a list of events with the key being the event slug.
	 *
	 * @var array
	 */
	protected static $events = array(
		'nfd-module-onboarding-event-pageview' => array(
			'category' => 'Admin',
			'action'   => 'pageview',
		),
	);

	/**
	 * Retrieves the active theme color variations.
	 *
	 * @param array $event Event data.
	 * @return array|boolean
	 */
	public static function get_event( $event_slug ) {
		 return self::$events[ $event_slug ] ? self::$events[ $event_slug ] : false;
	}
}
