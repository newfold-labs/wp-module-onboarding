import { QUERY_PARAMS, VALID_REFERRERS } from './constants';

/**
 * Check if we should apply our customizations
 * @return {boolean} Whether to apply customizations
 */
export const shouldApplyCustomizations = () => {
	const urlParams = new URLSearchParams( window.location.search );
	const referrer = urlParams.get( QUERY_PARAMS.REFERRER );
	return VALID_REFERRERS.includes( referrer );
};

/**
 * Set canvas mode to edit via URL parameter
 */
export const setDefaultCanvasMode = () => {
	const urlParams = new URLSearchParams( window.location.search );
	if ( ! urlParams.has( QUERY_PARAMS.CANVAS_MODE ) ) {
		urlParams.set( QUERY_PARAMS.CANVAS_MODE, 'edit' );
		const newUrl = `${ window.location.pathname }?${ urlParams.toString() }${
			window.location.hash
		}`;
		window.history.replaceState( {}, '', newUrl );
	}
};
