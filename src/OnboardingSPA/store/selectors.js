import { filter, findIndex } from 'lodash';

import { coreDataStore } from '@wordpress/core-data';
import { createRegistrySelector } from '@wordpress/data';
import createSelector from 'rememo';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Get the currently active drawer view
 * @param {*} state
 * @returns string
 */
export function getDrawerView(state) {
	return state.drawer.view;
}

/**
 * Check if the drawer is opened
 * @param {*} state
 * @returns boolean
 */
export function isDrawerOpened(state) {
	return state.drawer.isOpen;
}

/**
 * Gets current Newfold brand
 * @param {*} state
 * @returns string
 */
export function getNewfoldBrand(state) {
	return state.runtime.currentBrand.brand;
}

/**
 * Gets steps to display in drawer.
 * @param {*} state
 * @returns
 */
export function getTopSteps(state) {
	return state.steps.topSteps;
}

/**
 * Gets design steps to display in drawer submenu.
 * @param {*} state
 * @returns
 */
export function getDesignSteps(state) {
	return state.steps.designSteps;
}

/**
 * Get the path to the current step.
 *
 * @param {*} state
 * @returns
 */
export function getCurrentStepPath(state) {
	return state.steps.currentStep;
}

/**
 * Gets the current step object.
 *
 * @param {*} state
 * @returns object
 */
export function getCurrentStep(state) {
	const filtered = filter(state.steps.allSteps, [
		'path',
		state.steps.currentStep,
	]);
	return filtered[0];
}

/**
 * Get's the previous step's object.
 *
 * @param {*} state
 * @returns object|null|false
 */
export function getPreviousStep(state) {
	const currentStepIndex = findIndex(state.steps.allSteps, {
		path: state.steps.currentStep,
	});
	if (0 === currentStepIndex) {
		return null; // current step is the first step
	}
	if (-1 === currentStepIndex) {
		return false; // could not find index
	}

	return state.steps.allSteps[currentStepIndex - 1];
}

/**
 * Gets the next steps object.
 *
 * @param {*} state
 * @returns object|null|false
 */
export function getNextStep(state) {
	const totalIndexes = state.steps.allSteps.length - 1;
	const currentStepIndex = findIndex(state.steps.allSteps, {
		path: state.steps.currentStep,
	});
	if (totalIndexes === currentStepIndex) {
		return null; // currentStep is the last step
	}
	if (-1 === currentStepIndex) {
		return false; // could not find index
	}

	return state.steps.allSteps[currentStepIndex + 1];
}
