import { combineReducers } from '@wordpress/data';

import { VIEW_NAV_PRIMARY, THEME_STATUS_INIT } from '../../constants';

import {
	routes as initialRoutes,
	steps as initialSteps,
	initialDesignSteps,
	initialTopSteps,
	initialGetStartedSteps,
	initialStoreInfoSteps,
} from '../data/routes/index';
import { sidebars } from '../data/sidebars/index';
import apiQueueExecutor from '../utils/api-queuer/api-queue-executor';

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
			currentStep: initialSteps[ 0 ].path,
		},
		chapter: undefined,
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
		case 'SET_ACTIVE_CHAPTER':
			return {
				...state,
				chapter: action.chapter,
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
export function data( state = {}, action ) {
	switch ( action.type ) {
		case 'SET_CURRENT_DATA':
			return {
				...state,
				flowData: {
					...action.flowData,
				},
			};
		case 'SET_SOCIAL_DATA':
			return {
				...state,
				socialData: {
					...action.socialData,
				},
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

export function header(
	state = { isNavigationEnabled: true, menu: '' },
	action
) {
	switch ( action.type ) {
		case 'SET_HEADER_NAVIGATION_ENABLED':
			return {
				...state,
				isNavigationEnabled: action.isNavigationEnabled,
			};
		case 'UPDATE_HEADER_MENU_DATA':
			return {
				...state,
				menu: action.menu,
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
	}

	return state;
}

export function queue( state = [], action ) {
	switch ( action.type ) {
		// Add a new API Request to the Queue
		case 'ENQUEUE_REQUEST':
			state = state.filter( ( ele ) => ele[ 0 ] !== action.id );
			return [ ...state, [ action.id, action.request ] ];

		// Take out the topmost Queue Item
		case 'DEQUEUE_REQUEST':
			return [ ...state.slice( 1 ) ];

		// Make all the Queue Requests and Empty the queue
		case 'FLUSH_QUEUE':
			apiQueueExecutor( state );
			return [];
	}

	return state;
}

export default combineReducers( {
	drawer,
	runtime,
	data,
	settings,
	flow,
	sidebar,
	header,
	queue,
} );
