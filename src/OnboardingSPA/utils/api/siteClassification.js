import { resolve } from './resolve';
import { onboardingRestURL } from './common';
import siteClassificationData from './siteClassification.json';

import apiFetch from '@wordpress/api-fetch';

export async function getSiteClassification() {
	const data = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'site-classification' ),
		} )
	);
	if ( data.body.length === 0 ) {
		return siteClassificationData;
	}

	return data;
}
