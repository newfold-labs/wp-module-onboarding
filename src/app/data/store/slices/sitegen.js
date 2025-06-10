import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingSiteGenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	homepages: [],
	retryMode: false,
	hasFailed: false,
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
};

export const selectors = {
	getSiteGenSlice: ( state ) => state.sitegen,
	getHomepages: ( state ) => state.sitegen.homepages,
	getRetryMode: ( state ) => state.sitegen.retryMode,
	getHasFailed: ( state ) => state.sitegen.hasFailed,
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
