/**
 * Minimal sitegen SSE sequence for Playwright (mirrors Laravel SiteGenController event order).
 */

/** Unique copy asserted in the Site Editor after publish (test #3). */
export const PUBLISH_MARKER_TEXT = 'E2E Roma Bakery homepage marker';

const MINIMAL_GENERATION_PAYLOAD = {
	sitekit: {
		font_pair: null,
		global_styles: null,
		pages: [],
		header: '',
		footer: '',
		templates: [],
	},
	site_colors: [],
	site_logo: null,
	post_types: {},
};

const PUBLISHABLE_HOME_BLOCK = `<!-- wp:paragraph -->
<p>${ PUBLISH_MARKER_TEXT }</p>
<!-- /wp:paragraph -->`;

const PUBLISHABLE_GENERATION_PAYLOAD = {
	...MINIMAL_GENERATION_PAYLOAD,
	sitekit: {
		...MINIMAL_GENERATION_PAYLOAD.sitekit,
		pages: [
			{
				title: 'Home',
				slug: 'home',
				is_front_page: true,
				content: PUBLISHABLE_HOME_BLOCK,
			},
		],
	},
};

const DISCOVERY_AGGREGATE = {
	prompt_enhance: 'A bakery in Rome offering fresh bread and pastries.',
	site_type: { site_type: 'business' },
	keywords: [ 'bakery', 'rome', 'bread' ],
	brand_identity: {
		site_title: 'Roma Bakery',
		tagline: 'Fresh daily',
	},
};

/**
 * @param {{ event: string, data: string|object|number }} entry
 * @return {string}
 */
function formatSseEvent( { event, data } ) {
	const payload =
		data === null || data === undefined
			? ''
			: typeof data === 'string'
				? data
				: JSON.stringify( data );
	return `event: ${ event }\ndata: ${ payload }\n\n`;
}

/**
 * @param {{ withPublishableHomePage?: boolean }} [options]
 * @return {string} Full SSE response body for POST /api/v1/sitegen/generate
 */
export function buildMockSitegenSseBody( options = {} ) {
	const generationPayload = options.withPublishableHomePage
		? PUBLISHABLE_GENERATION_PAYLOAD
		: MINIMAL_GENERATION_PAYLOAD;
	const siteGenId = 'playwright-mock-sitegen-id';

	const events = [
		{ event: 'sitegen_started', data: siteGenId },
		{ event: 'sitegen_discovery_started', data: 'Site discovery started' },
		{
			event: 'sitegen_discovery_prompt_enhance_completed',
			data: DISCOVERY_AGGREGATE.prompt_enhance,
		},
		{
			event: 'sitegen_discovery_site_type_completed',
			data: DISCOVERY_AGGREGATE.site_type,
		},
		{
			event: 'sitegen_discovery_keywords_completed',
			data: DISCOVERY_AGGREGATE.keywords,
		},
		{
			event: 'sitegen_discovery_brand_identity_completed',
			data: DISCOVERY_AGGREGATE.brand_identity,
		},
		{ event: 'sitegen_discovery_completed', data: DISCOVERY_AGGREGATE },
		{ event: 'sitegen_content_generation_started', data: 'Site content generation started' },
		{ event: 'sitegen_sitekit_step_sitekit_selected', data: 'Done' },
		{ event: 'sitegen_content_generation_itemsite_colors_completed', data: {} },
		{ event: 'sitegen_sitekit_step_font_pair', data: 'Done' },
		{ event: 'sitegen_content_generation_itemsite_logo_completed', data: {} },
		{ event: 'sitegen_sitekit_step_sitemap', data: 'Done' },
		{ event: 'sitegen_content_generation_itemsitekit_completed', data: {} },
		{ event: 'sitegen_content_generation_itempost_types_completed', data: {} },
		{ event: 'sitegen_content_generation_completed', data: generationPayload },
		{ event: 'sitegen_completed', data: 'Site generation completed' },
	];

	return events.map( formatSseEvent ).join( '' );
}

export { MINIMAL_GENERATION_PAYLOAD, DISCOVERY_AGGREGATE };
