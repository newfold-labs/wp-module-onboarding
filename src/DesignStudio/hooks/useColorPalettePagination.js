/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchDesignSettings } from '../utils/design-api';

export default function useColorPalettePagination() {
	const [ colorPalettes, setColorPalettes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState( 1 );

	const loadPalettes = async ( page = 1 ) => {
		try {
			setIsLoading( true );
			const { data, pagination } = await fetchDesignSettings( {
				type: 'color-palettes',
				page,
				perPage: 10,
			} );

			setColorPalettes( data );
			setTotalPages( pagination.total_pages );
			setCurrentPage( pagination.current_page );
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
