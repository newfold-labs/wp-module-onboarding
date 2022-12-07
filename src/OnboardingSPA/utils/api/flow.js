import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

export async function getFlow() {
	return await resolve(
		apiFetch( { url: onboardingRestURL( 'flow' ) } ).then()
	);
}

export async function setFlow( data ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'flow' ),
			method: 'POST',
			data,
		} ).then()
	);
}

export async function completeFlow() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'flow/complete' ),
			method: 'POST',
		} ).then()
	);
}
