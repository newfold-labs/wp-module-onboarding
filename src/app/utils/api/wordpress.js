import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { wpRestBase } from '@/data/constants';

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
	console.log('createService', title, content, excerpt, options);
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
				`<!-- wp:navigation-link {"label":"${ page.title }","type":"page","id":${ page.id },"url":"${ page.link }","kind":"post-type"} /-->`
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
		},
	} );
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
