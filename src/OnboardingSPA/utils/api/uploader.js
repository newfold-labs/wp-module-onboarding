import { resolve } from './resolve';
import { wpRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

function readFileDataAsBase64( file ) {
	return new Promise( ( resolve, reject ) => {
		// Create file reader
		const reader = new FileReader();

		// Register event listeners
		reader.addEventListener( 'loadend', ( e ) =>
			resolve( e.target.result )
		);
		reader.addEventListener( 'error', reject );

		// Read file
		reader.readAsArrayBuffer( file );
	} );
}

export async function uploadImage( file ) {
	const data = await readFileDataAsBase64( file );

	const headers = {};
	headers[ 'Content-Type' ] = 'image/png';
	headers[ 'Content-Disposition' ] = 'attachment; filename=' + file.name;

	return await resolve(
		apiFetch( {
			url: wpRestURL( 'media' ),
			method: 'POST',
			headers,
			body: data,
		} )
	);
}
