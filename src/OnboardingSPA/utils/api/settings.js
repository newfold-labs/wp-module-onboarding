import apiFetch from '@wordpress/api-fetch';

import { onboardingRestBase } from '../../../constants';
import { resolve } from './resolve.js';
import { MAX_RETRIES_SETTINGS_INIT } from '../../../constants';

export async function getSettings() {
	return await resolve(
		apiFetch( { url: `${ onboardingRestBase }/settings` } ).then()
	);
}

export async function setSettings( data ) {
	return await resolve(
		apiFetch( {
			url: `${ onboardingRestBase }/settings`,
			method: 'POST',
			data,
		} ).then()
	);
}

export const initialize = ( retries = 0 ) => {
	if ( retries >= MAX_RETRIES_SETTINGS_INIT ) {
		return false;
	}
	return apiFetch( {
		url: `${ onboardingRestBase }/settings/initialize`,
		method: 'POST',
	} ).catch( () => {
		retries = retries + 1;
		initialize( retries );
	} );
};
