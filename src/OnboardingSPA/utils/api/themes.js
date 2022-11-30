import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';
import { resolve } from './resolve';
import { getQueryParam } from '../index';
import { NFD_THEMES_QUERY_PARAM } from '../../../constants';

const init = () => {
	// Backend should have done the initialization if this param is present.
	if ( getQueryParam( NFD_THEMES_QUERY_PARAM ) ) {
		return true;
	}
	apiFetch( {
		url: onboardingRestURL( 'themes/initialize' ),
		method: 'POST',
	} ).catch( ( error ) => {
		console.error( error );
	} );
};

const getGlobalStyles = async ( variations = false ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				'themes/variations&variations=' + variations
			),
		} ).then()
	);
};

const setGlobalStyles = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'themes/variations' ),
			method: 'POST',
			data,
		} ).then()
	);
};

const getThemeStatus = async ( theme ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				'themes/status' + ( theme ? `&theme=${ theme }` : '' )
			),
		} )
	);
};

const getThemeFonts = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'themes/fonts' ),
		} )
	);
};

const getThemeColors = async ( theme ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'themes/colors' ),
		} )
	);
};

export {
	init,
	getGlobalStyles,
	setGlobalStyles,
	getThemeStatus,
	getThemeColors,
	getThemeFonts,
};
