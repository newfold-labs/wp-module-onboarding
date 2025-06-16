import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';

export const onboardingRestRoute = 'newfold-onboarding/v1';
export const onboardingRestBase = `${ wpRestURL }/${ onboardingRestRoute }`;

export const onboardingRestURL = ( api ) => {
	return `${ onboardingRestBase }/${ api }`;
};

export const getOnboardingInputSlice = async () => {
	const response = await fetch( onboardingRestURL( 'input-slice' ) );
	const data = await response.json();
	return data;
};

export const updateOnboardingInputSlice = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'redux-state/input-slice' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

export const updateOnboardingSiteGenSlice = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'redux-state/sitegen-slice' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

/**
 * Get the site meta for a given identifier.
 *
 * @param {string}  identifier
 * @param {string}  prompt
 * @param {string}  locale
 * @param {boolean} skipCache
 * @return {Promise<Object>} response
 */
export async function getSiteMetaForIdentifier(
	identifier,
	prompt,
	locale,
	skipCache = true
) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/generate' ),
			method: 'POST',
			data: {
				site_info: prompt,
				identifier,
				locale,
				skip_cache: skipCache,
			},
		} )
	);

	return response;
}

/**
 * Get the homepages.
 *
 * @param {string} prompt
 * @param {string} locale
 * @return {Promise<Object>} response
 */
export async function getHomepages( prompt, locale ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/homepages' ),
			method: 'POST',
			data: {
				site_description: prompt,
				locale,
			},
		} )
	);

	return response;
}

/**
 * Get the iframe src for a preview.
 *
 * @param {string} content
 * @param {string} slug
 * @return {Promise<Object>} response
 */
export async function getPreviewIframeSrc( content, slug ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'block-render/iframe-src' ),
			method: 'POST',
			data: {
				content,
				slug,
			},
		} )
	);

	return response;
}
