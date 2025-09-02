import { dispatch, select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { getBlueprints } from '@/utils/api';

/**
 * Fetch the blueprints.
 */
const fetchBlueprints = async () => {
	// If the blueprints are already fetched, return.
	const blueprints = select( nfdOnboardingStore ).getBlueprints();
	if ( blueprints.length > 0 ) {
		return;
	}

	// Fetch the blueprints.
	getBlueprints().then( ( response ) => {
		if ( ! response || response.error || ! Array.isArray( response.body ) ) {
			// eslint-disable-next-line no-console
			console.error( response.error );
		} else {
			// Put the results in the store.
			dispatch( nfdOnboardingStore ).setBlueprints( response.body );

			// Pre-download the preview images to avoid flickering.
			const images = response.body.map( ( blueprint ) => {
				return blueprint.screenshot_url;
			} );
			Promise.allSettled(
				images.map( ( imageUrl ) => {
					return new Promise( ( resolve, reject ) => {
						// eslint-disable-next-line no-undef
						const img = new Image();
						img.onload = () => resolve( imageUrl );
						img.onerror = () => reject( imageUrl );
						img.src = imageUrl;
					} );
				} )
			);
		}
	} );
};

export default fetchBlueprints;
