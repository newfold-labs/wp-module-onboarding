import { resolve } from './resolve';
import { onboardingRestBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export async function getFlow() {
	return await resolve(
		apiFetch( { url: `${ onboardingRestBase }/flow&flow=${ window.nfdOnboarding.currentFlow }` } ).then()
	);
}

export async function setFlow( data ) {
	return await resolve(
		apiFetch( {
			url: `${ onboardingRestBase }/flow&flow=${ window.nfdOnboarding.currentFlow }`,
			method: 'POST',
			data,
		} ).then()
	);
}
