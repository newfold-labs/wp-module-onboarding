import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';

export const init = () => {
	apiFetch( {
		url: onboardingRestURL( 'plugins/initialize' ),
		method: 'POST',
		headers: {
			'X-NFD-ONBOARDING': window.nfdOnboarding.pluginInstallHash,
		},
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
