import { resolve } from './resolve';
import { wpSiteUrl } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export async function setComingSoon( comingSoon ) {
	const data = { comingSoon };
	return await resolve(
		apiFetch( {
			url: wpSiteUrl + '/index.php?rest_route=/bluehost/v1/settings',
			method: 'POST',
			data,
		} ).then()
	);
}
