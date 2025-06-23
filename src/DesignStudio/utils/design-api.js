/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Fetches paginated color palettes or font pairs from the WordPress REST API
 *
 * @async
 * @param {Object} options                            - The fetch options
 * @param {string} options.type                       - The type of data to fetch ('color-palettes' or 'font-pairs')
 * @param {string} [options.referer='nfd-onboarding'] - The referer value ('nfd-onboarding' or 'nfd-plugin')
 * @param {number} [options.page=1]                   - The page number to fetch
 * @param {number} [options.perPage=10]               - Number of items per page
 * @return {Promise<Object>} The paginated data with metadata
 * @throws {Error} If the fetch request fails
 */
export async function fetchDesignSettings( {
	type,
	referer = 'nfd-onboarding',
	page = 1,
	perPage = 10,
} ) {
	if ( ! type || ! [ 'color-palettes', 'font-pairs' ].includes( type ) ) {
		throw new Error( 'Invalid type. Must be either "color-palettes" or "font-pairs"' );
	}

	try {
		const response = await apiFetch( {
			path: `/newfold-onboarding/v1/design/${ type }?page=${ page }&per_page=${ perPage }`,
			headers: {
				Referer: referer,
			},
		} );

		return {
			data: response.data || [],
			pagination: response.pagination || {
				total_items: 0,
				total_pages: 0,
				current_page: page,
				per_page: perPage,
			},
		};
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( `Failed to fetch ${ type }:`, error );
		throw error;
	}
}
