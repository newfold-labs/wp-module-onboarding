import { combineReducers } from '@wordpress/data';

import {
	VIEW_NAV_PRIMARY,
	THEME_STATUS_INIT,
	HEADER_SITEBUILD,
	FOOTER_SITEGEN,
} from '../../constants';

import {
	initialDesignRoutes,
	initialRoutes,
	initialSteps,
	initialTopSteps,
} from '../data/flows/index';
import { sidebars } from '../data/sidebars/index';
import { headers } from '../data/headers';
import { footers } from '../data/footers';
import apiQueueExecutor from '../utils/api-queuer/api-queue-executor';
import { DEFAULT_FLOW } from '../data/flows/constants';

export function flow(
	state = {
		flow: DEFAULT_FLOW,
		steps: {
			routes: initialRoutes,
			allSteps: initialSteps,
			topSteps: initialTopSteps,
			designRoutes: initialDesignRoutes,
			currentStep: '',
			error: {
				showDialog: false,
				continuePath: '',
			},
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
		case 'UPDATE_TOP_STEPS':
			return {
				...state,
				steps: {
					...state.steps,
					topSteps: action.topSteps,
				},
			};
		case 'UPDATE_DESIGN_ROUTES':
			return {
				...state,
				steps: {
					...state.steps,
					designRoutes: action.designRoutes,
				},
			};
		case 'SHOW_NAV_ERROR_DIALOG':
			return {
				...state,
				steps: {
					...state.steps,
					error: {
						...state.steps.error,
						showDialog: action.showDialog,
					},
				},
			};
		case 'SET_NAV_ERROR_CONTINUE_PATH':
			return {
				...state,
				steps: {
					...state.steps,
					error: {
						...state.steps.error,
						continuePath: action.continuePath,
					},
				},
			};
		case 'RESET_NAV_ERROR':
			return {
				...state,
				steps: {
					...state.steps,
					error: {
						showDialog: false,
						continuePath: '',
					},
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
	state = {
		isNavigationEnabled: true,
		menu: '',
		isEnabled: true,
		headers,
		view: HEADER_SITEBUILD,
	},
	action
) {
	switch ( action.type ) {
		case 'SET_HEADER_NAVIGATION_ENABLED':
			return {
				...state,
				isNavigationEnabled: action.isNavigationEnabled,
			};
		case 'SET_HEADER_ENABLED':
			return {
				...state,
				isEnabled: action.isEnabled,
			};
		case 'UPDATE_HEADER_MENU_DATA':
			return {
				...state,
				menu: action.menu,
			};
		case 'SET_HEADER_ACTIVE_VIEW':
			return {
				...state,
				view: action.view,
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
		case 'SET_AI_PREVIEW_SETTINGS':
			return {
				...state,
				aiPreviewSettings: {
					...state.aiPreviewSettings,
					settings: action.aiPreviewSettings,
				},
			};
	}

	return state;
}

export function settings(
	state = {
		themeStatus: THEME_STATUS_INIT,
		initialize: false,
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
		case 'UPDATE_INITIALIZE':
			return {
				...state,
				initialize: action.initialize,
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

export function footer(
	state = {
		footers,
		view: FOOTER_SITEGEN,
	},
	action
) {
	switch ( action.type ) {
		case 'SET_FOOTER_ACTIVE_VIEW':
			return {
				...state,
				view: action.view,
			};
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
	footer,
	queue,
} );
