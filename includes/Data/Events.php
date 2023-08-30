<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains data related to Onboarding Hiive Events.
 */
final class Events {
	/**
	 * The category of an event.
	 *
	 * @var string
	 */
	protected static $category = 'wonder_start';

	/**
	 * List of valid actions that an event can perform.
	 *
	 * A value of true indicates that the action is valid, set it to null if you want to invalidate an action.
	 *
	 * @var array
	 */
	protected static $valid_actions = array(
		'pageview'                    => true,
		'onboarding_started'          => true,
		'onboarding_chapter_started'  => true,
		'onboarding_chapter_complete' => true,
		'onboarding_complete'         => true,
		'experience_level_set'        => true,
		'primary_type_set'            => true,
		'secondary_type_set'          => true,
		'theme_style_selected'        => true,
		'fonts_selected'              => true,
		'header_selected'             => true,
		'homepage_layout_selected'    => true,
		'onboarding_top_priority_set' => true,
		'onboarding_step_skipped'     => true,
		'onboarding_exited'           => true,
		'starter_pages_selected'      => true,
		'feature_added'               => true,
		'colors_selected'             => true,
		'logo_added'                  => true,
		'tagline_set'                 => true,
		'site_title_set'              => true,
		'social_added'                => true,
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
	 * Valid category of on event.
	 *
	 * @return string
	 */
	public static function get_category() {
		return self::$category;
	}
}
