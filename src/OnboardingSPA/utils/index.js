import { removeQueryArgs, hasQueryArg } from '@wordpress/url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { transform, snakeCase } from 'lodash';

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

export const convertObjectKeysToSnakeCase = ( object ) => {
	return transform( object, ( result, value, key ) => {
		result[ snakeCase( key ) ] = value;
	} );
};
