/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { __experimentalGrid as Grid, __experimentalVStack as VStack } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useColorPalettePagination from '../../hooks/useColorPalettePagination';
import useColorPaletteSelection from '../../hooks/useColorPaletteSelection';
import ColorPaletteItem from './ColorPaletteItem';
import ColorPalettePagination from './ColorPalettePagination';

export default function ColorPalette( { onChange, globalStyles, onLoadingChange } ) {
	const { colorPalettes, isLoading, currentPage, totalPages, loadPalettes, handlePageChange } =
		useColorPalettePagination();

	const { selectedPalette, handleSelect } = useColorPaletteSelection(
		colorPalettes,
		globalStyles,
		onChange
	);

	useEffect( () => {
		loadPalettes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	useEffect( () => {
		if ( onLoadingChange ) {
			onLoadingChange( isLoading );
		}
	}, [ isLoading, onLoadingChange ] );

	// Return empty div when loading or no palettes, but keep component mounted
	if ( isLoading || colorPalettes.length === 0 ) {
		return <div className="nfd-design-studio-color-palette-wrapper" />;
	}

	return (
		<div className="nfd-design-studio-color-palette-wrapper">
			<VStack spacing={ 3 }>
				<Grid columns={ 2 } spacing={ 2 }>
					{ colorPalettes.map( ( palette, index ) => (
						<ColorPaletteItem
							key={ `${ palette.name } ${ index }` }
							palette={ palette }
							isActive={ selectedPalette === palette.name }
							onSelect={ handleSelect }
						/>
					) ) }
				</Grid>
				<ColorPalettePagination
					currentPage={ currentPage }
					totalPages={ totalPages }
					onPageChange={ handlePageChange }
					isLoading={ isLoading }
				/>
			</VStack>
		</div>
	);
}
