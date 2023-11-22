import apiFetch from '@wordpress/api-fetch';

import { resolve } from './resolve.js';
import { onboardingRestURL } from './common';

export async function generateSiteGenMeta( data ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/generate' ),
			method: 'POST',
			data,
		} ).then()
	);
}
