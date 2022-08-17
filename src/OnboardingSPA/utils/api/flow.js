import { resolve } from './resolve';
import { onboardingRestBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export async function getFlow() {
	return await resolve(
		apiFetch( { url: `${ onboardingRestBase }/flow` } ).then()
	);
}

export async function setFlow( data ) {
	return await resolve(
		apiFetch( {
			url: `${ onboardingRestBase }/flow`,
			method: 'POST',
			data,
		} ).then()
	);
}
