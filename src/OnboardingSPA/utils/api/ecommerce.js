import apiFetch from '@wordpress/api-fetch';

export const isEmpty = (object) => Object.keys(object).length === 0;

export async function fetchWPSettings() {
	return apiFetch({ path: '/wp/v2/settings' });
}

export async function updateWPSettings(data) {
	return apiFetch({ path: '/wp/v2/settings', method: 'POST', data });
}
