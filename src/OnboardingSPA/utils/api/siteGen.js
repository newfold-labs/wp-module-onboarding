import apiFetch from '@wordpress/api-fetch';
// import { addQueryArgs } from '@wordpress/url';

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

/* export async function getHomePagePreviews( siteDescription, regenerate ) {
	// Construct the query parameters
	const queryParams = {};
	if ( siteDescription !== undefined ) {
		queryParams.site_description = siteDescription;
	}
	if ( regenerate !== undefined ) {
		queryParams.regenerate = regenerate;
	}

	// Create the URL with query parameters
	const url = addQueryArgs(
		onboardingRestURL( 'sitegen/get-homepages' ),
		queryParams
	);

	// Make the apiFetch call
	try {
		const homePagePreviews = await apiFetch( { path: url } );
		console.log( 'HomePage Previews:', homePagePreviews );
		return homePagePreviews;
	} catch ( error ) {
		console.error( 'Error fetching home page previews:', error );
		throw error;
	}
}
 */

export async function getHomePagePreviews( siteDescription, regenerate ) {
	// Construct the base URL
	const baseUrl = onboardingRestURL( 'sitegen/get-homepages' );

	// Construct query parameters
	const queryParams = new URLSearchParams();
	if ( siteDescription !== undefined ) {
		queryParams.append( 'site_description', siteDescription );
	}
	if ( regenerate !== undefined ) {
		queryParams.append( 'regenerate', regenerate );
	}

	// Create the full URL with query parameters
	const url = `${ baseUrl }&${ queryParams }`;

	// Log the URL to the console for verification
	console.log( 'Fetching URL:', url );

	// Make the fetch call and return the JSON response
	try {
		const response = await fetch( url );
		if ( ! response.ok ) {
			throw new Error( `HTTP error! status: ${ response.status }` );
		}
		const data = await response.json();
		console.log( 'HomePage Previews:', data );
		return data;
	} catch ( error ) {
		console.error( 'Error fetching home page previews:', error );
		throw error;
	}
}
