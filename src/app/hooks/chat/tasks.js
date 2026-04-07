export const MAX_RETRIES = 3;

/**
 * The discovery sub-tasks fired concurrently by the AI platform.
 */
export const DISCOVERY_TASKS = [
	{
		key: 'prompt_enhance',
		label: 'Understanding your site',
		description: 'Analyzing your site description...',
		event: 'sitegen_discovery_prompt_enhance_completed',
	},
	{
		key: 'site_type',
		label: 'Identifying site type',
		description: 'Determining the best category for your site...',
		event: 'sitegen_discovery_site_type_completed',
	},
	{
		key: 'keywords',
		label: 'Generating keywords',
		description: 'Finding relevant keywords for your content...',
		event: 'sitegen_discovery_keywords_completed',
	},
	{
		key: 'brand_identity',
		label: 'Crafting brand identity',
		description: 'Defining your brand voice and personality...',
		event: 'sitegen_discovery_brand_identity_completed',
	},
];

/**
 * The generation tasks shown while site content is built.
 */
export const GENERATION_TASKS = [
	{ key: 'sitekit_selected', label: 'Designing layout', description: 'Finding the ideal design for your site...' },
	{ key: 'colors', label: 'Creating color palette', description: 'Designing brand colors that match your identity...' },
	{ key: 'font_pair', label: 'Choosing typography', description: 'Selecting font pairings that fit your brand...' },
	{ key: 'logo', label: 'Generating logo', description: 'Creating a logo for your brand...' },
	{ key: 'sitemap', label: 'Planning site pages', description: 'Mapping out pages for your site...' },
	{ key: 'site_content', label: 'Building site content', description: 'Generating page content and structure...' },
	{ key: 'post_types', label: 'Setting up content', description: 'Configuring post types and products...' },
];

export function createInitialTasks() {
	return DISCOVERY_TASKS.map( ( t ) => ( {
		key: t.key,
		label: t.label,
		description: t.description,
		status: 'pending',
		result: null,
	} ) );
}

export function createGenerationTasks() {
	return GENERATION_TASKS.map( ( t ) => ( {
		key: t.key,
		label: t.label,
		description: t.description,
		status: 'pending',
		result: null,
	} ) );
}

export const EVENT_TO_TASK_KEY = DISCOVERY_TASKS.reduce( ( map, t ) => {
	map[ t.event ] = t.key;
	return map;
}, {} );

/**
 * Map backend generation item event keys to frontend GENERATION_TASKS keys.
 * Backend emits: sitegen_content_generation_item{key}_completed
 */
export const GENERATION_TASK_KEYS = new Set( GENERATION_TASKS.map( ( t ) => t.key ) );

export const GENERATION_ITEM_KEY_MAP = {
	sitekit: 'site_content',
	site_colors: 'colors',
	site_logo: 'logo',
	post_types: 'post_types',
};
