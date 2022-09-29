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

const getGlobalStyles = async () => {
	return await resolve(
		apiFetch( { url: onboardingRestURL( 'themes/variations' ) } ).then()
	);
};

const getThemeStatus = async ( theme ) => {
    return await resolve(
        apiFetch( { url: onboardingRestURL( 'themes/status' + ( theme ? `&theme=${theme}` : '' ) ) } )
    )
}

export { init, getGlobalStyles, getThemeStatus };
