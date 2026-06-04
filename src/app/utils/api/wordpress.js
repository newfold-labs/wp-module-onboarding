import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { wpRestBase, onboardingRestBase } from '@/data/constants';

/**
 * Update WordPress site settings.
 *
 * @param {Object} settings Key-value pairs to update (title, description, etc.).
 * @return {Promise<Object>} Updated settings.
 */
export async function updateSiteSettings( settings ) {
	return apiFetch( {
		url: `${ wpRestBase }/settings`,
		method: 'POST',
		data: settings,
	} );
}

/**
 * Sideload media from an external URL into the WP media library.
 *
 * @param {string} url      The remote image URL to fetch.
 * @param {string} filename Filename for the uploaded file.
 * @return {Promise<Object>} The created media object (includes .id).
 */
export async function uploadMediaFromUrl( url, filename = 'logo.png' ) {
	const response = await fetch( url );
	const blob = await response.blob();

	const formData = new FormData();
	formData.append( 'file', blob, filename );

	return apiFetch( {
		url: `${ wpRestBase }/media`,
		method: 'POST',
		body: formData,
	} );
}

/**
 * Create a published page.
 *
 * @param {string} title   Page title.
 * @param {string} content Block HTML content.
 * @param {Object} options Extra fields (template, etc.).
 * @return {Promise<Object>} The created page object.
 */
export async function createPage( title, content, options = {} ) {
	return apiFetch( {
		url: `${ wpRestBase }/pages`,
		method: 'POST',
		data: {
			title,
			content,
			status: 'publish',
			...options,
		},
	} );
}

/**
 * Create a published post.
 *
 * @param {string} title   Post title.
 * @param {string} content Block HTML content.
 * @param {string} excerpt Post excerpt.
 * @param {Object} options Extra fields (featured_media, categories, etc.).
 * @return {Promise<Object>} The created post object.
 */
export async function createPost( title, content, excerpt = '', options = {} ) {
	return apiFetch( {
		url: `${ wpRestBase }/posts`,
		method: 'POST',
		data: {
			title,
			content,
			excerpt,
			status: 'publish',
			...options,
		},
	} );
}

/**
 * Create a published service.
 *
 * @param {string} title   Service title.
 * @param {string} content Block HTML content.
 * @param {string} excerpt Service excerpt.
 * @param {Object} options Extra fields (featured_media, categories, etc.).
 * @return {Promise<Object>} The created service object.
 */
export async function createService( title, content, excerpt = '', options = {} ) {
	return apiFetch( {
		url: `${ wpRestBase }/nfd_service`,
		method: 'POST',
		data: {
			title,
			content,
			excerpt,
			status: 'publish',
			...options,
		},
	} );
}

/**
 * Update an existing template part by slug, or create one if not found.
 *
 * @param {string} slug    Template part slug (e.g. "header", "footer").
 * @param {string} content Block HTML content.
 * @return {Promise<Object>} The updated/created template part.
 */
/**
 * Create or update the wp_navigation post with links to published pages.
 *
 * @param {Array} pages Array of { id, title, link } for each published page.
 * @return {Promise<Object>} The created/updated navigation post.
 */
export async function createNavigationMenu( pages ) {
	// Build navigation-link block grammar for each page.
	const links = pages
		.map(
			( page ) =>
				`<!-- wp:navigation-link {"label":"${ page.title }","type":"page","id":${ page.id },"url":"${ page.link }","kind":"post-type"} /-->`,
		)
		.join( '\n' );

	// Check for an existing navigation post with a real numeric ID.
	const lookupUrl = addQueryArgs( `${ wpRestBase }/navigation`, {
		per_page: 1,
		status: 'publish',
	} );
	let existing = [];
	try {
		existing = await apiFetch( { url: lookupUrl, method: 'GET' } );
	} catch {
		// If the endpoint errors, fall through to create.
	}

	const match = Array.isArray( existing )
		? existing.find( ( nav ) => nav.id && nav.id > 0 )
		: null;

	if ( match ) {
		return apiFetch( {
			url: `${ wpRestBase }/navigation/${ match.id }`,
			method: 'POST',
			data: { content: links },
		} );
	}

	return apiFetch( {
		url: `${ wpRestBase }/navigation`,
		method: 'POST',
		data: {
			title: 'Navigation',
			content: links,
			status: 'publish',
			meta: { nfd_onboarding_generated: '1' },
		},
	} );
}

/**
 * Update a page template by slug.
 *
 * @param {string} slug    Template slug (e.g. "page-no-title").
 * @param {string} content Block HTML content.
 * @return {Promise<Object>} The updated template.
 */
export async function updateTemplate( slug, content ) {
	const lookupUrl = addQueryArgs( `${ wpRestBase }/templates`, {
		per_page: 100,
	} );

	const templates = await apiFetch( {
		url: lookupUrl,
		method: 'GET',
	} );

	const match = Array.isArray( templates )
		? templates.find( ( t ) => t.slug === slug )
		: null;

	if ( match ) {
		return apiFetch( {
			url: `${ wpRestBase }/templates/${ match.id }`,
			method: 'POST',
			data: { content },
		} );
	}

	return null;
}

export async function updateTemplatePart( slug, content ) {
	// Look up existing template part by slug.
	const lookupUrl = addQueryArgs( `${ wpRestBase }/template-parts`, {
		per_page: 100,
	} );

	const parts = await apiFetch( {
		url: lookupUrl,
		method: 'GET',
	} );

	// The REST API may return all template parts (not filtered by exact slug).
	// Find the one whose slug matches exactly.
	const match = Array.isArray( parts )
		? parts.find( ( p ) => p.slug === slug )
		: null;

	if ( match ) {
		// The template part ID contains "//" (e.g. "bluehost-blueprint//header").
		// Do NOT encodeURIComponent — the slashes sit inside the rest_route
		// query-param value and must stay as literal "/" for WP routing.
		const updateUrl = `${ wpRestBase }/template-parts/${ match.id }`;

		const result = await apiFetch( {
			url: updateUrl,
			method: 'POST',
			data: { content },
		} );

		return result;
	}

	return apiFetch( {
		url: `${ wpRestBase }/template-parts`,
		method: 'POST',
		data: {
			slug,
			content,
			type: 'wp_template_part',
			area: slug === 'header' ? 'header' : 'footer',
		},
	} );
}

/**
 * Ensure WooCommerce and ecommerce plugins are installed and active.
 * Call without awaiting when site_type is eCommerce.
 *
 * @return {Promise<{status: string}>} Response payload from the initialize-ecommerce endpoint.
 */
export async function initializeEcommercePlugins() {
	return apiFetch( {
		url: `${ onboardingRestBase }/plugins/initialize-ecommerce`,
		method: 'POST',
	} );
}

/**
 * Emergency synchronous install/activate of critical plugins (Jetpack, Icon Block).
 * Fire-and-forget call made at the start of content generation as a safety net,
 * in case the background install queue has not yet caught up. Hopefully a no-op
 * because the queue has already done the work; only does real work if not.
 *
 * @return {Promise<{status: string, pending?: string[], errors?: Object}>} Response payload.
 */
export async function ensureCriticalPlugins() {
	return apiFetch( {
		url: `${ onboardingRestBase }/plugins/ensure-critical`,
		method: 'POST',
	} );
}

/**
 * Fire-and-forget background retry loop around ensureCriticalPlugins. Keeps trying
 * on 'installing' status without ever blocking the caller — generation can proceed in
 * parallel. Stops on 'ready', error, or after maxAttempts.
 *
 * @param {Object} [opts]
 * @param {number} [opts.maxAttempts=3]    Max number of retries.
 * @param {number} [opts.intervalMs=30000] Delay between retries (ms).
 * @return {void}
 */
export function ensureCriticalPluginsInBackground( opts = {} ) {
	const { maxAttempts = 3, intervalMs = 30000 } = opts;

	( async () => {
		for ( let attempt = 0; attempt < maxAttempts; attempt++ ) {
			try {
				const result = await ensureCriticalPlugins();
				if ( result?.status !== 'installing' ) {
					return;
				}
				// eslint-disable-next-line no-console
				console.warn(
					'[NFD Onboarding] critical plugins still pending',
					result?.pending,
				);
				await new Promise( ( r ) => setTimeout( r, intervalMs ) );
			} catch ( e ) {
				// eslint-disable-next-line no-console
				console.warn( '[NFD Onboarding] ensureCriticalPlugins failed', e );
				return;
			}
		}
	} )();
}

/**
 * Publish products to the backend.
 *
 * @param {Object[]} products Raw product objects from generationData.post_types.products.
 * @return {Promise<{created: number}>} Result including how many products were created.
 */
export async function publishProducts( products ) {
	return apiFetch( {
		url: `${ onboardingRestBase }/site-content/publish-products`,
		method: 'POST',
		data: { products },
	} );
}

/**
 * Clear the onboarding backend process.
 *
 * @return {Promise<{success: boolean}>} Response payload from the clear endpoint.
 */
export async function clearOnboarding() {
	return apiFetch( {
		url: `${ onboardingRestBase }/app/clear`,
		method: 'POST',
	} );
}
