import {
	HiiveAnalytics,
	HiiveEvent,
} from '@newfold-labs/js-utility-ui-analytics';
import { HIIVE_ANALYTICS_CATEGORY } from '../../../constants';

export const trackHiiveEvent = ( action, value ) => {
	const data = {
		value,
		timestamp: Date.now(),
	};
	if ( 'pageview' === action ) {
		data.page = value;
	}
	const hiiveEvent = new HiiveEvent( HIIVE_ANALYTICS_CATEGORY, action, data );

	HiiveAnalytics.track( hiiveEvent );
};
