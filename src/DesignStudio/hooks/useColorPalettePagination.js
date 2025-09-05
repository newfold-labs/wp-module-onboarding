/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchDesignSettings } from '../utils/design-api';
import { getCache, setCache, colorPaletteKey } from '../utils/simple-cache';

export default function useColorPalettePagination() {
	const [ colorPalettes, setColorPalettes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState( 1 );

	const loadPalettes = async ( page = 1 ) => {
		try {
			setIsLoading( true );

			// Check cache first
			const cacheKey = colorPaletteKey( page, 10 );
			const cached = getCache( cacheKey );

			if ( cached ) {
				setColorPalettes( cached.data );
				setTotalPages( cached.pagination.total_pages );
				setCurrentPage( cached.pagination.current_page );
				setIsLoading( false );
				return;
			}

			// Fetch from API
			const response = await fetchDesignSettings( {
				type: 'color-palettes',
				page,
				perPage: 10,
			} );

			// Cache the response
			setCache( cacheKey, response );

			setColorPalettes( response.data );
			setTotalPages( response.pagination.total_pages );
			setCurrentPage( response.pagination.current_page );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to load palettes:', error );
		} finally {
			setIsLoading( false );
		}
	};

	const handlePageChange = ( newPage ) => {
		if ( newPage >= 1 && newPage <= totalPages ) {
			loadPalettes( newPage );
		}
	};

	return {
		colorPalettes,
		isLoading,
		currentPage,
		totalPages,
		loadPalettes,
		handlePageChange,
	};
}
