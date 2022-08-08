import apiFetch from '@wordpress/api-fetch';

export const trigger = () => {
	apiFetch( {
		url: `${ window.location.protocol }//${ window.location.host }/wp-cron.php`,
		method: 'GET',
          parse: false
	} ).catch( ( error ) => {
		console.error( error );
	} );
};
