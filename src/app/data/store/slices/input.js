const DEFAULT_STATE = {
	onboardingStarted: false,
	selectedForkOption: null,
	siteTitle: '',
	selectedLocale: '',
	prompt: '',
	logo: '',
	experienceLevel: '',
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
		case 'SET_ONBOARDING_STARTED':
			return {
				...state,
				onboardingStarted: action.onboardingStarted,
			};
		case 'SET_SELECTED_FORK_OPTION':
			return {
				...state,
				selectedForkOption: action.selectedForkOption,
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
	}
}

/**
 * Input Actions
 */
export const actions = {
	setInputSlice: ( inputSlice ) => ( {
		type: 'SET_INPUT_SLICE',
		inputSlice,
	} ),
	setOnboardingStarted: ( onboardingStarted ) => ( {
		type: 'SET_ONBOARDING_STARTED',
		onboardingStarted,
	} ),
	setSelectedForkOption: ( selectedForkOption ) => ( {
		type: 'SET_SELECTED_FORK_OPTION',
		selectedForkOption,
	} ),
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
};

/**
 * Input Selectors
 */
export const selectors = {
	getInputSlice: ( state ) => state.input,
	getOnboardingStarted: ( state ) => state.onboardingStarted,
	getSelectedForkOption: ( state ) => state.selectedForkOption,
	getSiteTitle: ( state ) => state.siteTitle,
	getSelectedLocale: ( state ) => state.selectedLocale,
	getPrompt: ( state ) => state.prompt,
	getLogo: ( state ) => state.logo,
	getExperienceLevel: ( state ) => state.experienceLevel,
};
