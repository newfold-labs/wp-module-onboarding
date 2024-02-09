import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';
import { resolve } from './resolve.js';

export async function blockRenderScreenshot( content ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'block-render/screenshot' ),
			method: 'POST',
			data: {
				width: 1200,
				height: 900,
				content,
			},
		} ).then()
	);
}
