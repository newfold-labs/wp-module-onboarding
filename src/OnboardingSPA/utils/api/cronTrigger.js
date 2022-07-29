import apiFetch from '@wordpress/api-fetch';

export const trigger = () => {
	apiFetch( {
		url: `${ window.location.protocol }//${ window.location.host }/wp-cron.php`,
		method: 'GET',
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
