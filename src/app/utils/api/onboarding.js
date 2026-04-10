import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';
import { fireWpCron } from './';

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

export const updateOnboardingLogogenSlice = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'redux-state/logogen-slice' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

export const updateOnboardingBlueprintsSlice = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'redux-state/blueprints-slice' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

export const continuouslyFireWpCron = () => {
	setInterval( () => {
		fireWpCron();
	}, 30000 );
};

export const startOnboarding = async ( data = {} ) => {
	continuouslyFireWpCron();
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'app/start' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};

export const completeOnboarding = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'app/complete' ),
			method: 'POST',
		} ).then()
	);
};

export const enableJetpackModules = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'app/enable-jetpack-modules' ),
			method: 'POST',
		} ).then()
	);
};

/**
 * Disable the site coming soon page.
 *
 * @return {Promise<boolean>} true if the coming soon page was disabled successfully, false otherwise
 */
export const disableComingSoon = async () => {
	const comingSoon = window?.NewfoldRuntime.comingSoon;
	if ( comingSoon ) {
		const result = await comingSoon.disable();
		if ( result?.success ) {
			return true;
		}
		// eslint-disable-next-line no-console
		console.error( 'Failed to disable coming soon' );
		return false;
	}
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
/**
 * Set global styles (typography, font sizes, element styles) from a sitekit.
 *
 * @param {Object} globalStyles The global styles object with 'styles' and/or 'settings' keys.
 * @return {Promise<Object>} response
 */
export const setGlobalStyles = async ( globalStyles ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'global-styles/set-global-styles' ),
			method: 'POST',
			data: {
				global_styles: globalStyles,
			},
		} ).then()
	);
};

/**
 * Install fonts from a font pair via server-side download.
 *
 * @param {Object} fontPair The font pair data with primary and secondary fonts.
 * @return {Promise<Object>} response
 */
export const installFonts = async ( fontPair ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'global-styles/install-fonts' ),
			method: 'POST',
			data: {
				font_pair: fontPair,
			},
		} ).then()
	);
};

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
 * @param {string}  siteType
 * @param {boolean} skipCache
 * @return {Promise<Object>} response
 */
export async function getSiteMetaForIdentifier( identifier, prompt, siteType, skipCache = true ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/generate' ),
			method: 'POST',
			data: {
				site_info: prompt,
				identifier,
				site_type: siteType,
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
 * @param {string} siteType
 * @return {Promise<Object>} response
 */
export async function getHomepages( prompt, siteType ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/homepages' ),
			method: 'POST',
			data: {
				site_description: prompt,
				site_type: siteType,
			},
		} )
	);

	return response;
}

/**
 * Get the rest of the site pages (not the homepages).
 *
 * @param {string} prompt
 * @param {string} siteType
 * @return {Promise<Object>} response
 */
export async function getSitePages( prompt, siteType ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/pages/sitemap' ),
			method: 'POST',
			data: {
				site_description: prompt,
				site_type: siteType,
			},
		} ).then()
	);
}

export async function setupSiteNavigationMenu( siteType = '' ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/setup-nav-menu' ),
			method: 'POST',
			data: {
				site_type: siteType,
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

/**
 * Get a batch of logos.
 *
 * @param {string} siteTitle
 * @param {string} prompt
 * @param {string} locale
 * @return {Promise<Object>} response
 */
export async function getLogos( siteTitle, prompt, locale ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'logogen/generate' ),
			method: 'POST',
			data: {
				site_title: siteTitle,
				site_description: prompt,
				locale,
			},
		} )
	);

	return response;
}

/**
 * Get more logos.
 *
 * @param {string} referenceId
 * @return {Promise<Object>} response
 */
export async function getMoreLogos( referenceId ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'logogen/generate/more' ),
			method: 'POST',
			data: {
				reference_id: referenceId,
			},
		} )
	);

	return response;
}

/**
 * Get the status of a logogen batch.
 *
 * @param {string} referenceId
 * @return {Promise<Object>} response
 */
export async function getLogogenStatus( referenceId ) {
	const response = await resolve(
		apiFetch( {
			url: onboardingRestURL( 'logogen/generate/status' ),
			method: 'POST',
			data: {
				reference_id: referenceId,
			},
		} )
	);

	return response;
}

/**
 * Select a logo.
 *
 * @param {string} logoReferenceId
 * @return {Promise<Object>} response
 */
export const selectLogo = async ( logoReferenceId ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'logogen/generate/select' ),
			method: 'POST',
			data: {
				logo_reference_id: logoReferenceId,
			},
		} ).then()
	);
};

/**
 * Get the blueprints.
 *
 * @return {Promise<Object>} response
 */
export const getBlueprints = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'blueprints/get-blueprints' ),
			method: 'POST',
		} ).then()
	);
};

/**
 * Install the required plugins for a blueprint.
 *
 * @param {string} selectedBlueprintSlug
 * @return {Promise<Object>} response
 */
export const installBlueprintRequiredPlugins = async ( selectedBlueprintSlug ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'blueprints/install-required-plugins' ),
			method: 'POST',
			data: {
				selected_blueprint_slug: selectedBlueprintSlug,
			},
		} ).then()
	);
};

/**
 * Import a blueprint.
 *
 * @param {string} selectedBlueprintSlug
 * @return {Promise<Object>} response
 */
export const importBlueprint = async ( selectedBlueprintSlug ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'blueprints/import-blueprint' ),
			method: 'POST',
			data: {
				selected_blueprint_slug: selectedBlueprintSlug,
			},
		} ).then()
	);
};

/**
 * Report the published site.
 *
 * @return {Promise<Object>} response
 */
export const reportSiteGenPublished = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'sitegen/report-published' ),
			method: 'POST',
		} ).then()
	);
};
