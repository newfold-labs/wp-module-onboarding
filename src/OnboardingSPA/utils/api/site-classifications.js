import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

export async function getSiteClassifications( ) {
    return await resolve(
		apiFetch( {
			url: 'https://hiive.cloud/workers/site-classification',
		} ).then()
	);
	// return await resolve(
	// 	apiFetch( {
	// 		url: onboardingRestURL(
	// 			`patterns` +
	// 				( step ? `&step=${ step }&squash=${ squash }` : '' )
	// 		),
	// 	} ).then()
	// );
}
