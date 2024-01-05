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

export async function getRegeneratedHomePagePreviews(
	siteDescription,
	regenerate = true,
	slug,
	colorPalettes,
	isFavourited
) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/get-homepages-regenerate' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
				regenerate,
				slug,
				colorPalettes,
				isFavourited,
			},
		} ).then()
	);
}

export async function toggleFavoriteHomepage( slug ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/favourites' ),
			method: 'POST',
			data: {
				slug,
			},
		} ).then()
	);
}
