import { __ } from '@wordpress/i18n';
import { store, institution, shipping } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';

import {
	pages as defaultInitialPages,
	steps as defaultInitialSteps,
	initialTopSteps as defaultInitialTopSteps,
	initialGetStartedSteps as defaultInitialGetStartedSteps,
} from './default-flow';

const StepAddress = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepAddress' )
);
const StepAddressLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepAddress/Sidebar/LearnMore/' )
);

const StepTax = lazy( () => import( '../../pages/Steps/Ecommerce/StepTax' ) );
const StepTaxLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepTax/Sidebar/LearnMore/' )
);

const StepProducts = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepProducts' )
);
const StepProductsLearnMoreSidebar = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepProducts/Sidebar/LearnMore' )
);

import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../constants';

export const ecommerceSteps = [
	{
		path: '/ecommerce/step/address',
		title: __( 'Street Address', 'wp-module-onboarding' ),
		heading: __( 'Street Address', 'wp-module-onboarding' ),
		subheading: __(
			'In this step you confirm the business address of your store. Simply confirm the one you provided during your initial Bluehost account setup or provide a new one.',
			'wp-module-onboarding'
		),
		description: __(
			'In this step you confirm the business address of your store. Simply confirm the one you provided during your initial Bluehost account setup or provide a new one.',
			'wp-module-onboarding'
		),
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
	{
		path: '/ecommerce/step/tax',
		title: __( 'Tax Info', 'wp-module-onboarding' ),
		heading: __( 'Tax Info', 'wp-module-onboarding' ),
		subheading: __(
			'Taxes can be configure at anytime in the WooCommerce Settings tab.',
			'wp-module-onboarding'
		),
		description: __(
			'Taxes can be configured at anytime in the WooCommerce Settings tab.',
			'wp-module-onboarding'
		),
		Component: StepTax,
		Icon: institution,
		priority: 90,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ StepTaxLearnMoreSidebar ],
			},
		},
	},
	{
		path: '/ecommerce/step/products',
		title: __( 'Product Info', 'wp-module-onboarding' ),
		heading: __( 'Product Info', 'wp-module-onboarding' ),
		subheading: __(
			'Hello, add a subheading for the learn more sidebar.',
			'wp-module-onboarding'
		),
		description: __(
			"In this section, you can provide more information about your products and business, which will help us tailor your store setup experience and identify possible extensions you'll need for your online store.",
			'wp-module-onboarding'
		),
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
			( step ) =>
				! step.path.includes( '/step/top-priority' ) &&
				! step.path.includes( '/step/get-started/site-primary' )
		),
		...ecommerceSteps,
	],
	[ 'priority' ],
	[ 'asc' ]
);

export const routes = orderBy(
	[ ...steps, ...defaultInitialPages ],
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
		description: '',
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
