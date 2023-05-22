import { removeQueryArgs, hasQueryArg } from '@wordpress/url';

export const getQueryParam = ( paramName ) => {
	const urlParams = new URLSearchParams( window.location.search );
	return urlParams.get( paramName );
};

export const removeQueryParam = ( url, paramName ) => {
	if ( hasQueryArg( url, paramName ) ) {
		return removeQueryArgs( url, paramName );
	}
	return url;
};
