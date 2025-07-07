/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useMemo } from '@wordpress/element';

export default function useColorSettings() {
	const { editEntityRecord } = useDispatch( coreStore );

	const { globalStylesId, settings, rawPalette } = useSelect( ( select ) => {
		const { __experimentalGetCurrentGlobalStylesId, getEditedEntityRecord } = select( coreStore );
		const id = __experimentalGetCurrentGlobalStylesId
			? __experimentalGetCurrentGlobalStylesId()
			: undefined;
		const record = id ? getEditedEntityRecord( 'root', 'globalStyles', id ) : undefined;

		return {
			globalStylesId: id,
			settings: record?.settings,
			rawPalette: record?.settings?.color?.palette?.theme,
		};
	}, [] );

	const themePalette = useMemo( () => rawPalette || [], [ rawPalette ] );

	const globalStyles = useMemo(
		() => ( {
			color: {
				palette: themePalette,
			},
		} ),
		[ themePalette ]
	);

	const setConfig = useCallback(
		( config ) => {
			if ( ! globalStylesId || ! settings ) {
				return;
			}

			editEntityRecord( 'root', 'globalStyles', globalStylesId, {
				settings: {
					...( settings || {} ),
					...config,
				},
			} );
		},
		[ editEntityRecord, globalStylesId, settings ]
	);

	const updatePalette = useCallback(
		( paletteArray ) => {
			if ( ! globalStylesId || ! settings ) {
				return;
			}

			setConfig( {
				color: {
					palette: {
						...( settings?.color?.palette || {} ),
						theme: paletteArray?.palette,
					},
				},
			} );
		},
		[ globalStylesId, settings, setConfig ]
	);

	const updateCustomColor = useCallback(
		( slug, newColor ) => {
			if ( ! globalStylesId || ! settings ) {
				return;
			}

			const updatedPalette = themePalette.map( ( color ) =>
				color.slug === slug ? { ...color, color: newColor } : color
			);

			setConfig( {
				color: {
					palette: {
						...( settings?.color?.palette || {} ),
						theme: updatedPalette,
					},
				},
			} );
		},
		[ globalStylesId, settings, themePalette, setConfig ]
	);

	return {
		settings,
		globalStyles,
		updatePalette,
		updateCustomColor,
	};
}
