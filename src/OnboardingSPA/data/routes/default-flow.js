import { __, sprintf } from '@wordpress/i18n';
import { lazy } from '@wordpress/element';
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
} from '@wordpress/icons';
import {
	VIEW_DESIGN_COLORS,
	VIEW_DESIGN_HEADER_MENU,
	VIEW_DESIGN_HOMEPAGE_MENU,
	VIEW_DESIGN_THEMES,
	VIEW_DESIGN_THEME_STYLES_MENU,
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

const StepIndex = lazy( () => import( '../../pages/Steps/index' ) );
const StepGetStarted = lazy( () => import( '../../pages/Steps/GetStarted' ) );
const StepWelcome = lazy( () =>
	import( '../../pages/Steps/GetStarted/Welcome' )
);
const StepGetStartedExperience = lazy( () =>
	import( '../../pages/Steps/GetStarted/GetStartedExperience' )
);
const StepTopPriority = lazy( () => import( '../../pages/Steps/TopPriority' ) );
const StepBasicInfo = lazy( () => import( '../../pages/Steps/BasicInfo' ) );

const StepDesignThemes = lazy( () =>
	import( '../../pages/Steps/DesignThemes' )
);
const StepDesignThemeStylesMenu = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Menu' )
);
const StepDesignThemeStylesPreview = lazy( () =>
	import( '../../pages/Steps/DesignThemeStyles/Preview' )
);

const StepDesignColors = lazy( () =>
	import( '../../pages/Steps/DesignColors' )
);
const StepDesignTypography = lazy( () =>
	import( '../../pages/Steps/DesignTypography' )
);
const StepDesignHeaderMenu = lazy( () =>
	import( '../../pages/Steps/DesignHeaderMenu' )
);
const StepDesignHomepageMenu = lazy(() =>
	import('../../pages/Steps/DesignHomepageMenu')
);
const StepSitePages = lazy( () => import( '../../pages/Steps/SitePages' ) );
const StepSiteFeatures = lazy( () =>
	import( '../../pages/Steps/SiteFeatures' )
);
const StepWhatNext = lazy( () => import( '../../pages/Steps/WhatNext' ) );

const StepPrimarySetup = lazy( () =>
	import( '../../pages/Steps/GetStarted/SiteTypeSetup/PrimarySite' )
);
const StepSecondarySetup = lazy( () =>
	import( '../../pages/Steps/GetStarted/SiteTypeSetup/SecondarySite' )
);

const GetStartedLearnMoreHelp = lazy( () =>
	import( '../../pages/Steps/GetStarted/SidebarComponents/LearnMore/Help' )
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
		/* translators: %s: website or store */
		heading: sprintf(
			__( 'Make your %s dreams a reality!', 'wp-module-onboarding' ),
			translations( 'website' )
		),
		subheading: __( 'with WordPress and ', 'wp-module-onboarding' ),
		description: __(
			"We'll use this to personalize this onboarding and future recommendations",
			'wp-module-onboarding'
		),
		Component: StepWelcome,
		Icon: home,
		priority: 20,
		VIEW: VIEW_NAV_GET_STARTED,
		SidebarComponents: {
			LearnMore: [ GetStartedLearnMoreHelp ],
		},
	},
	{
		path: '/wp-setup/step/get-started/experience',
		title: __( 'WordPress Experience', 'wp-module-onboarding' ),
		/* translators: %s: website or store */
		heading: sprintf(
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		subheading: __(
			'What is your experience with WordPress?',
			'wp-module-onboarding'
		),
		description: __(
			"We'll use this to personalize this onboarding and future recommendations",
			'wp-module-onboarding'
		),
		Component: StepGetStartedExperience,
		Icon: home,
		priority: 40,
		VIEW: VIEW_NAV_GET_STARTED,
		SidebarComponents: {
			LearnMore: [ GetStartedLearnMoreHelp ],
		},
	},
	{
		path: '/wp-setup/step/get-started/site-primary',
		/* translators: %s: website or store */
		title: sprintf(
			__( 'Primary %s Setup', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		/* translators: %s: website or store */
		heading: sprintf(
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		/* translators: %s: website or store */
		subheading: sprintf(
			__( 'What type of %s is it?', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		/* translators: %s: website or store */
		description: sprintf(
			__(
				"Setup more of your %s, show you around WordPress or share secrets to success -- we'll follow your lead on how you'd like to proceed.",
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		Component: StepPrimarySetup,
		Icon: moveTo,
		priority: 60,
	},
	{
		path: '/wp-setup/step/get-started/site-secondary',
		/* translators: %s: website or store */
		title: sprintf(
			__( 'Secondary %s Setup', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		/* translators: %s: website or store */
		heading: sprintf(
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		/* translators: %s: website or store */
		subheading: sprintf(
			__( 'What type of %s is it?', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		/* translators: %s: website or store */
		description: sprintf(
			__(
				"Setup more of your %s, show you around WordPress or share secrets to success -- we'll follow your lead on how you'd like to proceed.",
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		Component: StepSecondarySetup,
		Icon: moveTo,
		priority: 80,
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
		/* translators: %s: website or store */
		heading: sprintf(
			__( 'Introduce us to this %s', 'wp-module-onboarding' ),
			translations( 'website' )
		),
		subheading: __(
			'So we can introduce it to the web',
			'wp-module-onboarding'
		),
		/* translators: %s: website or store */
		description: sprintf(
			__(
				'Help visitors, search results and social media identify your %s.',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		Component: StepBasicInfo,
		Icon: info,
		priority: 120,
	},
	{
		path: '/wp-setup/step/design/themes',
		title: __( 'Themes', 'wp-module-onboarding' ),
		heading: __( "Let's make you look your best", 'wp-module-onboarding' ),
		subheading: __(
			'Find a WordPress Theme to present polished and compelling.',
			'wp-module-onboarding'
		),
		description: __(
			'Your Theme is the starting place for layout and design, setting the tone for your site. Keep it for years or change and swap as you grow.',
			'wp-module-onboarding'
		),
		Component: StepDesignThemes,
		Icon: brush,
		priority: 140,
		VIEW: VIEW_DESIGN_THEMES,
	},
	{
		path: '/wp-setup/step/design/theme-styles/menu',
		title: __( 'Theme Styles', 'wp-module-onboarding' ),
		heading: __(
			'Lets tailor your theme for the perfect fit',
			'wp-module-onboarding'
		),
		subheading: __(
			"Use these styles or bring your own. You're always free to remix them.",
			'wp-module-onboarding'
		),
		description: __(
			'All these styles -- plus the ability to customize them -- are available in the WordPress Site Editor',
			'wp-module-onboarding'
		),
		Component: StepDesignThemeStylesMenu,
		Icon: styles,
		priority: 160,
		VIEW: VIEW_DESIGN_THEME_STYLES_MENU,
		patternId: 'theme-styles',
	},
	{
		path: '/wp-setup/step/design/theme-styles/preview',
		title: __( 'Theme Styles', 'wp-module-onboarding' ),
		heading: __(
			'Lets tailor your theme for the perfect fit',
			'wp-module-onboarding'
		),
		subheading: __(
			"Use these styles or bring your own. You're always free to remix them.",
			'wp-module-onboarding'
		),
		description: __(
			'All these styles -- plus the ability to customize them -- are available in the WordPress Site Editor',
			'wp-module-onboarding'
		),
		Component: StepDesignThemeStylesPreview,
		Icon: styles,
		priority: 170,
		VIEW: VIEW_DESIGN_THEME_STYLES_PREVIEW,
		patternId: 'theme-styles',
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
	},
	{
		path: '/wp-setup/step/design/homepage-menu',
		title: __('HomePages Wizard', 'wp-module-onboarding'),
		heading: __(
			"There’s no place like a great home page",
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
		Icon: header,
		priority: 240,
		VIEW: VIEW_DESIGN_HOMEPAGE_MENU,
		patternId: 'homepage-styles',
	},
	{
		path: '/wp-setup/step/site-pages',
		title: __( 'Pages', 'wp-module-onboarding' ),
		heading: __( "We've got some page ideas", 'wp-module-onboarding' ),
		subheading: __(
			'Start closer to the finish line than a blank canvas.',
			'wp-module-onboarding'
		),
		description: __(
			"Pick a page, pick a layout and we'll focus on the basics so you focus on what's important and unique.",
			'wp-module-onboarding'
		),
		Component: StepSitePages,
		Icon: copy,
		priority: 260,
	},
	{
		path: '/wp-setup/step/site-features',
		title: __( 'Features', 'wp-module-onboarding' ),
		heading: __( 'Our toolbox is your toolbox', 'wp-module-onboarding' ),
		subheading: __(
			"We've learned a lot in 16 years of WordPress! Now that expertise is yours.",
			'wp-module-onboarding'
		),
		description: __(
			"Through Plugins, partners and unique $BRAND WordPress features, you've got tons of capabilities with $SITE.",
			'wp-module-onboarding'
		),
		Component: StepSiteFeatures,
		Icon: plugins,
		priority: 280,
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
	},
};

/**
 * Top-level registration of all routes.
 */
export const routes = [ ...pages, ...steps ];

/**
 * Filter-out the design steps and register a fake step in their place.
 *
 * @return
 */
export const initialTopSteps = () => {
	const topSteps = filter( steps, ( step ) => {
		return (
			! step.path.includes( '/step/get-started' ) &&
			! step.path.includes( '/step/design' )
		);
	} );

	const designStep = {
		/* This is a fake step to stand-in for all Design steps and does not have a Component to render */
		path: '/wp-setup/step/design/themes',
		title: __( 'Design', 'wp-module-onboarding' ),
		description: '',
		Icon: brush,
		VIEW: VIEW_NAV_DESIGN,
		priority: 140 /* matches priority for first design step */,
	};

	const getStartedStep = {
		path: '/wp-setup/step/get-started/welcome',
		title: __( 'Get Started', 'wp-module-onboarding' ),
		heading: __( 'Get Started', 'wp-module-onboarding' ),
		Icon: home,
		VIEW: VIEW_NAV_GET_STARTED,
		priority: 20,
	};

	topSteps.push( designStep );
	topSteps.push( getStartedStep );

	return orderBy( topSteps, [ 'priority' ], [ 'asc' ] );
};

/**
 * Filter out all non-design steps.
 *
 * @return
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
