/**
 * Helper Function for state in global styles to local mapping
 *
 * @param {Array} selectedColorPalette - Array of Map structure similar to the one in Global Styles
 *                                     e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *                                     return -> {base: "#ffffff", contrast: "#404040", ... }
 */
export function storeToState( selectedColorPalette ) {
	if ( selectedColorPalette ) {
		const selectedColorsLocalTemp = {};
		selectedColorPalette?.forEach( ( color ) => {
			selectedColorsLocalTemp[ color.slug ] = color.color;
		} );
		return selectedColorsLocalTemp;
	}
}

/**
 * Converts the user selected value into a suitable valid global styles array value
 *
 * @param {Object} selectedColorsLocalTemp - Color type mapped to the color
 *                                         e.g. {base: "#ffffff", contrast: "#404040", ... }
 * @param {string} colorStyle              - Selected Color slug
 *                                         e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 */
export function stateToStore( selectedColorsLocalTemp, colorStyle ) {
	if ( selectedColorsLocalTemp && colorStyle ) {
		const colorsArray = [];
		for ( const colorName in selectedColorsLocalTemp ) {
			colorsArray.push( {
				slug: colorName,
				name:
					colorName?.charAt( 0 ).toUpperCase() +
					colorName?.slice( 1 ),
				color: selectedColorsLocalTemp[ colorName ],
			} );
		}
		return colorsArray;
	}
}

/**
 * Finds the index of the color type being changed in the array
 * Array to check -> [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *
 * @param {string} slugName              - Slug Name for color i.e. base, secondary, header-title,...
 * @param {Object} storedPreviewSettings - The Stored Preview Settings for live preview
 * @param {string} colorPickerCalledBy   - The Color that triggered the color picker
 * @return {number} res - Index of the key "slug" mapped [{color: '#ffffff', name: 'Base', slug: 'base'}, ...] in the array
 */
export function findInPalette(
	slugName,
	storedPreviewSettings,
	colorPickerCalledBy
) {
	const selectedThemeColorPalette =
		storedPreviewSettings?.settings?.color?.palette;
	const res = selectedThemeColorPalette.findIndex(
		( { slug } ) => slug === slugName
	);
	// If the mapped slug doesn't exist then return the parent slug
	if ( res === -1 ) {
		return selectedThemeColorPalette.findIndex(
			( { slug } ) => slug === colorPickerCalledBy
		);
	}
	return res;
}
