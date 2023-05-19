import { HiiveAnalytics, HiiveEvent } from '@newfold-labs/js-utility-ui-analytics';
import { HIIVE_ANALYTICS_CATEGORY } from '../../../constants';

export const trackHiiveEvent = ( action, value ) => {
	const hiiveEvent = new HiiveEvent( HIIVE_ANALYTICS_CATEGORY, action, {
		value,
		timestamp: Date.now(),
	} );

	HiiveAnalytics.track( hiiveEvent );
};
