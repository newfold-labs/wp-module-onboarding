import { __ } from '@wordpress/i18n';
import { store, shipping } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';

import {
	pages as defaultInitialPages,
	steps as defaultInitialSteps,
	conditionalSteps as defaultConditionalSteps,
	initialTopSteps as defaultInitialTopSteps,
	initialGetStartedSteps as defaultInitialGetStartedSteps,
} from './default-flow';

const StepAddress = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepAddress' )
);
const StepAddressLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepAddress/Sidebar/LearnMore/' )
);

// const StepTax = lazy( () => import( '../../pages/Steps/Ecommerce/StepTax' ) );
// const StepTaxLearnMoreSidebar = lazy( () =>
// 	import( '../../pages/Steps/Ecommerce/StepTax/Sidebar/LearnMore/' )
// );

const StepProducts = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepProducts' )
);
const StepProductsLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepProducts/Sidebar/LearnMore' )
);

import {
	CHAPTER_COMMERCE,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
} from '../../../constants';

export const ecommerceSteps = [
	{
		path: '/ecommerce/step/address',
		title: __( 'Street Address', 'wp-module-onboarding' ),
		chapter: CHAPTER_COMMERCE,
		tooltipText: __( 'Street Address', 'wp-module-onboarding' ),
		Component: StepAddress,
		Icon: store,
		priority: 85,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepAddressLearnMoreSidebar ],
			},
		},
	},
	// {
	// 	path: '/ecommerce/step/tax',
	// 	title: __( 'Tax Info', 'wp-module-onboarding' ),
	// 	tooltipText: __( 'Tax Info', 'wp-module-onboarding' ),
	// 	Component: StepTax,
	// 	Icon: institution,
	// 	priority: 90,
	// 	VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
	// 	sidebars: {
	// 		LearnMore: {
	// 			SidebarComponents: [ StepTaxLearnMoreSidebar ],
	// 		},
	// 	},
	// },
	{
		path: '/ecommerce/step/products',
		title: __( 'Product Info', 'wp-module-onboarding' ),
		chapter: CHAPTER_COMMERCE,
		tooltipText: __( 'Product Info', 'wp-module-onboarding' ),
		Component: StepProducts,
		Icon: shipping,
		priority: 95,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepProductsLearnMoreSidebar ],
			},
		},
	},
];

export const steps = orderBy(
	[
		...filter(
			defaultInitialSteps,
			( step ) => ! step.path.includes( '/step/top-priority' )
		),
		...ecommerceSteps,
	],
	[ 'priority' ],
	[ 'asc' ]
);

export const routes = orderBy(
	[ ...steps, ...defaultConditionalSteps, ...defaultInitialPages ],
	[ 'priority' ],
	[ 'asc' ]
);

export const initialTopSteps = () => {
	const topSteps = filter( ecommerceSteps, ( step ) => {
		return ! step.path.includes( '/ecommerce/step' );
	} );

	const ecommerceStep = {
		/* This is a pseudo step to stand-in for all StoreInfo steps and does not have a Component to render */
		path: '/ecommerce/step/address',
		title: __( 'Store Info', 'wp-module-onboarding' ),
		tooltipText: __( 'Street Address', 'wp-module-onboarding' ),
		chapter: CHAPTER_COMMERCE,
		Icon: store,
		primaryDrawerActiveLinkIncludes: '/ecommerce/step/',
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
		priority: 41 /* matches priority for first store info step */,
	};

	topSteps.push( ecommerceStep );

	const filteredSteps = filter(
		defaultInitialTopSteps(),
		( step ) => ! step.path.includes( '/step/top-priority' )
	);

	return orderBy(
		[ ...filteredSteps, ...topSteps ],
		[ 'priority' ],
		[ 'asc' ]
	);
};

export const ecommerceGetStartedSteps = () => {
	return filter(
		defaultInitialGetStartedSteps(),
		( step ) => ! step.path.includes( '/step/get-started/site-primary' )
	);
};

export const getFirstEcommerceStep = () => {
	return ecommerceSteps[ 0 ];
};
