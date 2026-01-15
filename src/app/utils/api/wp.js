import apiFetch from '@wordpress/api-fetch';
import { wpRestURL as wpRestApiURL, wpSiteUrl } from '@/data/constants';
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

export const fireWpCron = () => {
	apiFetch( {
		url: `${ wpSiteUrl }/wp-cron.php`,
		method: 'GET',
		parse: false,
	} ).catch( ( error ) => {
		// eslint-disable-next-line no-console
		console.error( error );
	} );
};
