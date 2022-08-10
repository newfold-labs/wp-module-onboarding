import apiFetch from '@wordpress/api-fetch';

export async function fetchWPSettings() {
	return apiFetch({ path: '/wp/v2/settings' });
}
