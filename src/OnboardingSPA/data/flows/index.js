import { DEFAULT_FLOW, ECOMMERCE_FLOW } from './constants';
import {
	getRoutes as defaultGetRoutes,
	getSteps as defaultGetSteps,
	getTopSteps as defaultGetTopSteps,
	initialChapters as defaultInitialChapters,
	getData as defaultGetData,
	getDesignRoutes as defaultGetDesignRoutes,
} from './default';

import {
	getRoutes as ecommerceGetRoutes,
	getSteps as ecommerceGetSteps,
	getTopSteps as ecommerceGetTopSteps,
	initialChapters as ecommerceInitialChapters,
	getData as ecommerceGetData,
} from './ecommerce';

export const getCurrentFlow = () => {
	return window.nfdOnboarding.currentFlow ?? DEFAULT_FLOW;
};

const routerMap = {
	[ DEFAULT_FLOW ]: {
		getRoutes: defaultGetRoutes,
		getSteps: defaultGetSteps,
		getTopSteps: defaultGetTopSteps,
		chapters: defaultInitialChapters,
		getData: defaultGetData,
		getDesignRoutes: defaultGetDesignRoutes,
	},
	[ ECOMMERCE_FLOW ]: {
		getRoutes: ecommerceGetRoutes,
		getSteps: ecommerceGetSteps,
		getTopSteps: ecommerceGetTopSteps,
		chapters: ecommerceInitialChapters,
		getData: ecommerceGetData,
		getDesignRoutes: defaultGetDesignRoutes,
	},
};

export const initialRoutes = routerMap[ getCurrentFlow() ].getRoutes();

export const initialSteps = routerMap[ getCurrentFlow() ].getSteps();

export const initialTopSteps =
	routerMap[ getCurrentFlow() ].getTopSteps( initialSteps );

export const initialDesignRoutes =
	routerMap[ getCurrentFlow() ].getDesignRoutes( initialRoutes );

export const getInitialChapters = ( flow ) => {
	return routerMap[ flow ].chapters;
};

export const getRoutes = routerMap[ getCurrentFlow() ].getRoutes;

export const getSteps = routerMap[ getCurrentFlow() ].getSteps;

export const getTopSteps = routerMap[ getCurrentFlow() ].getTopSteps;

export const resolveGetDataForFlow = ( flow ) => {
	flow = flow ? flow : getCurrentFlow();
	return routerMap[ flow ].getData;
};

export const getDesignRoutes = routerMap[ getCurrentFlow() ].getDesignRoutes;
