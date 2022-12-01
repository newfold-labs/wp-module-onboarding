import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

export async function getPatterns( step = false, squash = false ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				`patterns` +
					( step ? `&step=${ step }&squash=${ squash }` : '' )
			),
		} ).then()
	);
}

export async function getHeaderMenuPatterns() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				`patterns/header`
			),
		} ).then()
	);
}

export async function getDefaultHeaderMenu() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				`patterns/header/default`
			),
		} ).then()
	);
}

export async function getHeaderMenuPreview( slug ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				`patterns/header/preview` +
					( slug ? `&slug=${ slug }` : '' )
			),
		} ).then()
	);
}