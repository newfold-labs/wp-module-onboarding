import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
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
