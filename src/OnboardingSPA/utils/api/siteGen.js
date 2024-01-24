import apiFetch from '@wordpress/api-fetch';

import { resolve } from './resolve.js';
import { onboardingRestURL } from './common';

export async function getSiteGenIdentifiers() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/identifiers' ),
		} ).then()
	);
}

export async function generateSiteGenMeta(
	siteInfo,
	identifier,
	skipCache = true
) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/generate' ),
			method: 'POST',
			data: {
				site_info: siteInfo,
				identifier,
				skip_cache: skipCache,
			},
		} ).then()
	);
}

export async function getHomepages( siteDescription ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/homepages' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
			},
		} ).then()
	);
}

export async function regenerateHomepage(
	siteDescription,
	slug,
	palette,
	isFavorite
) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/homepages/regenerate' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
				slug,
				palette,
				isFavorite,
			},
		} ).then()
	);
}

export async function getSiteDetailsQuestionare() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/site-details-meta' ),
		} ).then()
	);
}

export async function getCustomizeSidebarData() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/customize-data' ),
		} ).then()
	);
}
