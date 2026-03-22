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
		'pageview'                       => true,
		'onboarding_started'             => true,
		'onboarding_chapter_started'     => true,
		'onboarding_chapter_complete'    => true,
		'onboarding_complete'            => true,
		'onboarding_restarted'           => true,
		'experience_level_set'           => true,
		'primary_type_set'               => true,
		'secondary_type_set'             => true,
		'theme_style_selected'           => true,
		'fonts_selected'                 => true,
		'header_selected'                => true,
		'homepage_layout_selected'       => true,
		'onboarding_top_priority_set'    => true,
		'onboarding_step_skipped'        => true,
		'onboarding_exited'              => true,
		'starter_pages_selected'         => true,
		'feature_added'                  => true,
		'colors_selected'                => true,
		'logo_added'                     => true,
		'tagline_set'                    => true,
		'site_title_set'                 => true,
		'social_added'                   => true,
		'fork_option_selected'           => true,
		'site_details_prompt_set'        => true,
		'social_connected'               => true,
		'homepage_selected'              => true,
		'homepage_regenerated'           => true,
		'homepage_favorited'             => true,
		'homepage_renamed'               => true,
		'sidebar_opened'                 => true,
		'social_connect_skipped'         => true,
		'logo_skipped'                   => true,
		'site_generation_time'           => true,
		'error_state_triggered'          => true,
		'migration_initiated'            => true,
		'mfe_migration_initiated'        => true,
		'exp_fork_diy_mar25'             => true,
		'site_type_set'                  => true,
		'blueprint_published'            => true,
		'logogen_generate'               => true,
		'logogen_generate_failed'        => true,
		'logogen_generate_more_6'        => true,
		'logogen_generate_more_9'        => true,
		'logogen_logo_selected'          => true,
		'logogen_survey'                 => true,
		'logogen_error_triggered'        => true,
		'exp_fork_push_to_publish_oct25' => true,
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
