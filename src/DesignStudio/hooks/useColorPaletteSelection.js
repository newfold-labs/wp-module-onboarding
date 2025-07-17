/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

// Helper function to compare colors
const compareColors = ( color1, color2 ) => {
	// Normalize colors by removing spaces and converting to lowercase
	const normalize = ( color ) => color.toLowerCase().replace( /\s/g, '' );
	return normalize( color1 ) === normalize( color2 );
};

// Helper function to find matching palette
const findMatchingPalette = ( palettes, styles ) => {
	if ( ! styles?.color?.palette ) {
		return null;
	}

	return palettes.find( ( palette ) => {
		const paletteColors = palette.palette.map( ( item ) => item.color );
		const globalColors = styles.color.palette.map( ( item ) => item.color );

		return (
			paletteColors.length === globalColors.length &&
			paletteColors.every( ( color, index ) => compareColors( color, globalColors[ index ] ) )
		);
	} );
};

export default function useColorPaletteSelection( colorPalettes, globalStyles, onChange ) {
	const [ selectedPalette, setSelectedPalette ] = useState( '' );

	// Effect to handle global styles changes
	useEffect( () => {
		if ( colorPalettes.length > 0 && globalStyles ) {
			const matchingPalette = findMatchingPalette( colorPalettes, globalStyles );
			if ( matchingPalette ) {
				setSelectedPalette( matchingPalette.name );
			}
		}
	}, [ globalStyles, colorPalettes ] );

	const handleSelect = ( paletteName ) => {
		// If the palette is already selected, do nothing
		if ( selectedPalette === paletteName ) {
			return;
		}

		setSelectedPalette( paletteName );
		const selectedPaletteObj = colorPalettes.find( ( p ) => p.name === paletteName );
		onChange?.( selectedPaletteObj );
	};

	return {
		selectedPalette,
		handleSelect,
	};
}
