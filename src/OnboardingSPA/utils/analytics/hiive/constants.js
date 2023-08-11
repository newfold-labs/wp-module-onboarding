export const ACTION_ONBOARDING_STARTED = 'onboarding_started';
export const ACTION_ONBOARDING_COMPLETE = 'onboarding_complete';
export const ACTION_PAGEVIEW = 'pageview';
export const ACTION_ONBOARDING_TOP_PRIORITY_SET = 'onboarding_top_priority_set';
export const ACTION_ONBOARDING_STEP_SKIPPED = 'onboarding_step_skipped';
export const ACTION_PRIMARY_TYPE_SET = 'primary_type_set';
export const ACTION_SECONDARY_TYPE_SET = 'secondary_type_set';
export const ACTION_EXPERIENCE_LEVEL_SET = 'experience_level_set';
export const ACTION_THEME_STYLE_SELECTED = 'theme_style_selected';
export const ACTION_COLORS_SELECTED = 'colors_selected';
export const ACTION_TYPOGRAPHY_SELECTED = 'typography_selected';
export const ACTION_HEADER_SELECTED = 'header_selected';
export const ACTION_HOMEPAGE_LAYOUT_SELECTED = 'homepage_layout_selected';
export const ACTION_STARTER_PAGES_SELECTED = 'starter_pages_selected';
export const ACTION_FEATURE_ADDED = 'feature_added';
export const ACTION_SITE_TITLE_SET = 'site_title_set';
export const ACTION_TAGLINE_SET = 'tagline_set';
export const ACTION_LOGO_ADDED = 'logo_added';
export const ACTION_ONBOARDING_EXITED = 'onboarding_exited';
export const ACTION_ONBOARDING_CHAPTER_STARTED = 'onboarding_chapter_started';
export const ACTION_ONBOARDING_CHAPTER_COMPLETE = 'onboarding_chapter_complete';
export const ACTION_SOCIAL_ADDED = 'social_added';
export const CATEGORY = 'wonder_start';

export const ACTION_TO_LABEL_KEY_MAP = {
	[ ACTION_ONBOARDING_TOP_PRIORITY_SET ]: 'top_priority',
	[ ACTION_ONBOARDING_STEP_SKIPPED ]: 'step',
	[ ACTION_PRIMARY_TYPE_SET ]: 'primary_type',
	[ ACTION_SECONDARY_TYPE_SET ]: 'secondary_type',
	[ ACTION_EXPERIENCE_LEVEL_SET ]: 'experience_level',
	[ ACTION_THEME_STYLE_SELECTED ]: 'theme_style',
	[ ACTION_COLORS_SELECTED ]: 'color_palette',
	[ ACTION_TYPOGRAPHY_SELECTED ]: 'font_set',
	[ ACTION_HEADER_SELECTED ]: 'header',
	[ ACTION_HOMEPAGE_LAYOUT_SELECTED ]: 'layout',
	[ ACTION_STARTER_PAGES_SELECTED ]: 'pages',
	[ ACTION_FEATURE_ADDED ]: 'feature',
	[ ACTION_SITE_TITLE_SET ]: 'title',
	[ ACTION_TAGLINE_SET ]: 'tagline',
	[ ACTION_ONBOARDING_EXITED ]: 'step',
	[ ACTION_ONBOARDING_CHAPTER_STARTED ]: 'chapter',
	[ ACTION_ONBOARDING_CHAPTER_COMPLETE ]: 'chapter',
	[ ACTION_SOCIAL_ADDED ]: 'platform',
};
