<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains data related to Onboarding Hiive Events.
 */
final class Events {
	/**
	 * The Array of categories in an event.
	 *
	 * @var array
	 */
	protected static $category = array( 'wonder_start', 'experiment' );

	/**
	 * List of valid actions that an event can perform.
	 *
	 * A value of true indicates that the action is valid, set it to null if you want to invalidate an action.
	 *
	 * @var array
	 */
	protected static $valid_actions = array(
		'pageview'                => true,
		'onboarding_started'      => true,
		'onboarding_complete'     => true,
		'onboarding_restarted'    => true,
		'primary_type_set'        => true,
		'secondary_type_set'      => true,
		'onboarding_exited'       => true,
		'fork_option_selected'    => true,
		'site_details_prompt_set' => true,
		'site_generation_time'    => true,
		'error_state_triggered'   => true,
		'migration_initiated'     => true,
		'mfe_migration_initiated' => true,
	);

	/**
	 * Returns the list of valid actions that an event can perform
	 *
	 * @return array
	 */
	public static function get_valid_actions() {
		return self::$valid_actions;
	}

	/**
	 * Valid categories of on event.
	 *
	 * @return array
	 */
	public static function get_category() {
		return self::$category;
	}
}
