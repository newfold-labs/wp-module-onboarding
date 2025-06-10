import apiFetch from '@wordpress/api-fetch';
import buildRequestUrl from './buildRequestUrl';

/*
 * Fetches the available languages from the WordPress installation.
 *
 * @return {Promise<Array>} Promise that resolves to an array of language data
 */
export const fetchLanguages = async () => {
	const requestUrl = buildRequestUrl( 'languages' );
	try {
		const response = await apiFetch( { url: requestUrl } );

		// Validate response format
		if ( response?.languages?.length ) {
			return response.languages;
		}

		// invalid response format
		return [];
	} catch ( error ) {
		// Return a basic fallback with English
		return [
			{
				code: 'en_US',
				name: 'English (United States)',
				native_name: 'English (United States)',
			},
		];
	}
};

/*
 * Formats language data for the language selection component.
 * Returns array of [language_name, language_code] pairs.
 *
 * @param {Array} languages Array of language objects
 * @return {Array} Array formatted for the LanguageSelection component
 */
export const formatLanguagesForSelection = ( languages ) => {
	if ( ! languages?.length ) {
		// Return basic English if input isn't valid
		return [ [ 'English (United States)', 'en_US' ] ];
	}

	return languages.map( ( language ) => [ language.name, language.code ] );
};
