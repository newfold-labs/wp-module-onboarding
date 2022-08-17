import apiFetch from '@wordpress/api-fetch';
import { wpSiteUrl } from '../../../constants';

export const trigger = () => {
	apiFetch( {
		url: `${ wpSiteUrl }/wp-cron.php`,
		method: 'GET',
		parse: false,
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
