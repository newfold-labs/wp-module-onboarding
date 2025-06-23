/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

function useGlobalStyles() {
	const [ hasResolved, setHasResolved ] = useState( false );

	const { editEntityRecord, saveEditedEntityRecord } = useDispatch( coreStore );

	const { globalStylesId, settings } = useSelect( ( select ) => {
		const {
			__experimentalGetCurrentGlobalStylesId,
			getEditedEntityRecord,
		} = select( coreStore );

		const id = __experimentalGetCurrentGlobalStylesId
			? __experimentalGetCurrentGlobalStylesId()
			: undefined;
		const record = id ? getEditedEntityRecord( 'root', 'globalStyles', id ) : undefined;

		return {
			globalStylesId: id,
			settings: record?.settings,
		};
	}, [] );

	// Ready to fulfill.
	useEffect( () => {
		if ( globalStylesId && settings ) {
			setHasResolved( true );
		}
	}, [ globalStylesId, settings ] );

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

	const setColorPalette = useCallback(
		async ( paletteArray ) => {
			if ( ! globalStylesId || ! settings ) {
				// eslint-disable-next-line no-console
				console.error( 'setColorPalette dependency not yet ready. Use "hasResolved" state to check if the dependency is resolved.' );
				return;
			}

			setConfig( {
				color: {
					palette: {
						...( settings?.color?.palette || {} ),
						theme: paletteArray,
					},
				},
			} );

			return await saveEditedEntityRecord( 'root', 'globalStyles', globalStylesId );
		},
		[ globalStylesId, settings, setConfig, saveEditedEntityRecord ]
	);

	return {
		hasResolved,
		settings,
		setColorPalette,
	};
}

export default useGlobalStyles;
