export const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
export const runtimeDataExists =
	'object' === typeof window?.nfdOnboarding && 'url' in window.nfdOnboarding;
export const apiBase = '?rest_route=/newfold-onboarding/v1/';
export const NFD_ONBOARDING_EVENT_PREFIX = 'nfd-module-onboarding-event';
export const VIEW_NAV_PRIMARY = 'nav-primary';
export const VIEW_NAV_DESIGN = 'nav-design';
export const VIEW_NAV_PAGE = 'nav-page';
export const VIEW_DESIGN_THEMES = 'design-themes';
export const VIEW_DESIGN_THEME_STYLES = 'design-theme-styles';
export const VIEW_DESIGN_COLORS = 'design-colors';
export const VIEW_DESIGN_TYPOGRAPHY = 'design-typography';
export const VIEW_DESIGN_HEADER_MENU = 'design-header-menu';
export const VIEW_NAV_GET_STARTED = 'nav-get-started';
export const VIEW_NAV_ECOMMERCE_STORE_INFO = 'nav-ecommerce-store-info';
export const SIDEBAR_SLOTFILL_PREFIX = 'Sidebar';
export const SIDEBAR_MENU_SLOTFILL_PREFIX = 'HeaderMenu';
export const SIDEBAR_LEARN_MORE = 'LearnMore';

export const YITH_SHIPPO_PLUGIN = 'yith_shippo_shipping_for_woocommerce';
export const YITH_BOOKING_PLUGIN = 'yith_wcbk_panel';
export const YITH_SEARCH_PLUGIN = 'yith_wcas_panel';
export const YITH_PRODUCT_FILTER_PLUGIN = 'yith_wcan_panel';

export const MAX_RETRIES_SETTINGS_INIT = 2;

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
	VIEW_DESIGN_THEME_STYLES,
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
