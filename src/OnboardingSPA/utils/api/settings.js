import apiFetch from '@wordpress/api-fetch';

import { baseAPI } from './commonAPI';
import { resolve } from './resolve.js';
import { MAX_RETRIES_SETTINGS_INIT } from '../../../constants';

export async function getSettings() {
	return await resolve( apiFetch( { url: `${ baseAPI }settings` } ).then() );
}

export async function setSettings( data ) {
	return await resolve(
		apiFetch( { url: `${ baseAPI }settings`, method: 'POST', data } ).then()
	);
}

export const initialize = ( retries = 0 ) => {
	if ( retries >= MAX_RETRIES_SETTINGS_INIT ) {
		return false;
	}
	return apiFetch( {
		url: `${ baseAPI }settings/initialize`,
		method: 'POST',
	} ).catch( () => {
		retries = retries + 1;
		initialize( retries );
	} );
};
