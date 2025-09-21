import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingLogogenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	logogenReferenceId: '',
	logos: [],
	selectedLogo: '',
	logoGenSliceVersion: 0,
};

/**
 * Logogen Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function logogen( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_LOGOGEN_SLICE':
			return {
				...state,
				...action.logogenSlice,
				logoGenSliceVersion: state.logoGenSliceVersion + 1,
			};
		case 'SET_LOGOGEN_REFERENCE_ID':
			return {
				...state,
				logogenReferenceId: action.logogenReferenceId,
				logoGenSliceVersion: state.logoGenSliceVersion + 1,
			};
		case 'SET_LOGOS':
			return {
				...state,
				logos: action.logos,
				logoGenSliceVersion: state.logoGenSliceVersion + 1,
			};
		case 'SET_SELECTED_LOGO':
			return {
				...state,
				selectedLogo: action.selectedLogo,
				logoGenSliceVersion: state.logoGenSliceVersion + 1,
			};
	}

	return state;
}

/**
 * Logogen Actions
 */
export const actions = {
	setLogogenSlice: ( logogenSlice ) => {
		return {
			type: 'SET_LOGOGEN_SLICE',
			logogenSlice,
		};
	},
	setLogogenReferenceId: ( logogenReferenceId ) => {
		return {
			type: 'SET_LOGOGEN_REFERENCE_ID',
			logogenReferenceId,
		};
	},
	setLogos: ( logos ) => {
		return {
			type: 'SET_LOGOS',
			logos,
		};
	},
	setSelectedLogo: ( selectedLogo ) => {
		return {
			type: 'SET_SELECTED_LOGO',
			selectedLogo,
		};
	},
};

/**
 * Logogen Selectors
 */
export const selectors = {
	getLogogenSlice: ( state ) => state.logogen,
	getLogogenReferenceId: ( state ) => state.logogen.logogenReferenceId,
	getLogos: ( state ) => state.logogen.logos,
	getSelectedLogo: ( state ) => state.logogen.selectedLogo,
	getLogogenSliceVersion: ( state ) => state.logogen.logoGenSliceVersion,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousLogoGenSliceVersion = select( nfdOnboardingStore ).getLogogenSliceVersion();

	subscribe( () => {
		const updatedLogogenSliceState = select( nfdOnboardingStore ).getLogogenSlice();
		const updatedLogogenSliceVersion = select( nfdOnboardingStore ).getLogogenSliceVersion();

		// Only sync if the slice data actually changed.
		if ( previousLogoGenSliceVersion !== updatedLogogenSliceVersion ) {
			previousLogoGenSliceVersion = updatedLogogenSliceVersion;

			updateOnboardingLogogenSlice( updatedLogogenSliceState );
		}
	}, nfdOnboardingStore );
}
