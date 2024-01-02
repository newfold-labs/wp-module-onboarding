import apiFetch from '@wordpress/api-fetch';

import { resolve } from './resolve.js';
import { onboardingRestURL } from './common';

export async function getSiteGenIdentifiers() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/get-identifiers' ),
		} ).then()
	);
}

export async function generateSiteGenMeta(
	siteInfo,
	identifier,
	skipCache = false
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

export async function getCustomizeSidebarData() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/customize-data' ),
		} ).then()
	);
}
export async function getHomePagePreviews(
	siteDescription,
	regenerate = false
) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/get-homepages' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
				regenerate,
			},
		} ).then()
	);
}
