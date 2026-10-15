import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';
import { fireWpCron } from './';

export const onboardingRestRoute = 'newfold-onboarding/v1';
export const onboardingRestBase = `${ wpRestURL }/${ onboardingRestRoute }`;

export const onboardingRestURL = ( api ) => {
	return `${ onboardingRestBase }/${ api }`;
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

export async function setupSiteNavigationMenu( siteType = '', pages = [] ) {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'site-content/setup-nav-menu' ),
			method: 'POST',
			data: {
				site_type: siteType,
				pages,
			},
		} ).then()
	);
}

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
