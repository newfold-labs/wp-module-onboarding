import { onboardingRestBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export const init = () => {
	apiFetch( {
		url: `${ onboardingRestBase }/themes/initialize&flow=${ window.nfdOnboarding.currentFlow }`,
		method: 'POST',
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
