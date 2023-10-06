import { onboardingRestURL } from './common';
import { resolve } from './resolve';

import apiFetch from '@wordpress/api-fetch';

export async function setComingSoon( comingSoon ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'settings/coming-soon' ),
			method: 'POST',
			data: {
				comingSoon,
			},
		} ).then()
	);
}
