import apiFetch from '@wordpress/api-fetch';
import { wpRestURL } from './common';

export const isEmpty = ( object ) => Object.keys( object ).length === 0;

export async function fetchWPSettings() {
	return apiFetch( { url: wpRestURL( 'settings' ) } );
}

export async function updateWPSettings( data ) {
	return apiFetch( { url: wpRestURL( 'settings' ), method: 'POST', data } );
}
