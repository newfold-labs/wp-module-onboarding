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

export const startOnboarding = async ( data = {} ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'app/start' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

export const completeOnboarding = async ( data = {} ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'app/complete' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

/**
 * Set a color palette array of WordPress color objects.
 *
 * @param {Array} colorPalette The color palette to set.
 * @return {Promise<Object>} response
 *
 * @example
 * const colorPalette = [
 *   {
 *     name: 'Accent 1',
 *     slug: 'accent-1',
 *     color: '#196BDE'
 *   },
 *   {
 *     name: 'Accent 2',
 *     slug: 'accent-2',
 *     color: '#FCD34D'
 *   },
 *   ...
 * ];
 *
 * await globalStylesSetColorPalette( colorPalette );
 */
export const setGlobalStylesColorPalette = async ( colorPalette ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'global-styles/set-color-palette' ),
			method: 'POST',
			data: {
				color_palette: colorPalette,
			},
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
 * Get the rest of the site pages (not the homepages).
 *
 * @param {string} prompt
 * @param {string} locale
 * @return {Promise<Object>} response
 */
export async function getSitePages( prompt, locale ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/pages/sitemap' ),
			method: 'POST',
			data: {
				site_description: prompt,
				locale,
			},
		} ).then()
	);
}

/**
 * Get the snapshot data for a preview.
 *
 * @param {string} content
 * @param {string} slug
 * @param {string} customStyles
 * @return {Promise<Object>} response
 */
export async function getSiteGenPreviewSnapshot( content, slug, customStyles = null ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'previews/snapshot' ),
			method: 'POST',
			data: {
				content,
				slug,
				custom_styles: customStyles,
			},
		} )
	);

	return response;
}
