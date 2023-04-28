import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

export async function getSiteClassifications( ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				`site-classification`
			),
		} ).then()
	);
}
