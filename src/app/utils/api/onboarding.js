import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from '@/data/constants';
import { resolve } from '@/utils/helpers';

export const onboardingRestRoute = 'newfold-onboarding/v1';
export const onboardingRestBase = `${ wpRestURL }/${ onboardingRestRoute }`;

export const onboardingRestURL = ( api ) => {
	return `${ onboardingRestBase }/${ api }`;
};

export const getOnboardingInputSlice = async () => {
	const response = await fetch( onboardingRestURL( 'input-slice' ) );
	const data = await response.json();
	return data;
};

export const updateOnboardingInputSlice = async ( data ) => {
	return await resolve(
		apiFetch( {
			url: onboardingRestURL( 'redux-state/input-slice' ),
			method: 'POST',
			body: JSON.stringify( data ),
		} ).then()
	);
};
