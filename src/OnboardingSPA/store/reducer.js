import { combineReducers } from '@wordpress/data';

import {
	VIEW_NAV_PRIMARY,
	THEME_STATUS_INIT,
	PLUGIN_STATUS_INIT,
	ECOMMERCE_STEPS_PLUGIN,
	SIDEBAR_LEARN_MORE
} from '../../constants';

import {
	routes as initialRoutes,
	steps as initialSteps,
	initialDesignSteps,
	initialTopSteps,
	initialGetStartedSteps,
	initialStoreInfoSteps,
} from '../data/routes/index';
import { sidebars } from '../data/sidebars/index';

export function flow(
	state = {
		flow: 'wp-setup',
		steps: {
			routes: initialRoutes,
			allSteps: initialSteps,
			topSteps: initialTopSteps(),
			designSteps: initialDesignSteps(),
			getStartedSteps: initialGetStartedSteps(),
			storeInfoSteps: initialStoreInfoSteps(),
			currentStep: '/wp-setup/step/what-next',
		},
	},
	action
) {
	switch ( action.type ) {
		case 'SET_ACTIVE_STEP':
			return {
				...state,
				steps: {
					...state.steps,
					currentStep: action.path,
				},
			};
		case 'SET_ACTIVE_FLOW':
			return {
				...state,
				flow: action.flow,
			};
		case 'UPDATE_ROUTES':
			return {
				...state,
				steps: {
					...state.steps,
					routes: action.routes,
				},
			};
		case 'UPDATE_ALL_STEPS':
			return {
				...state,
				steps: {
					...state.steps,
					allSteps: action.allSteps,
				},
			};
		case 'UPDATE_DESIGN_STEPS':
			return {
				...state,
				steps: {
					...state.steps,
					designSteps: action.designSteps,
				},
			};
	}

	return state;
}

export function drawer(
	state = { isOpen: false, isSuppressed: false, view: VIEW_NAV_PRIMARY },
	action
) {
	switch ( action.type ) {
		case 'SET_DRAWER_OPENED':
			return {
				...state,
				isOpen: action.isOpen,
			};
		case 'SET_DRAWER_ACTIVE_VIEW':
			return {
				...state,
				view: action.view,
			};
		case 'SET_DRAWER_SUPPRESSED':
			return {
				...state,
				isSuppressed: action.isSuppressed,
				isOpen: action.isSuppressed ? false : state.isOpen,
			};
	}

	return state;
}
export function currentData( state = {}, action ) {
	switch ( action.type ) {
		case 'SET_CURRENT_DATA':
			return {
				...state,
				...action.currentData,
			};
	}

	return state;
}

export function sidebar(
	state = {
		isOpen: false,
		view: 'LearnMore',
		sidebars,
	},
	action
) {
	switch ( action.type ) {
		case 'SET_SIDEBAR_OPENED':
			return {
				...state,
				isOpen: action.isOpen,
			};
		case 'SET_SIDEBAR_ACTIVE_VIEW':
			return {
				...state,
				view: action.view,
			};
	}

	return state;
}

export function header(state = { isNavigationEnabled: true }, action) {
	switch (action.type) {
		case 'SET_HEADER_NAVIGATION_ENABLED':
			return {
				...state,
				isNavigationEnabled: action.isNavigationEnabled
			};
	}

	return state;
}

export function runtime( state = {}, action ) {
	switch ( action.type ) {
		case 'SET_RUNTIME':
			return {
				...state,
				...action.runtime,
			};
		case 'SET_PREVIEW_SETTINGS':
			return {
				...state,
				previewSettings: {
					...state.previewSettings,
					settings: action.previewSettings,
				},
			};
	}

	return state;
}

export function settings(
	state = {
		themeStatus: THEME_STATUS_INIT,
		pluginsStatus: { [ ECOMMERCE_STEPS_PLUGIN ]: PLUGIN_STATUS_INIT },
	},
	action
) {
	switch ( action.type ) {
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...action.settings,
			};
		case 'UPDATE_THEME_STATUS':
			return {
				...state,
				themeStatus: action.themeStatus,
			};
		case 'UPDATE_PLUGINS_STATUS':
			return {
				...state,
				pluginsStatus: action.pluginsStatus,
			};
	}

	return state;
}

export default combineReducers( {
	drawer,
	runtime,
	currentData,
	settings,
	flow,
	sidebar,
	header
} );
