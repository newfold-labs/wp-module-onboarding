import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingInputSlice } from '@/utils/api';

const DEFAULT_STATE = {
	siteTitle: '',
	selectedLocale: '',
	prompt: '',
	logo: '',
	experienceLevel: '',
	siteType: '',
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
			};
		case 'SET_SITE_TITLE':
			return {
				...state,
				siteTitle: action.siteTitle,
			};
		case 'SET_SELECTED_LOCALE':
			return {
				...state,
				selectedLocale: action.selectedLocale,
			};
		case 'SET_PROMPT':
			return {
				...state,
				prompt: action.prompt,
			};
		case 'SET_LOGO':
			return {
				...state,
				logo: action.logo,
			};
		case 'SET_EXPERIENCE_LEVEL':
			return {
				...state,
				experienceLevel: action.experienceLevel,
			};
		case 'SET_SITE_TYPE':
			return {
				...state,
				siteType: action.siteType,
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
	setSiteTitle: ( siteTitle ) => ( {
		type: 'SET_SITE_TITLE',
		siteTitle,
	} ),
	setSelectedLocale: ( selectedLocale ) => ( {
		type: 'SET_SELECTED_LOCALE',
		selectedLocale,
	} ),
	setPrompt: ( prompt ) => ( {
		type: 'SET_PROMPT',
		prompt,
	} ),
	setLogo: ( logo ) => ( {
		type: 'SET_LOGO',
		logo,
	} ),
	setExperienceLevel: ( experienceLevel ) => ( {
		type: 'SET_EXPERIENCE_LEVEL',
		experienceLevel,
	} ),
	setSiteType: ( siteType ) => ( {
		type: 'SET_SITE_TYPE',
		siteType,
	} ),
};

/**
 * Input Selectors
 */
export const selectors = {
	getInputSlice: ( state ) => state.input,
	getSiteTitle: ( state ) => state.input.siteTitle,
	getSelectedLocale: ( state ) => state.input.selectedLocale,
	getPrompt: ( state ) => state.input.prompt,
	getLogo: ( state ) => state.input.logo,
	getExperienceLevel: ( state ) => state.input.experienceLevel,
	getSiteType: ( state ) => state.input.siteType,
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
