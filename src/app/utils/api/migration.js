import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';

export const migrationRestRoute = 'newfold-migration/v1';
export const migrateRestBase = `${ wpRestURL }/${ migrationRestRoute }`;

export const migrateRestURL = ( api ) => {
	return `${ migrateRestBase }/${ api }`;
};

export async function getSiteMigrateUrl() {
	return await resolve(
		apiFetch( {
			url: migrateRestURL( 'migrate/connect' ),
		} ).then()
	);
}
