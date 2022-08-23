import { filter, findIndex } from 'lodash';
import { addQueryArgs, getFragment } from '@wordpress/url';

/**
 * Get the currently active drawer view
 *
 * @param {*} state
 * @return string
 */
export function getDrawerView( state ) {
	return state.drawer.view;
}

/**
 * Check if the drawer is opened
 *
 * @param {*} state
 * @return boolean
 */
export function isDrawerOpened( state ) {
	return state.drawer.isOpen;
}

/**
 * Check if the drawer is suppressed
 *
 * @param {*} state
 * @return boolean
 */
 export function isDrawerSuppressed( state ) {
	return state.drawer.isSuppressed;
}

/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return string
 */
export function getNewfoldBrand( state ) {
	return state.runtime.currentBrand.brand;
}

/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return string
 */
export function getNewfoldBrandName( state ) {
	return state.runtime.currentBrand.name;
}

/**
 * Gets dynamic Hire Experts URL for Need Help Tag per brand
 *
 * @param {*} state
 * @return string
 */
export function getHireExpertsUrl( state ) {
	const hireExpertsInfo = state.runtime.currentBrand.hireExpertsInfo;
	const hireExpertsUrl = addQueryArgs(hireExpertsInfo?.defaultLink, hireExpertsInfo?.queryParameters) + (hireExpertsInfo?.fragment || '') ;
	return hireExpertsUrl;
}

/**
 * Gets the current complete Onboarding Data
 *
 * @param {*} state
 * @return string
 */
export function getOnboardingData(state) {
	return state?.data;
}

/**
 * Gets the current Onboarding Flow Data
 *
 * @param {*} state
 * @return string
 */
export function getOnboardingFlowData( state ) {
	return state?.data?.flowData;
}

/**
 * Gets the current Onboarding Social Data
 *
 * @param {*} state
 * @return string
 */
export function getOnboardingSocialData(state) {
	return state?.data?.socialData;
}


/**
 * Gets current Onboarding Flow
 *
 * @param {*} state
 * @return string
 */
export function getOnboardingFlow( state ) {
	return state.runtime.currentFlow ?? 'wp-setup';
}

/**
 * Gets the Queue Element on top
 *
 * @param {*} state
 * @return string
 */
export function getQueuePeek(state) {
	return state?.queue[0] ?? null;
}

/**
 * Gets steps to display in drawer.
 *
 * @param {*} state
 * @return
 */
export function getTopSteps( state ) {
	return state.flow.steps.topSteps;
}

/**
 * Gets design steps to display in drawer submenu.
 *
 * @param {*} state
 * @return
 */
export function getDesignSteps( state ) {
	return state.flow.steps.designSteps;
}

/**
 * Gets get-started setup steps to display in drawer submenu.
 *
 * @param {*} state
 * @return
 */
export function getGetStartedSteps( state ) {
	return state.flow.steps.getStartedSteps;
}

/**
 * Get the path to the current step.
 *
 * @param {*} state
 * @return
 */
export function getCurrentStepPath( state ) {
	return state.flow.steps.currentStep;
}

/**
 * Gets the First step object.
 *
 * @param {*} state
 * @return object
 */
export function getFirstStep( state ) {
	return state.flow.steps.allSteps[ 0 ];
}

/**
 * Gets the Last step object.
 *
 * @param {*} state
 * @return object
 */
export function getLastStep( state ) {
	return state.flow.steps.allSteps[ state.flow.steps.allSteps.length - 1 ];
}

/**
 * Gets the current step object.
 *
 * @param {*} state
 * @return object
 */
export function getCurrentStep( state ) {
	const filtered = filter( state.flow.steps.allSteps, [
		'path',
		state.flow.steps.currentStep,
	] );
	return filtered[ 0 ];
}

/**
 * Get's the previous step's object.
 *
 * @param {*} state
 * @return object|null|false
 */
export function getPreviousStep( state ) {
	const currentStepIndex = findIndex( state.flow.steps.allSteps, {
		path: state.flow.steps.currentStep,
	} );
	if ( 0 === currentStepIndex ) {
		return null; // current step is the first step
	}
	if ( -1 === currentStepIndex ) {
		return false; // could not find index
	}
	return state.flow.steps.allSteps[ currentStepIndex - 1 ];
}

/**
 * Gets the next steps object.
 *
 * @param {*} state
 * @return object|null|false
 */
export function getNextStep( state ) {
	const totalIndexes = state.flow.steps.allSteps.length - 1;
	const currentStepIndex = findIndex( state.flow.steps.allSteps, {
		path: state.flow.steps.currentStep,
	} );
	if ( totalIndexes === currentStepIndex ) {
		return null; // currentStep is the last step
	}
	if ( -1 === currentStepIndex ) {
		return false; // could not find index
	}
	return state.flow.steps.allSteps[ currentStepIndex + 1 ];
}

export function isSidebarOpened( state ) {
	return state.sidebar.isOpen;
}

export function getSidebarView( state ) {
	return state.sidebar.view;
}

export function getSidebars( state ) {
	return filter( state.sidebar.sidebars, [ 'enabled', true ] );
}

export function getPreviewSettings( state ) {
	return state.runtime.previewSettings;
}

export function getStoreInfoSteps( state ) {
	return state.flow.steps.storeInfoSteps;
}
