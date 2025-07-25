import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingSiteGenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	homepages: [],
	selectedHomepage: '',
	hasGeneratedSitePages: false,
	retryMode: false,
	sitegenHasFailed: false,
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
		case 'SET_FALLBACK_HOMEPAGES':
			return {
				...state,
				fallbackHomepages: action.fallbackHomepages,
				version: state.version + 1,
			};
		case 'SET_SELECTED_HOMEPAGE':
			return {
				...state,
				selectedHomepage: action.selectedHomepage,
				version: state.version + 1,
			};
		case 'SET_HAS_GENERATED_SITE_PAGES':
			return {
				...state,
				hasGeneratedSitePages: action.hasGeneratedSitePages,
				version: state.version + 1,
			};
		case 'SET_RETRY_MODE':
			return {
				...state,
				retryMode: action.retryMode,
				version: state.version + 1,
			};
		case 'SET_SITEGEN_HAS_FAILED':
			return {
				...state,
				sitegenHasFailed: action.sitegenHasFailed,
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
	setFallbackHomepages: ( fallbackHomepages ) => {
		return {
			type: 'SET_FALLBACK_HOMEPAGES',
			fallbackHomepages,
		};
	},
	setSelectedHomepage: ( selectedHomepage ) => {
		return {
			type: 'SET_SELECTED_HOMEPAGE',
			selectedHomepage,
		};
	},
	setHasGeneratedSitePages: ( hasGeneratedSitePages ) => {
		return {
			type: 'SET_HAS_GENERATED_SITE_PAGES',
			hasGeneratedSitePages,
		};
	},
	setRetryMode: ( retryMode ) => {
		return {
			type: 'SET_RETRY_MODE',
			retryMode,
		};
	},
	setSitegenHasFailed: ( sitegenHasFailed ) => {
		return {
			type: 'SET_SITEGEN_HAS_FAILED',
			sitegenHasFailed,
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
	getFallbackHomepages: ( state ) => state.sitegen.fallbackHomepages,
	getSelectedHomepage: ( state ) => state.sitegen.selectedHomepage,
	getHasGeneratedSitePages: ( state ) => state.sitegen.hasGeneratedSitePages,
	getSelectedColorPalette: ( state ) => state.sitegen.homepages[ state.sitegen.selectedHomepage ]?.color?.palette,
	getRetryMode: ( state ) => state.sitegen.retryMode,
	getSitegenHasFailed: ( state ) => state.sitegen.sitegenHasFailed,
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
