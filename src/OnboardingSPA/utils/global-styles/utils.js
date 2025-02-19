/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { get, find } from 'lodash';
import { getCSSValueFromRawStyle } from '@wordpress/style-engine';

/**
 * Internal dependencies
 */
import { getTypographyFontSizeValue } from './typography-utils';

/* Supporting data. */
export const ROOT_BLOCK_NAME = 'root';
export const ROOT_BLOCK_SELECTOR = 'body';
export const ROOT_CSS_PROPERTIES_SELECTOR = ':root';
export const ROOT_BLOCK_SUPPORTS = [
	'background',
	'backgroundColor',
	'color',
	'linkColor',
	'buttonColor',
	'fontFamily',
	'fontSize',
	'fontStyle',
	'fontWeight',
	'lineHeight',
	'textDecoration',
	'textTransform',
	'padding',
];

// Initial control values.
export const BACKGROUND_BLOCK_DEFAULT_VALUES = {
	backgroundSize: 'cover',
	backgroundPosition: '50% 50%', // used only when backgroundSize is 'contain'.
};

export const PRESET_METADATA = [
	{
		path: ['color', 'palette'],
		valueKey: 'color',
		cssVarInfix: 'color',
		classes: [
			{ classSuffix: 'color', propertyName: 'color' },
			{
				classSuffix: 'background-color',
				propertyName: 'background-color',
			},
			{
				classSuffix: 'border-color',
				propertyName: 'border-color',
			},
		],
	},
	{
		path: ['color', 'gradients'],
		valueKey: 'gradient',
		cssVarInfix: 'gradient',
		classes: [
			{
				classSuffix: 'gradient-background',
				propertyName: 'background',
			},
		],
	},
	{
		path: ['color', 'duotone'],
		cssVarInfix: 'duotone',
		valueFunc: ({ slug }) => `url( '#wp-duotone-${slug}' )`,
		classes: [],
	},
	{
		path: ['typography', 'fontSizes'],
		valueFunc: (preset, { typography: typographySettings }) =>
			getTypographyFontSizeValue(preset, typographySettings),
		valueKey: 'size',
		cssVarInfix: 'font-size',
		classes: [{ classSuffix: 'font-size', propertyName: 'font-size' }],
	},
	{
		path: ['typography', 'fontFamilies'],
		valueKey: 'fontFamily',
		cssVarInfix: 'font-family',
		classes: [{ classSuffix: 'font-family', propertyName: 'font-family' }],
	},
	{
		path: ['spacing', 'spacingSizes'],
		valueKey: 'size',
		cssVarInfix: 'spacing',
		valueFunc: ({ size }) => size,
		classes: [],
	},
];

// Layout definitions keyed by layout type.
// Provides a common definition of slugs, classnames, base styles, and spacing styles for each layout type.
// If making changes or additions to layout definitions, be sure to update the corresponding PHP definitions in
// `block-supports/layout.php` so that the server-side and client-side definitions match.
export const LAYOUT_DEFINITIONS = {
	default: {
		name: 'default',
		slug: 'flow',
		className: 'is-layout-flow',
		baseStyles: [
			{
				selector: ' > .alignleft',
				rules: {
					float: 'left',
					'margin-inline-start': '0',
					'margin-inline-end': '2em',
				},
			},
			{
				selector: ' > .alignright',
				rules: {
					float: 'right',
					'margin-inline-start': '2em',
					'margin-inline-end': '0',
				},
			},
			{
				selector: ' > .aligncenter',
				rules: {
					'margin-left': 'auto !important',
					'margin-right': 'auto !important',
				},
			},
		],
		spacingStyles: [
			{
				selector: ' > :first-child',
				rules: {
					'margin-block-start': '0',
				},
			},
			{
				selector: ' > :last-child',
				rules: {
					'margin-block-end': '0',
				},
			},
			{
				selector: ' > *',
				rules: {
					'margin-block-start': null,
					'margin-block-end': '0',
				},
			},
		],
	},
	constrained: {
		name: 'constrained',
		slug: 'constrained',
		className: 'is-layout-constrained',
		baseStyles: [
			{
				selector: ' > .alignleft',
				rules: {
					float: 'left',
					'margin-inline-start': '0',
					'margin-inline-end': '2em',
				},
			},
			{
				selector: ' > .alignright',
				rules: {
					float: 'right',
					'margin-inline-start': '2em',
					'margin-inline-end': '0',
				},
			},
			{
				selector: ' > .aligncenter',
				rules: {
					'margin-left': 'auto !important',
					'margin-right': 'auto !important',
				},
			},
			{
				selector:
					' > :where(:not(.alignleft):not(.alignright):not(.alignfull))',
				rules: {
					'max-width': 'var(--wp--style--global--content-size)',
					'margin-left': 'auto !important',
					'margin-right': 'auto !important',
				},
			},
			{
				selector: ' > .alignwide',
				rules: {
					'max-width': 'var(--wp--style--global--wide-size)',
				},
			},
		],
		spacingStyles: [
			{
				selector: ' > :first-child',
				rules: {
					'margin-block-start': '0',
				},
			},
			{
				selector: ' > :last-child',
				rules: {
					'margin-block-end': '0',
				},
			},
			{
				selector: ' > *',
				rules: {
					'margin-block-start': null,
					'margin-block-end': '0',
				},
			},
		],
	},
	flex: {
		name: 'flex',
		slug: 'flex',
		className: 'is-layout-flex',
		displayMode: 'flex',
		baseStyles: [
			{
				selector: '',
				rules: {
					'flex-wrap': 'wrap',
					'align-items': 'center',
				},
			},
			{
				selector: ' > :is(*, div)',
				// :is(*, div) instead of just * increases the specificity by 001.
				rules: {
					margin: '0',
				},
			},
		],
		spacingStyles: [
			{
				selector: '',
				rules: {
					gap: null,
				},
			},
		],
	},
	grid: {
		name: 'grid',
		slug: 'grid',
		className: 'is-layout-grid',
		displayMode: 'grid',
		baseStyles: [
			{
				selector: ' > :is(*, div)',
				// :is(*, div) instead of just * increases the specificity by 001.
				rules: {
					margin: '0',
				},
			},
		],
		spacingStyles: [
			{
				selector: '',
				rules: {
					gap: null,
				},
			},
		],
	},
};

const STYLE_PATH_TO_CSS_VAR_INFIX = {
	'color.background': 'color',
	'color.text': 'color',
	'elements.link.color.text': 'color',
	'elements.button.color.text': 'color',
	'elements.button.backgroundColor': 'background-color',
	'elements.heading.color': 'color',
	'elements.heading.backgroundColor': 'background-color',
	'elements.heading.gradient': 'gradient',
	'color.gradient': 'gradient',
	'typography.fontSize': 'font-size',
	'typography.fontFamily': 'font-family',
};

function findInPresetsBy(
	features,
	blockName,
	presetPath,
	presetProperty,
	presetValueValue
) {
	// Block presets take priority above root level presets.
	const orderedPresetsByOrigin = [
		get(features, ['blocks', blockName, ...presetPath]),
		get(features, presetPath),
	];

	for (const presetByOrigin of orderedPresetsByOrigin) {
		if (presetByOrigin) {
			// Preset origins ordered by priority.
			const origins = ['custom', 'theme', 'default'];
			for (const origin of origins) {
				const presets = presetByOrigin[origin];
				if (presets) {
					const presetObject = find(
						presets,
						(preset) => preset[presetProperty] === presetValueValue
					);
					if (presetObject) {
						if (presetProperty === 'slug') {
							return presetObject;
						}
						// If there is a highest priority preset with the same slug but different value the preset we found was overwritten and should be ignored.
						const highestPresetObjectWithSameSlug = findInPresetsBy(
							features,
							blockName,
							presetPath,
							'slug',
							presetObject.slug
						);
						if (
							highestPresetObjectWithSameSlug[presetProperty] ===
							presetObject[presetProperty]
						) {
							return presetObject;
						}
						return undefined;
					}
				}
			}
		}
	}
}

export function getPresetVariableFromValue(
	features,
	blockName,
	variableStylePath,
	presetPropertyValue
) {
	if (!presetPropertyValue) {
		return presetPropertyValue;
	}

	const cssVarInfix = STYLE_PATH_TO_CSS_VAR_INFIX[variableStylePath];

	const metadata = find(PRESET_METADATA, ['cssVarInfix', cssVarInfix]);

	if (!metadata) {
		// The property doesn't have preset data
		// so the value should be returned as it is.
		return presetPropertyValue;
	}
	const { valueKey, path } = metadata;

	const presetObject = findInPresetsBy(
		features,
		blockName,
		path,
		valueKey,
		presetPropertyValue
	);

	if (!presetObject) {
		// Value wasn't found in the presets,
		// so it must be a custom value.
		return presetPropertyValue;
	}

	return `var:preset|${cssVarInfix}|${presetObject.slug}`;
}

function getValueFromPresetVariable(
	features,
	blockName,
	variable,
	[presetType, slug]
) {
	const metadata = find(PRESET_METADATA, ['cssVarInfix', presetType]);
	if (!metadata) {
		return variable;
	}

	const presetObject = findInPresetsBy(
		features.settings,
		blockName,
		metadata.path,
		'slug',
		slug
	);

	if (presetObject) {
		const { valueKey } = metadata;
		const result = presetObject[valueKey];
		return getValueFromVariable(features, blockName, result);
	}

	return variable;
}

function getValueFromCustomVariable(features, blockName, variable, path) {
	const result =
		get(features.settings, ['blocks', blockName, 'custom', ...path]) ??
		get(features.settings, ['custom', ...path]);
	if (!result) {
		return variable;
	}
	// A variable may reference another variable so we need recursion until we find the value.
	return getValueFromVariable(features, blockName, result);
}

/**
 * Attempts to fetch the value of a theme.json CSS variable.
 *
 * @param {Object}   features  GlobalStylesContext config, e.g., user, base or merged. Represents the theme.json tree.
 * @param {string}   blockName The name of a block as represented in the styles property. E.g., 'root' for root-level, and 'core/${blockName}' for blocks.
 * @param {string|*} variable  An incoming style value. A CSS var value is expected, but it could be any value.
 * @return {string|*|{ref}} The value of the CSS var, if found. If not found, the passed variable argument.
 */
export function getValueFromVariable(features, blockName, variable) {
	if (!variable || typeof variable !== 'string') {
		if (variable?.ref && typeof variable?.ref === 'string') {
			const refPath = variable.ref.split('.');
			variable = get(features, refPath);
			// Presence of another ref indicates a reference to another dynamic value.
			// Pointing to another dynamic value is not supported.
			if (!variable || !!variable?.ref) {
				return variable;
			}
		} else {
			return variable;
		}
	}
	const USER_VALUE_PREFIX = 'var:';
	const THEME_VALUE_PREFIX = 'var(--wp--';
	const THEME_VALUE_SUFFIX = ')';

	let parsedVar;

	if (variable.startsWith(USER_VALUE_PREFIX)) {
		parsedVar = variable.slice(USER_VALUE_PREFIX.length).split('|');
	} else if (
		variable.startsWith(THEME_VALUE_PREFIX) &&
		variable.endsWith(THEME_VALUE_SUFFIX)
	) {
		parsedVar = variable
			.slice(THEME_VALUE_PREFIX.length, -THEME_VALUE_SUFFIX.length)
			.split('--');
	} else {
		// We don't know how to parse the value: either is raw of uses complex CSS such as `calc(1px * var(--wp--variable) )`
		return variable;
	}

	const [type, ...path] = parsedVar;
	if (type === 'preset') {
		return getValueFromPresetVariable(features, blockName, variable, path);
	}
	if (type === 'custom') {
		return getValueFromCustomVariable(features, blockName, variable, path);
	}
	return variable;
}

/**
 * Function that scopes a selector with another one. This works a bit like
 * SCSS nesting except the `&` operator isn't supported.
 *
 * @example
 * ```js
 * const scope = '.a, .b .c';
 * const selector = '> .x, .y';
 * const merged = scopeSelector( scope, selector );
 * // merged is '.a > .x, .a .y, .b .c > .x, .b .c .y'
 * ```
 *
 * @param {string} scope    Selector to scope to.
 * @param {string} selector Original selector.
 *
 * @return {string} Scoped selector.
 */
export function scopeSelector(scope, selector) {
	const scopes = scope.split(',');
	const selectors = selector.split(',');

	const selectorsScoped = [];
	scopes.forEach((outer) => {
		selectors.forEach((inner) => {
			selectorsScoped.push(`${outer.trim()} ${inner.trim()}`);
		});
	});

	return selectorsScoped.join(', ');
}

/**
 * Scopes a collection of selectors for features and subfeatures.
 *
 * @example
 * ```js
 * const scope = '.custom-scope';
 * const selectors = {
 *     color: '.wp-my-block p',
 *     typography: { fontSize: '.wp-my-block caption' },
 * };
 * const result = scopeFeatureSelector( scope, selectors );
 * // result is {
 * //     color: '.custom-scope .wp-my-block p',
 * //     typography: { fonSize: '.custom-scope .wp-my-block caption' },
 * // }
 * ```
 *
 * @param {string} scope     Selector to scope collection of selectors with.
 * @param {Object} selectors Collection of feature selectors e.g.
 *
 * @return {Object|undefined} Scoped collection of feature selectors.
 */
export function scopeFeatureSelectors(scope, selectors) {
	if (!scope || !selectors) {
		return;
	}

	const featureSelectors = {};

	Object.entries(selectors).forEach(([feature, selector]) => {
		if (typeof selector === 'string') {
			featureSelectors[feature] = scopeSelector(scope, selector);
		}

		if (typeof selector === 'object') {
			featureSelectors[feature] = {};

			Object.entries(selector).forEach(
				([subfeature, subfeatureSelector]) => {
					featureSelectors[feature][subfeature] = scopeSelector(
						scope,
						subfeatureSelector
					);
				}
			);
		}
	});

	return featureSelectors;
}

export function setBackgroundStyleDefaults(backgroundStyle) {
	if (!backgroundStyle || !backgroundStyle?.backgroundImage?.url) {
		return;
	}

	let backgroundStylesWithDefaults;

	// Set block background defaults.
	if (!backgroundStyle?.backgroundSize) {
		backgroundStylesWithDefaults = {
			backgroundSize: BACKGROUND_BLOCK_DEFAULT_VALUES.backgroundSize,
		};
	}

	if (
		'contain' === backgroundStyle?.backgroundSize &&
		!backgroundStyle?.backgroundPosition
	) {
		backgroundStylesWithDefaults = {
			backgroundPosition:
				BACKGROUND_BLOCK_DEFAULT_VALUES.backgroundPosition,
		};
	}
	return backgroundStylesWithDefaults;
}

/**
 * Generates the selector for a block style variation by creating the
 * appropriate CSS class and adding it to the ancestor portion of the block's
 * selector.
 *
 * For example, take the Button block which has a compound selector:
 * `.wp-block-button .wp-block-button__link`. With a variation named 'custom',
 * the class `.is-style-custom` should be added to the `.wp-block-button`
 * ancestor only.
 *
 * This function will take into account comma separated and complex selectors.
 *
 * @param {string} variation     Name for the variation.
 * @param {string} blockSelector CSS selector for the block.
 *
 * @return {string} CSS selector for the block style variation.
 */
export function getBlockStyleVariationSelector(variation, blockSelector) {
	const variationClass = `.is-style-${variation}`;

	if (!blockSelector) {
		return variationClass;
	}

	const ancestorRegex = /((?::\([^)]+\))?\s*)([^\s:]+)/;
	const addVariationClass = (_match, group1, group2) => {
		return group1 + group2 + variationClass;
	};

	const result = blockSelector
		.split(',')
		.map((part) => part.replace(ancestorRegex, addVariationClass));

	return result.join(',');
}

/**
 * Appends a sub-selector to an existing one.
 *
 * Given the compounded `selector` "h1, h2, h3"
 * and the `toAppend` selector ".some-class" the result will be
 * "h1.some-class, h2.some-class, h3.some-class".
 *
 * @param {string} selector Original selector.
 * @param {string} toAppend Selector to append.
 *
 * @return {string} The new selector.
 */
export function appendToSelector(selector, toAppend) {
	if (!selector.includes(',')) {
		return selector + toAppend;
	}
	const selectors = selector.split(',');
	const newSelectors = selectors.map((sel) => sel + toAppend);
	return newSelectors.join(',');
}

/**
 * Helper util to return a value from a certain path of the object.
 * Path is specified as either:
 * - a string of properties, separated by dots, for example: "x.y".
 * - an array of properties, for example `[ 'x', 'y' ]`.
 * You can also specify a default value in case the result is nullish.
 *
 * @param {Object}       object       Input object.
 * @param {string|Array} path         Path to the object property.
 * @param {*}            defaultValue Default value if the value at the specified path is nullish.
 * @return {*} Value of the object property at the specified path.
 */
export const getValueFromObjectPath = (object, path, defaultValue) => {
	const arrayPath = Array.isArray(path) ? path : path.split('.');
	let value = object;
	arrayPath.forEach((fieldName) => {
		value = value?.[fieldName];
	});
	return value ?? defaultValue;
};

/**
 * Immutably sets a value inside an object. Like `lodash#set`, but returning a
 * new object. Treats nullish initial values as empty objects. Clones any
 * nested objects. Supports arrays, too.
 *
 * @param {Object}              object Object to set a value in.
 * @param {number|string|Array} path   Path in the object to modify.
 * @param {*}                   value  New value to set.
 * @return {Object} Cloned object with the new value set.
 */
export function setImmutably(object, path, value) {
	// Normalize path
	path = Array.isArray(path) ? [...path] : [path];

	// Shallowly clone the base of the object
	object = Array.isArray(object) ? [...object] : { ...object };

	const leaf = path.pop();

	// Traverse object from root to leaf, shallowly cloning at each level
	let prev = object;
	for (const key of path) {
		const lvl = prev[key];
		prev = prev[key] = Array.isArray(lvl) ? [...lvl] : { ...lvl };
	}

	prev[leaf] = value;

	return object;
}

/**
 * Resolves ref values in theme JSON.
 *
 * @param {Object|string} ruleValue A block style value that may contain a reference to a theme.json value.
 * @param {Object}        tree      A theme.json object.
 * @return {*} The resolved value or incoming ruleValue.
 */
export function getResolvedRefValue(ruleValue, tree) {
	if (!ruleValue || !tree) {
		return ruleValue;
	}

	/*
	 * Where the rule value is an object with a 'ref' property pointing
	 * to a path, this converts that path into the value at that path.
	 * For example: { "ref": "style.color.background" } => "#fff".
	 */
	if (typeof ruleValue !== 'string' && ruleValue?.ref) {
		const resolvedRuleValue = getCSSValueFromRawStyle(
			getValueFromObjectPath(tree, ruleValue.ref)
		);

		/*
		 * Presence of another ref indicates a reference to another dynamic value.
		 * Pointing to another dynamic value is not supported.
		 */
		if (resolvedRuleValue?.ref) {
			return undefined;
		}

		if (resolvedRuleValue === undefined) {
			return ruleValue;
		}

		return resolvedRuleValue;
	}
	return ruleValue;
}

/**
 * Looks up a theme file URI based on a relative path.
 *
 * @param {string}        file          A relative path.
 * @param {Array<Object>} themeFileURIs A collection of absolute theme file URIs and their corresponding file paths.
 * @return {string} A resolved theme file URI, if one is found in the themeFileURIs collection.
 */
export function getResolvedThemeFilePath(file, themeFileURIs) {
	if (!file || !themeFileURIs || !Array.isArray(themeFileURIs)) {
		return file;
	}

	const uri = themeFileURIs.find(
		(themeFileUri) => themeFileUri?.name === file
	);

	if (!uri?.href) {
		return file;
	}

	return uri?.href;
}

/**
 * Resolves ref and relative path values in theme JSON.
 *
 * @param {Object|string} ruleValue A block style value that may contain a reference to a theme.json value.
 * @param {Object}        tree      A theme.json object.
 * @return {*} The resolved value or incoming ruleValue.
 */
export function getResolvedValue(ruleValue, tree) {
	if (!ruleValue || !tree) {
		return ruleValue;
	}

	// Resolve ref values.
	const resolvedValue = getResolvedRefValue(ruleValue, tree);

	// Resolve relative paths.
	if (resolvedValue?.url) {
		resolvedValue.url = getResolvedThemeFilePath(
			resolvedValue.url,
			tree?._links?.['wp:theme-file']
		);
	}

	return resolvedValue;
}
