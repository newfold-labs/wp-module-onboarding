import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingInputSlice } from '@/utils/api';

const DEFAULT_STATE = {
	prompt: null,
	inputSliceVersion: 0,
};

/**
 * Input Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function input( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_INPUT_SLICE':
			return {
				...state,
				...action.inputSlice,
				inputSliceVersion: state.inputSliceVersion + 1,
			};
		case 'SET_PROMPT':
			return {
				...state,
				prompt: action.prompt,
				inputSliceVersion: state.inputSliceVersion + 1,
			};
	}

	return state;
}

/**
 * Input Actions
 */
export const actions = {
	setInputSlice: ( inputSlice ) => {
		window.nfdOnboarding.input = {
			migrated: true,
		};
		return {
			type: 'SET_INPUT_SLICE',
			inputSlice,
		};
	},
	setPrompt: ( prompt ) => ( {
		type: 'SET_PROMPT',
		prompt,
	} ),
};

/**
 * Input Selectors
 */
export const selectors = {
	getInputSlice: ( state ) => state.input,
	getPrompt: ( state ) => state.input.prompt,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousInputSliceState = select( nfdOnboardingStore ).getInputSlice();

	subscribe( () => {
		const updatedInputSliceState = select( nfdOnboardingStore ).getInputSlice();

		// Only sync if the slice data actually changed.
		if ( JSON.stringify( previousInputSliceState ) !== JSON.stringify( updatedInputSliceState ) ) {
			previousInputSliceState = { ...updatedInputSliceState };

			updateOnboardingInputSlice( updatedInputSliceState );
		}
	}, nfdOnboardingStore );
}
