import apiFetch from '@wordpress/api-fetch';
import { resolve } from './resolve.js';
import { onboardingRestURL, migrateRestURL } from './common';

export async function getSiteGenIdentifiers() {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/identifiers' ),
		} ).then()
	);
}

export async function refineSiteDescription( siteDescription, siteId ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/refine_description' ),
			method: 'POST',
			data: {
				site_id: siteId,
				site_description: siteDescription,
			},
		} )
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
		} )
	);
}

export async function getHomepages( siteDescription, siteId ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/homepages' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
				site_id: siteId,
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

export async function publishSitemapPages( siteDescription ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/pages/sitemap' ),
			method: 'POST',
			data: {
				site_description: siteDescription,
			},
		} ).then()
	);
}

export async function getSiteMigrateUrl() {
	return await resolve(
		apiFetch( {
			url: migrateRestURL( 'migrate/connect' ),
		} ).then()
	);
}
