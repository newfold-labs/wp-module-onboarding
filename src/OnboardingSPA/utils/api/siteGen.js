import apiFetch from '@wordpress/api-fetch';

import { resolve } from './resolve.js';
import { onboardingRestURL } from './common';

export async function generateSiteGenMeta(
	site_info,
	identifier,
	skip_cache = false
) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/generate' ),
			method: 'POST',
			data: {
				site_info,
				identifier,
				skip_cache,
			},
		} ).then()
	);
}
