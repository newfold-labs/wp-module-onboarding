import { combineReducers } from '@wordpress/data';

import { VIEW_NAV_PRIMARY } from '../../constants';

import {
	routes as initialRoutes,
	steps as initialSteps,
	initialDesignSteps,
	initialTopSteps,
} from '../data/routes/index';

export function flow(
	state = {
		flow: 'wp-setup',
		steps: {
			routes: initialRoutes,
			allSteps: initialSteps,
			topSteps: initialTopSteps(),
			designSteps: initialDesignSteps(),
			currentStep: '/wp-setup/step/what-next',
		}
	},
	action
) {
	switch (action.type) {
		case 'SET_ACTIVE_STEP':
			return {
				...state,
				steps: {
					...state.steps,
					currentStep: action.path
				}
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
	state = { isOpen: false, view: VIEW_NAV_PRIMARY },
	action
) {
	switch (action.type) {
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
	}

	return state;
}

export function runtime(state = {}, action) {
	switch (action.type) {
		case 'SET_RUNTIME':
			return {
				...state,
				...action.runtime,
			};
	}

	return state;
}

export function settings(state = {}, action) {
	switch (action.type) {
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...action.settings,
			};
	}

	return state;
}

export default combineReducers({
	drawer,
	runtime,
	settings,
	flow,
});
