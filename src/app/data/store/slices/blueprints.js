import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingBlueprintsSlice } from '@/utils/api';

const DEFAULT_STATE = {
	blueprints: [],
	selectedBlueprint: null,
	activeTab: null,
	blueprintsSliceVersion: 0,
};

/**
 * Blueprints Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function blueprints( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_BLUEPRINTS_SLICE':
			return {
				...state,
				...action.blueprintsSlice,
				blueprintsSliceVersion: state.blueprintsSliceVersion + 1,
			};
		case 'SET_BLUEPRINTS':
			return {
				...state,
				blueprints: action.blueprints,
				blueprintsSliceVersion: state.blueprintsSliceVersion + 1,
			};
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.activeTab,
				blueprintsSliceVersion: state.blueprintsSliceVersion + 1,
			};
		case 'SET_SELECTED_BLUEPRINT':
			return {
				...state,
				selectedBlueprint: action.selectedBlueprint,
				blueprintsSliceVersion: state.blueprintsSliceVersion + 1,
			};
	}

	return state;
}

/**
 * Blueprints Actions
 */
export const actions = {
	setBlueprintsSlice: ( blueprintsSlice ) => ( {
		type: 'SET_BLUEPRINTS_SLICE',
		blueprintsSlice,
	} ),
	// eslint-disable-next-line no-shadow
	setBlueprints: ( blueprints ) => ( {
		type: 'SET_BLUEPRINTS',
		blueprints,
	} ),
	setActiveTab: ( activeTab ) => ( {
		type: 'SET_ACTIVE_TAB',
		activeTab,
	} ),
	setSelectedBlueprint: ( selectedBlueprint ) => ( {
		type: 'SET_SELECTED_BLUEPRINT',
		selectedBlueprint,
	} ),
};

/**
 * Blueprints Selectors
 */
export const selectors = {
	getBlueprintsSlice: ( state ) => state.blueprints,
	getBlueprints: ( state ) => state.blueprints.blueprints,
	getSelectedBlueprint: ( state ) => state.blueprints.selectedBlueprint,
	getActiveTab: ( state ) => state.blueprints.activeTab,
	getBlueprintsSliceVersion: ( state ) => state.blueprints.blueprintsSliceVersion,
};

/**
 * Blueprints DB Sync Service
 */
export function dbSyncService() {
	let previousBlueprintsSliceVersion = select( nfdOnboardingStore ).getBlueprintsSliceVersion();

	subscribe( () => {
		const updatedBlueprintsSliceState = select( nfdOnboardingStore ).getBlueprintsSlice();
		const updatedBlueprintsSliceVersion = select( nfdOnboardingStore ).getBlueprintsSliceVersion();

		// Only sync if the slice data actually changed.
		if ( previousBlueprintsSliceVersion !== updatedBlueprintsSliceVersion ) {
			previousBlueprintsSliceVersion = updatedBlueprintsSliceVersion;
			updateOnboardingBlueprintsSlice( updatedBlueprintsSliceState );
		}
	}, nfdOnboardingStore );
}
