import { combineReducers } from '@wordpress/data';

import { VIEW_NAV_PRIMARY } from '../../constants';

import {
	routes as initialRoutes,
	steps as initialSteps,
	initialDesignSteps,
	initialTopSteps,
} from '../data/routes';

import { filter } from 'lodash';

export function steps(
	state = {
		routes: initialRoutes,
		allSteps: initialSteps,
		topSteps: initialTopSteps(),
		designSteps: initialDesignSteps(),
		currentStep: '/step/get-started',
	},
	action
) {
	switch (action.type) {
		case 'SET_ACTIVE_STEP':
			return {
				...state,
				currentStep: action.path,
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
	steps,
});
