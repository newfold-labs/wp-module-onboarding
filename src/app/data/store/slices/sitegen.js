import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingSiteGenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	homepages: [],
	selectedHomepage: '',
	retryMode: false,
	hasFailed: false,
	canvasSidebarIsOpen: true,
	version: 0,
};

/**
 * Sitegen Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function sitegen( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_SITEGEN_SLICE':
			return {
				...state,
				...action.siteGenSlice,
				version: state.version + 1,
			};
		case 'SET_HOMEPAGES':
			return {
				...state,
				homepages: action.homepages,
				version: state.version + 1,
			};
		case 'SET_SELECTED_HOMEPAGE':
			return {
				...state,
				selectedHomepage: action.selectedHomepage,
				version: state.version + 1,
			};
		case 'SET_RETRY_MODE':
			return {
				...state,
				retryMode: action.retryMode,
				version: state.version + 1,
			};
		case 'SET_HAS_FAILED':
			return {
				...state,
				hasFailed: action.hasFailed,
				version: state.version + 1,
			};
		case 'SET_CANVAS_SIDEBAR_IS_OPEN':
			return {
				...state,
				canvasSidebarIsOpen: action.canvasSidebarIsOpen,
				version: state.version + 1,
			};
	}

	return state;
}

export const actions = {
	setSiteGenSlice: ( siteGenSlice ) => {
		return {
			type: 'SET_SITEGEN_SLICE',
			siteGenSlice,
		};
	},
	setHomepages: ( homepages ) => {
		return {
			type: 'SET_HOMEPAGES',
			homepages,
		};
	},
	setSelectedHomepage: ( selectedHomepage ) => {
		return {
			type: 'SET_SELECTED_HOMEPAGE',
			selectedHomepage,
		};
	},
	setRetryMode: ( retryMode ) => {
		return {
			type: 'SET_RETRY_MODE',
			retryMode,
		};
	},
	setHasFailed: ( hasFailed ) => {
		return {
			type: 'SET_HAS_FAILED',
			hasFailed,
		};
	},
	setCanvasSidebarIsOpen: ( canvasSidebarIsOpen ) => {
		return {
			type: 'SET_CANVAS_SIDEBAR_IS_OPEN',
			canvasSidebarIsOpen,
		};
	},
};

export const selectors = {
	getSiteGenSlice: ( state ) => state.sitegen,
	getHomepages: ( state ) => state.sitegen.homepages,
	getSelectedHomepage: ( state ) => state.sitegen.selectedHomepage,
	getSelectedColorPalette: ( state ) => state.sitegen.homepages[ state.sitegen.selectedHomepage ]?.color?.palette,
	getRetryMode: ( state ) => state.sitegen.retryMode,
	getHasFailed: ( state ) => state.sitegen.hasFailed,
	getCanvasSidebarIsOpen: ( state ) => state.sitegen.canvasSidebarIsOpen,
	getVersion: ( state ) => state.sitegen.version,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousSiteGenSliceVersion = select( nfdOnboardingStore ).getVersion();

	subscribe( () => {
		const updatedSiteGenSliceState = select( nfdOnboardingStore ).getSiteGenSlice();
		const updatedSiteGenSliceVersion = select( nfdOnboardingStore ).getVersion();

		// Only sync if the slice data actually changed.
		if ( previousSiteGenSliceVersion !== updatedSiteGenSliceVersion ) {
			previousSiteGenSliceVersion = updatedSiteGenSliceVersion;

			updateOnboardingSiteGenSlice( updatedSiteGenSliceState );
		}
	}, nfdOnboardingStore );
}
