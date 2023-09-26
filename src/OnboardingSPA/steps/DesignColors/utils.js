/**
 * Helper Function for state in global styles to local mapping
 *
 * @param {Array} selectedColorsStore - Array of Map structure similar to the one in Global Styles
 *                                    e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *                                    return -> {base: "#ffffff", contrast: "#404040", ... }
 */
export function storeToState( selectedColorsStore ) {
	if ( selectedColorsStore ) {
		const selectedColorsState = {};
		selectedColorsStore?.forEach( ( color ) => {
			selectedColorsState[ color.slug ] = color.color;
		} );
		return selectedColorsState;
	}
}

/**
 * Converts the user selected value into a suitable valid global styles array value
 *
 * @param {Object} selectedColorsState - Color type mapped to the color
 *                                     e.g. {base: "#ffffff", contrast: "#404040", ... }
 */
export function stateToStore( selectedColorsState ) {
	if ( selectedColorsState ) {
		const selectedColorsStore = [];
		for ( const colorName in selectedColorsState ) {
			selectedColorsStore.push( {
				slug: colorName,
				name:
					colorName?.charAt( 0 ).toUpperCase() +
					colorName?.slice( 1 ),
				color: selectedColorsState[ colorName ],
			} );
		}
		return selectedColorsStore;
	}
}

/**
 * Finds the index of the color type being changed in the array
 * Array to check -> [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *
 * @param {string} slugName         - Slug Name for color i.e. base, secondary, header-title,...
 * @param {string} fallbackSlugName - The Color that triggered the color picker
 * @param {Array}  palette          - The global styles palette that has to be searched in
 * @return {number} index - Index of the key "slug" mapped [{color: '#ffffff', name: 'Base', slug: 'base'}, ...] in the array
 */
export function findIndexInPalette( slugName, fallbackSlugName, palette ) {
	const index = palette.findIndex( ( { slug } ) => slug === slugName );
	// If the mapped slug doesn't exist then return the parent slug
	if ( index === -1 ) {
		return palette.findIndex( ( { slug } ) => slug === fallbackSlugName );
	}
	return index;
}
