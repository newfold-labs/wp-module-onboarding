/**
 * Build a request URL for the Newfold Onboarding API.
 *
 * @param {string} endpoint - The API endpoint.
 * @return {string} The fully-qualified API URL.
 */
const buildRequestUrl = ( endpoint ) => {
	// Remove leading slash if it exists
	if ( endpoint.startsWith( '/' ) ) {
		endpoint = endpoint.substring( 1 );
	}

	// Get the WordPress site URL
	const wpApiSettings = window.wpApiSettings || {};
	const apiRoot = wpApiSettings.root || '/wp-json/';

	// Build the full API URL
	return `${ apiRoot }newfold-onboarding/v1/${ endpoint }`;
};

export default buildRequestUrl;
