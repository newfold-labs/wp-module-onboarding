import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';

export const init = () => {
	apiFetch( {
		url: onboardingRestURL( 'themes/initialize' ),
		method: 'POST',
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
