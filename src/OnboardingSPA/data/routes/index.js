import {
	routes as defaultInitialRoutes,
	steps as defaultInitialSteps,
	conditionalSteps as defaultInitialConditionalSteps,
	initialDesignSteps as defaultInitialDesignSteps,
	initialTopSteps as defaultInitialTopSteps,
	initialGetStartedSteps as defaultInitialGetStartedSteps,
} from './default-flow';

import {
	routes as ecommerceRoutes,
	steps as ecommerceSteps,
	initialTopSteps as ecommerceInitialTopSteps,
	ecommerceGetStartedSteps as ecommerceDefaultGetStartedSteps,
	ecommerceSteps as ecommerceInitialStoreInfoSteps,
} from './ecommerce-flow';

function getSelectedRoute() {
	return window.nfdOnboarding.currentFlow ?? 'wp-setup';
}

const routerMap = {
	'wp-setup': {
		routes: defaultInitialRoutes,
		steps: defaultInitialSteps,
		conditionalSteps: defaultInitialConditionalSteps,
		initialTopSteps: defaultInitialTopSteps,
		initialDesignSteps: defaultInitialDesignSteps,
		initialGetStartedSteps: defaultInitialGetStartedSteps,
	},
	ecommerce: {
		routes: ecommerceRoutes,
		steps: ecommerceSteps,
		conditionalSteps: defaultInitialConditionalSteps,
		initialTopSteps: ecommerceInitialTopSteps,
		initialDesignSteps: defaultInitialDesignSteps,
		initialGetStartedSteps: ecommerceDefaultGetStartedSteps,
		initialStoreInfoSteps: ecommerceInitialStoreInfoSteps,
	},
};

export const routes = [ ...routerMap[ getSelectedRoute() ].routes ];

export const steps = [ ...routerMap[ getSelectedRoute() ].steps ];

export const conditionalSteps =
	routerMap[ getSelectedRoute() ].conditionalSteps;

export const initialTopSteps = () => {
	return routerMap[ getSelectedRoute() ].initialTopSteps();
};

export const initialDesignSteps = () => {
	return routerMap[ getSelectedRoute() ].initialDesignSteps();
};

export const initialGetStartedSteps = () => {
	return routerMap[ getSelectedRoute() ].initialGetStartedSteps();
};

export const initialStoreInfoSteps = () => {
	return routerMap[ getSelectedRoute() ].initialStoreInfoSteps
		? routerMap[ getSelectedRoute() ].initialStoreInfoSteps
		: [];
};
