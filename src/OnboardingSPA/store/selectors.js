// eslint-disable-next-line import/no-extraneous-dependencies
import { filter, findIndex } from 'lodash';
import { addQueryArgs } from '@wordpress/url';

/**
 * Get the currently active drawer view
 *
 * @param {*} state
 * @return {string} Drawer View
 */
export function getDrawerView( state ) {
	return state.drawer.view;
}

/**
 * Check if the drawer is opened
 *
 * @param {*} state
 * @return {boolean} Drawer isOpen
 */
export function isDrawerOpened( state ) {
	return state.drawer.isOpen;
}

/**
 * Check if the drawer is suppressed
 *
 * @param {*} state
 * @return {boolean} Drawer isSuppressed
 */
export function isDrawerSuppressed( state ) {
	return state.drawer.isSuppressed;
}

export function isHeaderNavigationEnabled( state ) {
	return state.header.isNavigationEnabled;
}

/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return {string} Newfold Brand
 */
export function getNewfoldBrand( state ) {
	return state.runtime.currentBrand.brand;
}

/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return {string} Current Brand Name
 */
export function getNewfoldBrandName( state ) {
	return state.runtime.currentBrand.name;
}

/**
 * Gets the current Newfold Brand's Onboarding Configuration.
 *
 * @param {*} state
 * @return {Object} Brand Onboarding Configuration.
 */
export function getNewfoldBrandConfig( state ) {
	return state.runtime.currentBrand.config;
}

/**
 * Gets dynamic Hire Experts URL for Need Help Tag per brand
 *
 * @param {*} state
 * @return {string} hireExpertsUrl
 */
export function getHireExpertsUrl( state ) {
	const hireExpertsInfo = state.runtime.currentBrand.hireExpertsInfo;
	const hireExpertsUrl =
		addQueryArgs(
			hireExpertsInfo?.defaultLink,
			hireExpertsInfo?.queryParameters
		) + ( hireExpertsInfo?.fragment || '' );
	return hireExpertsUrl;
}

/**
 * Gets the current Onboarding Data
 *
 * @param {*} state
 * @return {string} Current Onboarding Data
 */
export function getCurrentOnboardingData( state ) {
	return state.data.flowData;
}

/**
 * Gets the current Onboarding Social Data
 *
 * @param {*} state
 * @return {string} Onboarding Social Data
 */
export function getOnboardingSocialData( state ) {
	return state.data.socialData;
}

/**
 * Gets current Onboarding Flow
 *
 * @param {*} state
 * @return {string} Onboarding Flow
 */
export function getOnboardingFlow( state ) {
	return state.runtime.currentFlow ?? 'wp-setup';
}

export function getRoutes( state ) {
	return state.flow.steps.routes;
}

export function getAllSteps( state ) {
	return state.flow.steps.allSteps;
}

/**
 * Gets steps to display in drawer.
 *
 * @param {*} state
 * @return {Array} Top Steps
 */
export function getTopSteps( state ) {
	return state.flow.steps.topSteps;
}

/**
 * Gets design steps to display in drawer submenu.
 *
 * @param {*} state
 * @return {Array} Design Steps
 */
export function getDesignSteps( state ) {
	return state.flow.steps.designSteps;
}

/**
 * Gets get-started setup steps to display in drawer submenu.
 *
 * @param {*} state
 * @return {Array} Get Started Steps
 */
export function getGetStartedSteps( state ) {
	return state.flow.steps.getStartedSteps;
}

/**
 * Get the path to the current step.
 *
 * @param {*} state
 * @return {string} Current Step Path
 */
export function getCurrentStepPath( state ) {
	return state.flow.steps.currentStep;
}

/**
 * Gets the First step object.
 *
 * @param {*} state
 * @return {Object} First Step
 */
export function getFirstStep( state ) {
	return state.flow.steps.allSteps[ 0 ];
}

/**
 * Gets the Last step object.
 *
 * @param {*} state
 * @return {Object} Last Step
 */
export function getLastStep( state ) {
	return state.flow.steps.allSteps[ state.flow.steps.allSteps.length - 1 ];
}

/**
 * Gets the current step object.
 *
 * @param {*} state
 * @return {Object} Current Step
 */
export function getCurrentStep( state ) {
	const filtered = filter( state.flow.steps.allSteps, [
		'path',
		state.flow.steps.currentStep,
	] );
	return filtered[ 0 ];
}

export function getCurrentChapter( state ) {
	return state.flow.chapter;
}

export function getStepFromPath( state, path ) {
	const filtered = filter( state.flow.steps.allSteps, [ 'path', path ] );
	return filtered[ 0 ];
}

/**
 * Get's the previous step's object.
 *
 * @param {*} state
 * @return {object|null|false} Previous Step
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
 * @return {object|null|false} Next Step
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
	return state.runtime.previewSettings.settings;
}

export function getSettings( state ) {
	return state.settings;
}

export function getThemeStatus( state ) {
	return state.settings.themeStatus;
}

export function getStoreInfoSteps( state ) {
	return state.flow.steps.storeInfoSteps;
}

export function getStepPreviewData( state ) {
	return state.runtime.previewSettings.stepPreviewData;
}

/**
 * Gets the current header menu Data
 *
 * @param {*} state
 * @return {string} menu
 */
export function getHeaderMenuData( state ) {
	return state.header.menu;
}

/**
 * Gets 1-1 Experts URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} expertsUrl
 */
export function getExpertsUrl( state ) {
	const expertsInfo = state.runtime.currentBrand.expertsInfo;
	const expertsUrl =
		addQueryArgs( expertsInfo?.defaultLink, expertsInfo?.queryParams ) +
		( expertsInfo?.fragment || '' );
	return expertsUrl;
}

/**
 * Gets Full Service Creative Team URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} fullServiceCreativeTeamUrl
 */
export function getfullServiceCreativeTeamUrl( state ) {
	const fullServiceCreativeTeamInfo =
		state.runtime.currentBrand.fullServiceCreativeTeamInfo;
	const fullServiceCreativeTeamUrl =
		addQueryArgs(
			fullServiceCreativeTeamInfo?.defaultLink,
			fullServiceCreativeTeamInfo?.queryParams
		) + ( fullServiceCreativeTeamInfo?.fragment || '' );
	return fullServiceCreativeTeamUrl;
}

/**
 * Gets Technical Support URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} techSupportUrl
 */
export function getTechSupportUrl( state ) {
	const techSupportInfo = state.runtime.currentBrand.techSupportInfo;
	const techSupportUrl =
		addQueryArgs(
			techSupportInfo?.defaultLink,
			techSupportInfo?.queryParams
		) + ( techSupportInfo?.fragment || '' );
	return techSupportUrl;
}

/**
 * Gets the Plugin Install Hash for security
 *
 * @param {*} state
 * @return {string} pluginInstallHash
 */
export function getPluginInstallHash( state ) {
	return state.runtime.pluginInstallHash;
}

/**
 * Gets the Queue Element on top
 *
 * @param {*} state
 * @return {string} getQueuePeek
 */
export function getQueuePeek( state ) {
	return state?.queue[ 0 ] ?? null;
}

/**
 * Gets the Queue Element on top
 *
 * @param {*} state
 * @return {string} getQueuePeek
 */
export function isQueueEmpty( state ) {
	return state?.queue?.length === 0;
}
