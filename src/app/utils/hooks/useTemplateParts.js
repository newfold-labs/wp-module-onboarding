/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

function useTemplateParts() {
	const [ hasResolved, setHasResolved ] = useState( false );

	const { editEntityRecord, saveEditedEntityRecord } = useDispatch( coreStore );

	const currentTheme = useSelect( ( select ) => {
		return select( coreStore ).getCurrentTheme();
	}, [] );

	const { templateParts } = useSelect( ( select ) => {
		if ( ! currentTheme ) {
			return {
				templateParts: [],
			};
		}

		const { getEntityRecords } = select( coreStore );

		const templates = getEntityRecords( 'postType', 'wp_template_part', {
			per_page: -1,
		} );

		const filteredByTheme = templates?.filter( ( template ) => {
			return template.theme === currentTheme.stylesheet;
		} );

		return {
			templateParts: filteredByTheme,
		};
	}, [ currentTheme ] );

	// Ready to fulfill.
	useEffect( () => {
		if ( templateParts?.length ) {
			setHasResolved( true );
		}
	}, [ templateParts ] );

	const updateTemplatePart = useCallback(
		async ( part, content ) => {
			if ( ! templateParts ) {
				// eslint-disable-next-line no-console
				console.error( 'updateTemplatePart dependency not yet ready. Use "hasResolved" state to check if the dependency is resolved.' );
				return;
			}

			const partId = currentTheme.stylesheet + '//' + part;

			// Find the template part for the specified area
			const templatePart = templateParts.find( ( template ) => template.id === partId );

			if ( ! templatePart ) {
				return;
			}

			// Update the template part content
			editEntityRecord( 'postType', 'wp_template_part', templatePart.id, {
				content,
			} );

			// Save the changes
			return await saveEditedEntityRecord( 'postType', 'wp_template_part', templatePart.id );
		},
		[ templateParts, currentTheme, editEntityRecord, saveEditedEntityRecord ]
	);

	const updateHeader = useCallback(
		async ( content ) => {
			return await updateTemplatePart( 'header', content );
		},
		[ updateTemplatePart ]
	);

	const updateFooter = useCallback(
		async ( content ) => {
			return await updateTemplatePart( 'footer', content );
		},
		[ updateTemplatePart ]
	);

	return {
		hasResolved,
		templateParts,
		updateTemplatePart,
		updateHeader,
		updateFooter,
	};
}

export default useTemplateParts;
