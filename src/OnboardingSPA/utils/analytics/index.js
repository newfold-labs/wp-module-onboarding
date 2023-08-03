import {
	HiiveAnalytics,
	HiiveEvent,
} from '@newfold-labs/js-utility-ui-analytics';
import { HIIVE_ANALYTICS_CATEGORY } from '../../../constants';

export const trackHiiveEvent = ( action, eventObj ) => {
	const data = {
		...eventObj,
		timestamp: Date.now(),
	};
	// if ( 'pageview' === action ) {
	// 	data.page = value;
	// }
	const hiiveEvent = new HiiveEvent(
		HIIVE_ANALYTICS_CATEGORY,
		action,
		data,
		HIIVE_ANALYTICS_CATEGORY
	);

	HiiveAnalytics.track( hiiveEvent );
};
