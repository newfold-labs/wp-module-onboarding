import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';
import { getQueryParam } from '../index';
import { resolve } from './resolve';
import { NFD_PLUGINS_QUERY_PARAM } from '../../../constants';

export const init = () => {
	// Backend should have done the initialization if this param is present.
	if ( getQueryParam( NFD_PLUGINS_QUERY_PARAM ) ) {
		return true;
	}
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

export const getPluginStatus = async ( plugin ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL(
				'plugins/status' + ( plugin ? `&plugin=${ plugin }` : '' )
			),
		} )
	);
};

export const getCustomPluginsList = async () => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'features' ),
		} )
	);
};
