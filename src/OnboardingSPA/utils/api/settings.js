import apiFetch from '@wordpress/api-fetch';

import { resolve } from './resolve.js';
import { MAX_RETRIES_SETTINGS_INIT } from '../../../constants';
import { onboardingRestURL } from './common';

export async function getSettings() {
	return await resolve(
		apiFetch( { url: onboardingRestURL( 'settings' ) } ).then()
	);
}

export async function setSettings( data ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'settings' ),
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
		url: onboardingRestURL( 'settings/initialize' ),
		method: 'POST',
	} ).catch( () => {
		retries = retries + 1;
		initialize( retries );
	} );
};
