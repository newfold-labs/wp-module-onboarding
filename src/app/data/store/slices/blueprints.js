import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingBlueprintsSlice } from '@/utils/api';

const DEFAULT_STATE = {
	blueprints: [],
	selectedBlueprint: '',
	activeTab: 'commerce',
	version: 0,
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
			};
		case 'SET_BLUEPRINTS':
			return {
				...state,
				blueprints: action.blueprints,
				version: state.version + 1,
			};
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.activeTab,
				version: state.version + 1,
			};
		case 'SET_SELECTED_BLUEPRINT':
			return {
				...state,
				selectedBlueprint: action.selectedBlueprint,
				version: state.version + 1,
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
	getVersion: ( state ) => state.blueprints.version,
};

/**
 * Blueprints DB Sync Service
 */
export function dbSyncService() {
	let previousBlueprintsSliceVersion = select( nfdOnboardingStore ).getVersion();

	subscribe( () => {
		const updatedBlueprintsSliceState = select( nfdOnboardingStore ).getBlueprintsSlice();
		const updatedBlueprintsSliceVersion = select( nfdOnboardingStore ).getVersion();

		// Only sync if the slice data actually changed.
		if ( previousBlueprintsSliceVersion !== updatedBlueprintsSliceVersion ) {
			previousBlueprintsSliceVersion = updatedBlueprintsSliceVersion;
			updateOnboardingBlueprintsSlice( updatedBlueprintsSliceState );
		}
	}, nfdOnboardingStore );
}
