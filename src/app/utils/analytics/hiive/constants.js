export const CATEGORY = 'wonder_start';

// Lifecycle
export const ACTION_PAGEVIEW = 'pageview';
export const ACTION_ONBOARDING_STARTED = 'onboarding_started';
export const ACTION_ONBOARDING_COMPLETE = 'onboarding_complete';
export const ACTION_ONBOARDING_EXITED = 'onboarding_exited';
export const ACTION_ONBOARDING_RESTARTED = 'onboarding_restarted';

// Intake
export const ACTION_INTAKE_PROMPT_SET = 'site_details_prompt_set';

// Generation
export const ACTION_SITEGEN_SITE_GENERATION_TIME = 'site_generation_time';

// Errors
export const ACTION_ERROR_STATE_TRIGGERED = 'error_state_triggered';

export const ACTION_TO_LABEL_KEY_MAP = {
	[ ACTION_ONBOARDING_COMPLETE ]: 'complete_type',
	[ ACTION_ONBOARDING_EXITED ]: 'destination',
	[ ACTION_ONBOARDING_RESTARTED ]: 'location',
	[ ACTION_INTAKE_PROMPT_SET ]: 'prompt',
	[ ACTION_SITEGEN_SITE_GENERATION_TIME ]: 'time',
	[ ACTION_ERROR_STATE_TRIGGERED ]: 'identifier',
};
