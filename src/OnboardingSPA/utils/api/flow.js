import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

let abortController = undefined;

export async function getFlow() {
	if( abortController ) {
		abortController.abort();
	}
	abortController = new AbortController()
  	const { signal } = abortController;

	return await resolve(
		apiFetch( { url: onboardingRestURL( 'flow' ), signal: signal } ).then()
	);
}

export async function setFlow( data ) {
	if( abortController ) {
		abortController.abort();
	}
	abortController = new AbortController()
  	const { signal } = abortController;

	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'flow' ),
			signal: signal,
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
