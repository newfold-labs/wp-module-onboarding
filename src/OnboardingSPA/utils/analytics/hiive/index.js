import { HiiveAnalytics } from '@newfold/js-utility-ui-analytics';
import { default as wpData } from '@wordpress/data';
import { default as wpApiFetch } from '@wordpress/api-fetch';
import { ACTION_TO_LABEL_KEY_MAP } from './constants';

export const trackOnboardingEvent = ( onboardingEvent ) => {
	return HiiveAnalytics.track( onboardingEvent );
};

export const sendOnboardingEvent = ( onboardingEvent ) => {
	return HiiveAnalytics.send( onboardingEvent );
};

export const getLabelKeyFromAction = ( action ) => {
	if ( action in ACTION_TO_LABEL_KEY_MAP ) {
		return ACTION_TO_LABEL_KEY_MAP[ action ];
	}
	return undefined;
};

// passing dependencies to HiiveAnalytics solely for build purposes
HiiveAnalytics.dependencies = {
	wpData,
	wpApiFetch,
};

export * from './OnboardingEvent';
