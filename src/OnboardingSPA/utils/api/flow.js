import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

let abortControllerGetFlow = undefined;
let abortControllerSetFlow = undefined;

export async function getFlow() {
	if( abortControllerGetFlow ) {
		abortControllerGetFlow.abort();
	}
	abortControllerGetFlow = new AbortController()
  	const { signal } = abortControllerGetFlow;

	return await resolve(
		apiFetch( { url: onboardingRestURL( 'flow' ), signal: signal } ).then()
	);
}

export async function setFlow( data ) {
	if( abortControllerSetFlow ) {
		abortControllerSetFlow.abort('New Request Placed!');

		if (abortControllerSetFlow.signal.aborted) {
			if (abortControllerSetFlow.signal.reason) {
				console.log(`Request aborted with reason: ${abortControllerSetFlow.signal.reason}`);
			} else {
				console.log("Request aborted but no reason was given.");
			}
		} else {
			console.log("Request not aborted");
		}
	}

	abortControllerSetFlow = new AbortController()
  	const { signal } = abortControllerSetFlow;

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
