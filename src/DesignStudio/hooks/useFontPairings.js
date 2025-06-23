/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { fetchDesignSettings } from '../utils/design-api';
import { useTypographyUpdate } from './useTypographyUpdate';

// Helper function to format font family strings
const formatFontFamily = ( fontName, fallback ) => {
	if ( ! fontName ) {
		return fallback;
	}
	if ( fontName.includes( '"' ) || fontName.includes( ',' ) ) {
		return fontName;
	}
	return `"${ fontName }", ${ fallback }`;
};

/**
 * Fetches font pairings from the REST API with pagination support.
 *
 * @param {Object} options         - The options for fetching font pairings
 * @param {number} options.page    - The current page number
 * @param {number} options.perPage - Number of items per page
 * @return {Object} The font pairings data and loading state
 */
export const useFontPairings = ( { page = 1, perPage = 10 } = {} ) => {
	const [ fontPairings, setFontPairings ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	const [ selectedStyle, setSelectedStyle ] = useState( null );
	const [ pagination, setPagination ] = useState( {
		totalItems: 0,
		totalPages: 0,
		currentPage: page,
		perPage,
	} );

	const { updateTypography } = useTypographyUpdate();

	const formatFontPairings = ( pairs ) => {
		return pairs.map( ( pair, index ) => {
			const headingFont = pair.font_heading_name || 'serif';
			const bodyFont = pair.font_content_name || 'sans-serif';
			const name =
				pair.name ||
				`${ headingFont.replace( /\s+/g, '-' ) }-${ bodyFont.replace( /\s+/g, '-' ) }-${ index }`;

			return {
				name,
				id: pair.id || `font-pair-${ index }`,
				title: pair.title || `${ headingFont } & ${ bodyFont }`,
				headingFontFamily: formatFontFamily( pair.font_heading_name, 'serif' ),
				bodyFontFamily: formatFontFamily( pair.font_content_name, 'sans-serif' ),
				aesthetics: pair.aesthetics || name,
				originalData: pair,
			};
		} );
	};

	const fetchFontPairings = async () => {
		try {
			setIsLoading( true );
			setError( null );

			const response = await fetchDesignSettings( {
				type: 'font-pairs',
				page,
				perPage,
			} );

			setFontPairings( formatFontPairings( response.data ) );
			setPagination( {
				totalItems: response.pagination.total_items,
				totalPages: response.pagination.total_pages,
				currentPage: response.pagination.current_page,
				perPage: response.pagination.per_page,
			} );
		} catch ( err ) {
			setError( err.message );
		} finally {
			setIsLoading( false );
		}
	};

	useEffect( () => {
		fetchFontPairings();
	}, [ page, perPage ] );

	const handleSelectStyle = async ( fontPair ) => {
		setSelectedStyle( fontPair.id );
		const success = await updateTypography( fontPair.headingFontFamily, fontPair.bodyFontFamily );
		if ( ! success ) {
			setSelectedStyle( null );
		}
		return success;
	};

	return {
		fontPairings,
		isLoading,
		error,
		pagination,
		selectedStyle,
		handleSelectStyle,
		refetch: () => {
			setIsLoading( true );
			fetchFontPairings();
		},
	};
};
