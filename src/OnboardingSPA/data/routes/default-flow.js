import { __, sprintf } from '@wordpress/i18n';
import { lazy } from '@wordpress/element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { filter, orderBy } from 'lodash';
import IndexPage from '../../pages/index';
import { translations } from '../../utils/locales/translations';
import {
	home,
	copy,
	info,
	plugins,
	styles,
	navigation,
	brush,
	color,
	typography,
	header,
	moveTo,
	redo,
	post,
	pages as pagesIcon,
} from '@wordpress/icons';
import {
	VIEW_DESIGN_COLORS,
	VIEW_DESIGN_HEADER_MENU,
	VIEW_DESIGN_THEME_STYLES_PREVIEW,
	VIEW_DESIGN_TYPOGRAPHY,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_DESIGN,
} from '../../../constants';

/**
 * This application has two types of routes: pages and steps.
 *
 * Pages are intended to exist outside the onboarding.
 *
 * Steps are the stages of the onboarding flow, expressed via numerical priority.
 * Steps increment by 10, allowing ample room for new steps to insert between.
 */

const ErrorPage = lazy( () => import( '../../pages/ErrorPage' ) );
const PageResources = lazy( () => import( '../../pages/Resources' ) );
const PageWhatToExpect = lazy( () => import( '../../pages/WhatToExpect' ) );

const StepGetStartedWelcome = lazy( () =>
	import( '../../pages/Steps/GetStarted/Welcome' )
);
const StepGetStartedWelcomeLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/GetStarted/Welcome/Sidebar/LearnMore' )
);

const StepGetStartedExperience = lazy( () =>
	import( '../../pages/Steps/GetStarted/GetStartedExperience' )
);
const StepGetStartedExperienceLearnMoreSidebar = lazy( () =>
	import(
		'../../pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore'
	)
);

const StepGetStartedPrimarySetup = lazy( () =>
	import( '../../pages/Steps/GetStarted/SiteTypeSetup/PrimarySite' )
);
const StepGetStartedPrimarySetupLearnMoreSidebar = lazy( () =>
	import(
		'../../pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/Sidebar/LearnMore/index'
	)
);

const StepGetStartedSecondarySetup = lazy( () =>
	import( '../../pages/Steps/GetStarted/SiteTypeSetup/SecondarySite' )
);
const StepGetStartedSecondarySetupLearnMoreSidebar = lazy( () =>
	import(
		'../../pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/Sidebar/LearnMore/index'
	)
);

const StepTopPriority = lazy( () => import( '../../pages/Steps/TopPriority' ) );

const StepBasicInfo = lazy( () => import( '../../pages/Steps/BasicInfo' ) );
const StepBasicInfoLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/BasicInfo/Sidebar/LearnMore' )
);

const StepDesignThemeStylesMenu = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Menu' )
);
const StepDesignThemeStylesMenuLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Menu/Sidebar/LearnMore' )
);

const StepDesignThemeStylesPreview = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Preview' )
);
const StepDesignThemeStylesPreviewLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Preview/Sidebar/LearnMore' )
);

const StepDesignColors = lazy( () =>
	import( '../../pages/Steps/DesignColors' )
);
const StepDesignColorsLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignColors/Sidebar/LearnMore' )
);

const StepDesignTypography = lazy( () =>
	import( '../../pages/Steps/DesignTypography' )
);
const StepDesignTypographyLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignTypography/Sidebar/LearnMore' )
);

const StepDesignHeaderMenu = lazy( () =>
	import( '../../pages/Steps/DesignHeaderMenu' )
);
const StepDesignHeaderMenuLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignHeaderMenu/Sidebar/LearnMore' )
);

const StepDesignHomepageMenu = lazy( () =>
	import( '../../pages/Steps/DesignHomepageMenu' )
);
const StepDesignHomepageMenuLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/DesignHomepageMenu/Sidebar/LearnMore' )
);

const StepSitePages = lazy( () => import( '../../pages/Steps/SitePages' ) );
const StepSitePagesLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/SitePages/Sidebar/LearnMore' )
);

const StepSiteFeatures = lazy( () =>
	import( '../../pages/Steps/SiteFeatures' )
);
const StepSiteFeaturesLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/SiteFeatures/Sidebar/LearnMore' )
);

const StepComplete = lazy( () => import( '../../pages/Steps/Complete' ) );

const StepWhatNext = lazy( () => import( '../../pages/Steps/WhatNext' ) );
const StepWhatNextLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/WhatNext/Sidebar/LearnMore' )
);

/**
 * All information pages should be prefixed with `/page`.
 *
 * All redirect sub-routes like `/` and `/step` and `/design` are exceptions.
 */
export const pages = [
	{
		path: '/',
		title: '',
		description: '',
		Component: IndexPage,
		Icon: <></>,
	},
	{
		path: '/page/resources',
		title: __( 'Resources', 'wp-module-onboarding' ),
		description: '',
		Component: PageResources,
		Icon: post,
	},
	{
		path: '/page/what-to-expect',
		title: __( 'What to Expect', 'wp-module-onboarding' ),
		description: '',
		Component: PageWhatToExpect,
		Icon: redo,
	},
	{
		path: '*',
		title: __( 'Error 404', 'wp-module-onboarding' ),
		description: 'Please Check Again!',
		Component: ErrorPage,
		Icon: redo,
	},
];

/**
 * All steps are registered in this array.
 *
 * Priorities should increment by 20 to leave ample space in-between for injection.
 */
export const steps = [
	{
		path: '/wp-setup/step/get-started/welcome',
		title: __( 'Welcome', 'wp-module-onboarding' ),
		description: __(
			"We'll use this to personalize this onboarding and future recommendations",
			'wp-module-onboarding'
		),
		Component: StepGetStartedWelcome,
		Icon: home,
		priority: 20,
		VIEW: VIEW_NAV_GET_STARTED,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepGetStartedWelcomeLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/get-started/experience',
		title: __( 'WordPress Experience', 'wp-module-onboarding' ),
		description: __(
			"We'll use this to personalize this onboarding and future recommendations",
			'wp-module-onboarding'
		),
		Component: StepGetStartedExperience,
		Icon: home,
		priority: 40,
		VIEW: VIEW_NAV_GET_STARTED,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepGetStartedExperienceLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/get-started/site-primary',
		title: sprintf(
			/* translators: %s: website or store */
			__( 'Primary %s Setup', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		Component: StepGetStartedPrimarySetup,
		Icon: moveTo,
		priority: 60,
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					StepGetStartedPrimarySetupLearnMoreSidebar,
				],
			},
		},
	},
	{
		path: '/wp-setup/step/get-started/site-secondary',
		title: sprintf(
			/* translators: %s: website or store */
			__( 'Secondary %s Setup', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		Component: StepGetStartedSecondarySetup,
		Icon: moveTo,
		priority: 80,
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					StepGetStartedSecondarySetupLearnMoreSidebar,
				],
			},
		},
	},
	{
		path: '/wp-setup/step/top-priority',
		title: __( 'Top Priority', 'wp-module-onboarding' ),
		heading: __( 'Tell us your top priority', 'wp-module-onboarding' ),
		subheading: __(
			"We'll prioritize getting you there.",
			'wp-module-onboarding'
		),
		description: __(
			"We'll recommend design choices, site options and products and features we have to offer.",
			'wp-module-onboarding'
		),
		Component: StepTopPriority,
		Icon: navigation,
		priority: 100,
	},
	{
		path: '/wp-setup/step/basic-info',
		title: __( 'Basic Info', 'wp-module-onboarding' ),
		heading: sprintf(
			/* translators: %s: website or store */
			__( 'Introduce us to this %s', 'wp-module-onboarding' ),
			translations( 'website' )
		),
		subheading: __(
			'So we can introduce it to the web',
			'wp-module-onboarding'
		),
		description: sprintf(
			/* translators: %s: website or store */
			__(
				'Help visitors, search results and social media identify your %s.',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		Component: StepBasicInfo,
		Icon: info,
		priority: 120,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepBasicInfoLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/design/theme-styles/menu',
		title: __( 'Theme Styles', 'wp-module-onboarding' ),
		Component: StepDesignThemeStylesMenu,
		Icon: styles,
		priority: 160,
		designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
		VIEW: VIEW_NAV_DESIGN,
		patternId: 'theme-styles',
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					StepDesignThemeStylesMenuLearnMoreSidebar,
				],
			},
		},
	},
	{
		path: '/wp-setup/step/design/theme-styles/preview',
		title: __( 'Theme Styles', 'wp-module-onboarding' ),
		Component: StepDesignThemeStylesPreview,
		Icon: styles,
		priority: 170,
		VIEW: VIEW_DESIGN_THEME_STYLES_PREVIEW,
		designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
		patternId: 'theme-styles',
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					StepDesignThemeStylesPreviewLearnMoreSidebar,
				],
			},
		},
	},
	{
		path: '/wp-setup/step/design/header-menu',
		title: __( 'Header & Menu', 'wp-module-onboarding' ),
		heading: __(
			"Let's make the right things visible",
			'wp-module-onboarding'
		),
		subheading: __(
			'Your site header helps organize your story for visitors.',
			'wp-module-onboarding'
		),
		description: __(
			'A well-organized site makes visitors feel smart, helping you keep and convert them.',
			'wp-module-onboarding'
		),
		Component: StepDesignHeaderMenu,
		Icon: header,
		priority: 220,
		VIEW: VIEW_DESIGN_HEADER_MENU,
		patternId: 'header-menu',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepDesignHeaderMenuLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/design/homepage-menu',
		title: __( 'Homepage Layouts', 'wp-module-onboarding' ),
		heading: __(
			'There’s no place like a great home page',
			'wp-module-onboarding'
		),
		subheading: __(
			'Pick a starter layout you can refine and remix with your content',
			'wp-module-onboarding'
		),
		description: __(
			'A well-organized homepage makes visitors feel smart.',
			'wp-module-onboarding'
		),
		Component: StepDesignHomepageMenu,
		Icon: pagesIcon,
		priority: 240,
		VIEW: VIEW_NAV_DESIGN,
		patternId: 'homepage-styles',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepDesignHomepageMenuLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/design/site-pages',
		title: __( 'Page Layouts', 'wp-module-onboarding' ),
		heading: __(
			'You have ideas, we have page templates',
			'wp-module-onboarding'
		),
		subheading: __(
			'Begin closer to the finish line than a blank canvas.',
			'wp-module-onboarding'
		),
		description: __(
			"Pick a page, pick a layout and we'll focus on the basics so you focus on what's important and unique.",
			'wp-module-onboarding'
		),
		Component: StepSitePages,
		Icon: copy,
		priority: 260,
		patternId: 'site-pages',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepSitePagesLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/site-features',
		title: __( 'Features', 'wp-module-onboarding' ),
		heading: __(
			'Key features to supercharge your site',
			'wp-module-onboarding'
		),
		subheading: __(
			'Our toolbox of Plugins & Services is your toolbox.',
			'wp-module-onboarding'
		),
		description: __(
			"Through Plugins, partners and unique $BRAND WordPress features, you've got tons of capabilities with $SITE.",
			'wp-module-onboarding'
		),
		Component: StepSiteFeatures,
		Icon: plugins,
		priority: 280,
		patternId: 'site-features',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepSiteFeaturesLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/wp-setup/step/complete',
		Component: StepComplete,
		priority: 285,
	},
	{
		path: '/wp-setup/step/what-next',
		title: __( 'What Next', 'wp-module-onboarding' ),
		heading: __( 'How else can we help?', 'wp-module-onboarding' ),
		subheading: __(
			"We've got the basics setup, but we can help with any next steps.",
			'wp-module-onboarding'
		),
		description: __(
			"Setup more of your site, show you around WordPress or share secrets to success -- we'll follow your lead on how you'd like to proceed.",
			'wp-module-onboarding'
		),
		Component: StepWhatNext,
		Icon: moveTo,
		priority: 300,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepWhatNextLearnMoreSidebar ],
			},
		},
	},
];

export const conditionalSteps = {
	designColors: {
		path: '/wp-setup/step/design/colors',
		title: __( 'Colors', 'wp-module-onboarding' ),
		heading: __( "What's your color palette?", 'wp-module-onboarding' ),
		subheading: __(
			"We'll paint everything with your colors for a fresh, crisp look.",
			'wp-module-onboarding'
		),
		description: __(
			'Strong contrast and clear readability help your words jump off the screen.',
			'wp-module-onboarding'
		),
		Component: StepDesignColors,
		Icon: color,
		priority: 180,
		VIEW: VIEW_DESIGN_COLORS,
		patternId: 'theme-styles',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepDesignColorsLearnMoreSidebar ],
			},
		},
	},
	designTypography: {
		path: '/wp-setup/step/design/typography',
		title: __( 'Typography', 'wp-module-onboarding' ),
		heading: __( "What's your font style?", 'wp-module-onboarding' ),
		subheading: __(
			'Impress your visitors with strong branding and aesthetics.',
			'wp-module-onboarding'
		),
		description: __(
			"Good typography uses style and proportions to give your words identity and priority. What's your story? Your focus?",
			'wp-module-onboarding'
		),
		Component: StepDesignTypography,
		Icon: typography,
		priority: 200,
		VIEW: VIEW_DESIGN_TYPOGRAPHY,
		patternId: 'theme-styles',
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepDesignTypographyLearnMoreSidebar ],
			},
		},
	},
};

export const routes = [ ...pages, ...steps ];

/**
 * Filter-out the design steps and register a fake step in their place.
 *
 * @return {Array} steps
 */
export const initialTopSteps = () => {
	const topSteps = filter( steps, ( step ) => {
		return (
			! step.path.includes( '/step/get-started' ) &&
			! step.path.includes( '/step/design' ) &&
			! step.path.includes( '/step/complete' )
		);
	} );

	const designStep = {
		/* This is a fake step to stand-in for all Design steps and does not have a Component to render */
		path: '/wp-setup/step/design/theme-styles/menu',
		title: __( 'Design', 'wp-module-onboarding' ),
		description: '',
		Icon: brush,
		VIEW: VIEW_NAV_DESIGN,
		primaryDrawerActiveLinkIncludes: '/wp-setup/step/design/',
		priority: 140 /* matches priority for first design step */,
	};

	const getStartedStep = {
		path: '/wp-setup/step/get-started/welcome',
		title: __( 'Get Started', 'wp-module-onboarding' ),
		heading: __( 'Get Started', 'wp-module-onboarding' ),
		Icon: home,
		VIEW: VIEW_NAV_GET_STARTED,
		primaryDrawerActiveLinkIncludes: '/wp-setup/step/get-started/',
		priority: 20,
	};

	topSteps.push( designStep );
	topSteps.push( getStartedStep );

	return orderBy( topSteps, [ 'priority' ], [ 'asc' ] );
};

/**
 * Filter out all non-design steps.
 *
 * @return {Array} steps
 */
export const initialDesignSteps = () => {
	const designSteps = filter( steps, ( step ) => {
		return (
			step.path.includes( '/step/design/' ) &&
			! step.path.includes( '/theme-styles/preview' )
		);
	} );

	return designSteps;
};

export const initialGetStartedSteps = () => {
	const getStartedSteps = filter( steps, ( step ) => {
		return step.path.includes( '/step/get-started' );
	} );

	return getStartedSteps;
};
