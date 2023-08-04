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
		'pageview'                             => true,
		'onboarding_started'				   => true,
		'onboarding_exited'				       => true,
		'onboarding_complete'                  => true,
		'onboarding_step_skipped'              => true,
		'onboarding_top_priority_set'	       => true,
		'primary_type_set'                     => true,
		'secondary_type_set'                   => true,
		'experience_level_set'                 => true,
		'theme_style_selected'                 => true,
		'colors_selected'                      => true,
		'typography_selected'                  => true,
		'header_selected'                      => true,
		'homepage_layout_selected'             => true,

		'sidebar-opened'                       => true,
		'sidebar-closed'                       => true,
		'wp-experience'                        => true,
		'primary-type'                         => true,
		'secondary-type'                       => true,
		'tax-information'                      => true,
		'selected-style'                       => true,
		'default-style'                        => true,
		'customize-design'                     => true,
		'font-selection'                       => true,
		'theme-header'                         => true,
		'homepage-layout'                      => true,
		'top-priority'                         => true,
		'top-priority-skipped'                 => true,
		'exit-to-wordpress'                    => true,
		'products-info'                        => true,
		'yith-wonder/company-page-layout'      => true,
		'yith-wonder/contact-us-layout'        => true,
		'yith-wonder/blog-page-layout'         => true,
		'yith-wonder/testimonials-page-layout' => true,
		'site-features'                        => true,
		'color-selection'                      => true,
		'color-selection-reset'                => true,
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
