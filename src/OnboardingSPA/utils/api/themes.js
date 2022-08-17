import { onboardingRestBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export const init = () => {
	apiFetch( {
		url: `${ onboardingRestBase }/themes/initialize`,
		method: 'POST',
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
