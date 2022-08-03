import { baseAPI } from './commonAPI';

import apiFetch from '@wordpress/api-fetch';

export const init = () => {
	apiFetch( {
		url: `${ baseAPI }plugins/initialize&flow=${window.nfdOnboarding.currentFlow}`,
		method: 'POST',
		headers: {
			'X-NFD-ONBOARDING': window.nfdOnboarding.pluginInstallHash,
		},
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
