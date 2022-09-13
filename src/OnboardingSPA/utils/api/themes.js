import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';
import { resolve } from './resolve';

const init = () => {
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

export { init, getGlobalStyles };
