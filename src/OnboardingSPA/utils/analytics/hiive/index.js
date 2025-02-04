import { HiiveAnalytics } from '@newfold/js-utility-ui-analytics';
// eslint-disable-next-line import/default, no-unused-vars
import data from '@wordpress/data'; // added to keep dependency for js-utility-ui-analytics
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

export * from './OnboardingEvent';
