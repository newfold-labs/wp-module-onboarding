import apiFetch from '@wordpress/api-fetch';
import { wpRestURL, onboardingRestBase } from '@/data/constants';

const wcRestBase = `${ wpRestURL }/wc/v3`;

/**
 * Check if WooCommerce is active (and optionally activate it).
 *
 * Calls the onboarding endpoint which:
 *  - Returns {status: 'active'} (200) if WooCommerce is already active.
 *  - Activates the plugin synchronously if installed but inactive, then returns {status: 'active'}.
 *  - Triggers the install queue and returns {status: 'installing'} (202) if not installed.
 *
 * @return {Promise<{status: 'active'|'installing'}>}
 */
export async function setupWooCommerce() {
	return apiFetch( {
		url: `${ onboardingRestBase }/app/setup-woocommerce`,
		method: 'POST',
	} );
}

/**
 * Create or retrieve a WooCommerce product category by name.
 *
 * If WooCommerce returns a 400 term_exists error the existing term ID is
 * extracted from the error response and returned transparently.
 *
 * @param {string} name Category name.
 * @return {Promise<number|null>} Term ID or null on unrecoverable error.
 */
async function createOrGetProductCategory( name ) {
	try {
		const cat = await apiFetch( {
			url: `${ wcRestBase }/products/categories`,
			method: 'POST',
			data: { name },
		} );
		return cat?.id ?? null;
	} catch ( error ) {
		// WC returns {code: 'term_exists', data: {status: 400, term_id: 123}}
		if ( error?.data?.term_id ) {
			return error.data.term_id;
		}
		return null;
	}
}

/**
 * Create a WooCommerce product.
 *
 * The featured_image URL is stored as nfd_image_url post meta so that
 * MediaService::sideload_pending_images() can process it asynchronously
 * after onboarding completes (the same pattern used for articles/services).
 *
 * @param {Object} product
 * @param {string}   product.name
 * @param {string}   product.short_description
 * @param {number}   product.price
 * @param {string[]} product.categories
 * @param {string}   product.featured_image
 * @return {Promise<Object>} The created WooCommerce product object.
 */
export async function createProduct( product ) {
	const {
		name,
		short_description = '',
		price = 0,
		categories = [],
		featured_image,
	} = product;

	// Resolve category IDs (create missing ones, reuse existing ones).
	const categoryIds = [];
	for ( const catName of categories ) {
		const id = await createOrGetProductCategory( catName );
		if ( id ) {
			categoryIds.push( id );
		}
	}

	const data = {
		name,
		short_description,
		regular_price: String( price ),
		status: 'publish',
		...( categoryIds.length
			? { categories: categoryIds.map( ( id ) => ( { id } ) ) }
			: {} ),
		meta_data: [
			{ key: 'nfd_onboarding_generated', value: '1' },
			...( featured_image ? [ { key: 'nfd_image_url', value: featured_image } ] : [] ),
		],
	};

	return apiFetch( {
		url: `${ wcRestBase }/products`,
		method: 'POST',
		data,
	} );
}
