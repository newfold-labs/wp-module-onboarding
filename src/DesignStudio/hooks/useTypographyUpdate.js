/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';

/**
 * Updates global typography settings with selected font families.
 *
 * @return {Object} Typography update functions and current settings
 */
export function useTypographyUpdate() {
	const { editEntityRecord } = useDispatch( coreStore );

	const { globalStylesId, record } = useSelect( ( select ) => {
		const { __experimentalGetCurrentGlobalStylesId, getEditedEntityRecord } = select( coreStore );
		const id = __experimentalGetCurrentGlobalStylesId
			? __experimentalGetCurrentGlobalStylesId()
			: undefined;

		return {
			globalStylesId: id,
			record: id ? getEditedEntityRecord( 'root', 'globalStyles', id ) : undefined,
		};
	}, [] );

	const settings = record?.settings;

	const globalStyles = useMemo(
		() => ( {
			typography: {
				fontFamilies: record?.settings?.typography?.fontFamilies || {},
				elements: record?.styles?.elements || {},
			},
		} ),
		[ record?.settings?.typography?.fontFamilies, record?.styles?.elements ]
	);

	const updateTypography = async ( headingFontFamily, bodyFontFamily ) => {
		if ( ! globalStylesId || ! settings ) {
			return false;
		}

		try {
			editEntityRecord( 'root', 'globalStyles', globalStylesId, {
				styles: {
					...( record?.styles || {} ),
					blocks: {
						...( record?.styles?.blocks || {} ),
						'core/heading': {
							...( record?.styles?.blocks?.[ 'core/heading' ] || {} ),
							typography: {
								...( record?.styles?.blocks?.[ 'core/heading' ]?.typography || {} ),
								fontFamily: headingFontFamily,
							},
						},
					},
					typography: {
						...( record?.styles?.typography || {} ),
						fontFamily: bodyFontFamily,
					},
					elements: {
						...( record?.styles?.elements || {} ),
						heading: {
							...( record?.styles?.elements?.heading || {} ),
							typography: {
								...( record?.styles?.elements?.heading?.typography || {} ),
								fontFamily: headingFontFamily,
							},
						},
					},
				},
			} );
			return true;
		} catch ( error ) {
			return false;
		}
	};

	return {
		settings,
		globalStyles,
		updateTypography,
	};
}
