import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';
import { getQueryParam } from '../index';
import { NFD_THEMES_QUERY_PARAM } from '../../../constants';

export const init = () => {
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
