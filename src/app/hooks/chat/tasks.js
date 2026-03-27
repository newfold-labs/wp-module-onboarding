export const MAX_RETRIES = 3;

/**
 * The 5 discovery sub-tasks fired concurrently by the AI platform.
 */
export const DISCOVERY_TASKS = [
	{
		key: 'prompt_enhance',
		label: 'Understanding your site',
		event: 'sitegen_discovery_prompt_enhance_completed',
	},
	{
		key: 'site_type',
		label: 'Identifying site type',
		event: 'sitegen_discovery_site_type_completed',
	},
	{
		key: 'keywords',
		label: 'Generating keywords',
		event: 'sitegen_discovery_keywords_completed',
	},
	{
		key: 'sitemap',
		label: 'Building sitemap',
		event: 'sitegen_discovery_sitemap_completed',
	},
	{
		key: 'brand_identity',
		label: 'Crafting brand identity',
		event: 'sitegen_discovery_brand_identity_completed',
	},
];

/**
 * The 4 generation sub-tasks shown while site content is built.
 */
export const GENERATION_TASKS = [
	{
		key: 'template',
		label: 'Designing your website',
		description: 'Designing the best layout for your site type...',
	},
	{
		key: 'fonts',
		label: 'Picking the right typography',
		description: 'Selecting font pairings that fit your brand...',
	},
	{
		key: 'colors',
		label: 'Creating color palette',
		description: 'Designing brand colors that match your identity...',
	},
	{
		key: 'logo',
		label: 'Generating logo',
		description: 'Creating a logo for your brand...',
	},
	{
		key: 'post_types',
		label: 'Setting up content',
		description: 'Configuring post types and products...',
	},
];

export function createInitialTasks() {
	return DISCOVERY_TASKS.map( ( t ) => ( {
		key: t.key,
		label: t.label,
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
export const GENERATION_ITEM_KEY_MAP = {
	sitekit: 'template',
	site_fonts: 'fonts',
	site_colors: 'colors',
	site_logo: 'logo',
	post_types: 'post_types',
};
