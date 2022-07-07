export const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
export const runtimeDataExists =
	'object' === typeof window?.nfdOnboarding && 'url' in window.nfdOnboarding;
export const apiBase = '?rest_route=/newfold-onboarding/v1/';
export const NFD_ONBOARDING_EVENT_PREFIX = 'nfd-module-onboarding-event'
export const VIEW_NAV_PRIMARY = 'nav-primary';
export const VIEW_NAV_DESIGN = 'nav-design';
export const VIEW_NAV_PAGE = 'nav-page';
export const VIEW_DESIGN_THEMES = 'design-themes';
export const VIEW_DESIGN_THEME_STYLES = 'design-theme-styles';
export const VIEW_DESIGN_COLORS = 'design-colors';
export const VIEW_DESIGN_TYPOGRAPHY = 'design-typography';
export const VIEW_DESIGN_HEADER_MENU = 'design-header-menu';
export const VIEW_NAV_GET_STARTED = 'nav-get-started';
export const VIEW_START_SETUP_EXPERIENCE = 'start-setup-experience';

/**
 * All views for the <Drawer /> component.
 */
export const DRAWER_VIEWS = [
	VIEW_NAV_PRIMARY,
	VIEW_NAV_DESIGN,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_PAGE,
	VIEW_DESIGN_THEMES,
	VIEW_DESIGN_THEME_STYLES,
	VIEW_DESIGN_COLORS,
	VIEW_DESIGN_TYPOGRAPHY,
	VIEW_DESIGN_HEADER_MENU,
	VIEW_START_SETUP_EXPERIENCE,
];

/**
 * All Navigation views for the <Drawer /> component.
 */
export const DRAWER_NAV_VIEWS = [
	VIEW_NAV_PRIMARY,
	VIEW_NAV_DESIGN,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_PAGE,
];
