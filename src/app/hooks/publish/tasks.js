/**
 * Map of raw palette keys to WordPress color palette format.
 */
export const COLOR_SLUG_MAP = {
	base: { slug: 'base', name: 'Base' },
	base_midtone: { slug: 'base-midtone', name: 'Base Midtone' },
	contrast: { slug: 'contrast', name: 'Contrast' },
	contrast_midtone: { slug: 'contrast-midtone', name: 'Contrast Midtone' },
	accent_1: { slug: 'accent-1', name: 'Accent 1' },
	accent_2: { slug: 'accent-2', name: 'Accent 2' },
	accent_3: { slug: 'accent-3', name: 'Accent 3' },
	accent_4: { slug: 'accent-4', name: 'Accent 4' },
	accent_5: { slug: 'accent-5', name: 'Accent 5' },
	accent_6: { slug: 'accent-6', name: 'Accent 6' },
};

/**
 * Transform a raw palette object into the WP format.
 *
 * @param {Object} palette Raw palette from generation data.
 * @return {Array} WordPress-formatted color palette array.
 */
export function transformColorPalette( palette ) {
	return Object.entries( palette )
		.filter( ( [ key ] ) => key in COLOR_SLUG_MAP )
		.map( ( [ key, color ] ) => ( {
			slug: COLOR_SLUG_MAP[ key ].slug,
			name: COLOR_SLUG_MAP[ key ].name,
			color,
		} ) );
}

export const PUBLISH_STEPS = [
	{ key: 'identity', label: 'Setting site identity' },
	{ key: 'fonts', label: 'Installing fonts' },
	{ key: 'global_styles', label: 'Applying typography & styles' },
	{ key: 'colors', label: 'Applying color palette' },
	{ key: 'logo', label: 'Uploading logo' },
	{ key: 'pages', label: 'Creating pages' },
	{ key: 'template_parts', label: 'Setting up header & footer' },
	{ key: 'articles', label: 'Publishing articles' },
	{ key: 'navigation', label: 'Setting up navigation' },
	{ key: 'finalize', label: 'Finalizing site' },
];

export function createPublishTasks() {
	return PUBLISH_STEPS.map( ( s ) => ( {
		key: s.key,
		label: s.label,
		status: 'pending',
		result: null,
	} ) );
}
