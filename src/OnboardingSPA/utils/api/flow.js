import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

let abortControllerSetFlow;

export async function getFlow() {
	return await resolve(
		apiFetch( { url: onboardingRestURL( 'flow' ) } ).then()
	);
}

export async function setFlow( data ) {
	if ( abortControllerSetFlow ) {
		abortControllerSetFlow.abort( 'New setFlow request placed!' );
	}

	abortControllerSetFlow = new AbortController();
	const { signal } = abortControllerSetFlow;

	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'flow' ),
			signal,
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

export async function switchFlow( flow ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'flow/switch' ),
			method: 'POST',
			data: {
				flow,
			},
		} ).then()
	);
}
