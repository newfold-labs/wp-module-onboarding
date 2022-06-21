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
 * Gets current Onboarding Flow
 * @param {*} state
 * @returns string
 */
export function getOnbardingFlow(state) {
	return state.runtime.currentFlow ?? 'wp-setup';
}

/**
 * Gets steps to display in drawer.
 * @param {*} state
 * @returns
 */
export function getTopSteps(state) {
	return state.flow.steps.topSteps;
}

/**
 * Gets design steps to display in drawer submenu.
 * @param {*} state
 * @returns
 */
export function getDesignSteps(state) {
	return state.flow.steps.designSteps;
}

/**
 * Get the path to the current step.
 *
 * @param {*} state
 * @returns
 */
export function getCurrentStepPath(state) {
	return state.flow.steps.currentStep;
}

/**
 * Gets the First step object.
 *
 * @param {*} state
 * @returns object
 */
export function getFirstStep(state) {
	return state.flow.steps.allSteps[0];
}

/**
 * Gets the Last step object.
 *
 * @param {*} state
 * @returns object
 */
export function getLastStep(state) {
	return state.flow.steps.allSteps[state.flow.steps.allSteps.length - 1];
}

/**
 * Gets the current step object.
 *
 * @param {*} state
 * @returns object
 */
export function getCurrentStep(state) {
	const filtered = filter(state.flow.steps.allSteps, [
		'path',
		state.flow.steps.currentStep,
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
	const currentStepIndex = findIndex(state.flow.steps.allSteps, {
		path: state.flow.steps.currentStep,
	});
	if (0 === currentStepIndex) {
		return null; // current step is the first step
	}
	if (-1 === currentStepIndex) {
		return false; // could not find index
	}
	return state.flow.steps.allSteps[currentStepIndex - 1];
}

/**
 * Gets the next steps object.
 *
 * @param {*} state
 * @returns object|null|false
 */
export function getNextStep(state) {
	const totalIndexes = state.flow.steps.allSteps.length - 1;
	const currentStepIndex = findIndex(state.flow.steps.allSteps, {
		path: state.flow.steps.currentStep,
	});
	if (totalIndexes === currentStepIndex) {
		return null; // currentStep is the last step
	}
	if (-1 === currentStepIndex) {
		return false; // could not find index
	}
	return state.flow.steps.allSteps[currentStepIndex + 1];
}
