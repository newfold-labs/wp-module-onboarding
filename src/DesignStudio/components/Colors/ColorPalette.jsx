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

export default function ColorPalette( { onChange, globalStyles } ) {
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

	if ( isLoading && colorPalettes.length === 0 ) {
		return null;
	}

	if ( colorPalettes.length === 0 ) {
		return null;
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
