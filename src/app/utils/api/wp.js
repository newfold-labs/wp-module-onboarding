import apiFetch from '@wordpress/api-fetch';
import { wpRestURL as wpRestApiURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';

export const wpRestRoute = 'wp/v2';
export const wpRestBase = `${ wpRestApiURL }/${ wpRestRoute }`;

export const wpRestURL = ( api ) => {
	return `${ wpRestBase }/${ api }`;
};

export async function getWpSettings() {
	return await resolve(
		apiFetch( {
			url: wpRestURL( 'settings' ),
		} ).then()
	);
}
