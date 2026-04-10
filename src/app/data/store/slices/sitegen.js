import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingSiteGenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	siteId: '',
	siteGenId: '',
	sitegenSliceVersion: 0,
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
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_ID':
			return {
				...state,
				siteId: action.siteId,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_GEN_ID':
			return {
				...state,
				siteGenId: action.siteGenId,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
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
	setSiteId: ( siteId ) => {
		return {
			type: 'SET_SITE_ID',
			siteId,
		};
	},
	setSiteGenId: ( siteGenId ) => {
		return {
			type: 'SET_SITE_GEN_ID',
			siteGenId,
		};
	},
};

export const selectors = {
	getSiteGenSlice: ( state ) => state.sitegen,
	getSiteId: ( state ) => state.sitegen.siteId,
	getSiteGenId: ( state ) => state.sitegen.siteGenId,
	getSitegenSliceVersion: ( state ) => state.sitegen.sitegenSliceVersion,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousSiteGenSliceVersion = select( nfdOnboardingStore ).getSitegenSliceVersion();

	subscribe( () => {
		const updatedSiteGenSliceState = select( nfdOnboardingStore ).getSiteGenSlice();
		const updatedSiteGenSliceVersion = select( nfdOnboardingStore ).getSitegenSliceVersion();

		// Only sync if the slice data actually changed.
		if ( previousSiteGenSliceVersion !== updatedSiteGenSliceVersion ) {
			previousSiteGenSliceVersion = updatedSiteGenSliceVersion;

			updateOnboardingSiteGenSlice( updatedSiteGenSliceState );
		}
	}, nfdOnboardingStore );
}
