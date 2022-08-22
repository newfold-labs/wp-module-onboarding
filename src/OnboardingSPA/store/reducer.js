import { combineReducers } from '@wordpress/data';

import { VIEW_NAV_PRIMARY } from '../../constants';

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
				isOpen: action.isSuppressed? false : state.isOpen,
			};
	}

	return state;
}

export function data( state = {
	currentData: null,
	socialData: null
}, action ) {
	switch ( action.type ) {
		case 'SET_CURRENT_FLOW_DATA':
			return {
				...state,
				currentData: {
					...action.currentData
				},
			};
		case 'SET_CURRENT_SOCIAL_DATA':
			return {
				...state,
				socialData: {
					...action.socialData
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
				previewSettings: action.previewSettings,
			};
	}

	return state;
}

export function settings( state = {}, action ) {
	switch ( action.type ) {
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...action.settings,
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
} );
