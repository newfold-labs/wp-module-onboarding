import { addQueryArgs } from '@wordpress/url';

export const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
export const runtimeDataExists =
	'object' === typeof window?.nfdOnboarding &&
	'buildUrl' in window.nfdOnboarding;
export const wpAdminUrl = window.nfdOnboarding.adminUrl;
export const wpSiteUrl = window.nfdOnboarding.siteUrl;
export const wpRestURL = window.nfdOnboarding.restUrl;
export const wpRestRoute = 'wp/v2';
export const onboardingRestRoute = 'newfold-onboarding/v1';
export const installerRestRoute = 'newfold-installer/v1';
export const wpRestBase = `${ wpRestURL }/${ wpRestRoute }`;
export const onboardingRestBase = `${ wpRestURL }/${ onboardingRestRoute }`;
export const installerRestBase = `${ wpRestURL }/${ installerRestRoute }`;
export const wpAdminPage = addQueryArgs(
	`${ wpAdminUrl }index.php`,
	window.nfdOnboarding.currentBrand?.dashboardRedirectParams
);
export const pluginDashboardPage =
	addQueryArgs(
		window.nfdOnboarding.currentBrand?.pluginDashboardPage,
		window.nfdOnboarding.currentBrand?.dashboardRedirectParams
	) ?? wpAdminPage;
export const NFD_ONBOARDING_EVENT_PREFIX = 'nfd-module-onboarding-event';
export const VIEW_NAV_PRIMARY = 'nav-primary';
export const VIEW_NAV_DESIGN = 'nav-design';
export const VIEW_NAV_PAGE = 'nav-page';
export const VIEW_DESIGN_THEMES = 'design-themes';
export const VIEW_DESIGN_THEME_STYLES_MENU = 'design-theme-styles-menu';
export const VIEW_DESIGN_THEME_STYLES_PREVIEW = 'design-theme-styles-preview';
export const VIEW_DESIGN_COLORS = 'design-colors';
export const VIEW_DESIGN_TYPOGRAPHY = 'design-typography';
export const VIEW_DESIGN_HEADER_MENU = 'design-header-menu';
export const VIEW_DESIGN_HOMEPAGE_MENU = 'design-homepage-menu';
export const VIEW_NAV_GET_STARTED = 'nav-get-started';
export const VIEW_NAV_ECOMMERCE_STORE_INFO = 'nav-ecommerce-store-info';
export const SIDEBAR_SLOTFILL_PREFIX = 'Sidebar';
export const SIDEBAR_MENU_SLOTFILL_PREFIX = 'HeaderMenu';
export const SIDEBAR_LEARN_MORE = 'LearnMore';

export const MAX_RETRIES_API_QUEUER = 2;
export const MAX_RETRIES_SETTINGS_INIT = 2;
export const MAX_RETRIES_FLOW_SWITCH = 2;
export const NFD_PLUGINS_QUERY_PARAM = 'nfd_plugins';
export const NFD_THEMES_QUERY_PARAM = 'nfd_themes';

// [TODO] Read the theme from flow data once we have the themes step.
export const DESIGN_STEPS_THEME = 'nfd_slug_yith_wonder';
export const THEME_STATUS_INIT = 'init';
export const THEME_STATUS_NOT_ACTIVE = 'inactive';
export const THEME_STATUS_INSTALLING = 'installing';
export const THEME_STATUS_ACTIVE = 'activated';
export const THEME_STATUS_FAILURE = 'failed';

export const CHAPTER_DEMOGRAPHIC = 'demographic';
export const CHAPTER_COMMERCE = 'commerce';
export const CHAPTER_DESIGN = 'design';
export const CHAPTER_LAYOUT_AND_CONTENT = 'layout_and_content';
export const CHAPTER_FEATURES = 'features';

/**
 * All views for the <Drawer /> component.
 */
export const DRAWER_VIEWS = [
	VIEW_NAV_PRIMARY,
	VIEW_NAV_DESIGN,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_PAGE,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
	VIEW_DESIGN_THEMES,
	VIEW_DESIGN_THEME_STYLES_MENU,
	VIEW_DESIGN_THEME_STYLES_PREVIEW,
	VIEW_DESIGN_COLORS,
	VIEW_DESIGN_TYPOGRAPHY,
	VIEW_DESIGN_HEADER_MENU,
];

/**
 * All Navigation views for the <Drawer /> component.
 */
export const DRAWER_NAV_VIEWS = [
	VIEW_NAV_PRIMARY,
	VIEW_NAV_DESIGN,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_PAGE,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
];

/**
 * All API Requests for Onboarding.
 */
export const API_REQUEST = {
	SET_FLOW: 'SET_FLOW',
	SET_GLOBAL_STYLES: 'SET_GLOBAL_STYLES',
};
