import { useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { useTemplateParts, useGlobalStyles } from '.';

const usePublishSite = () => {
	const [ hasResolved, setHasResolved ] = useState( false );

	const { homepages, selectedHomepage, selectedColorPalette } = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
			selectedHomepage: select( nfdOnboardingStore ).getSelectedHomepage(),
			selectedColorPalette: select( nfdOnboardingStore ).getSelectedColorPalette(),
		};
	} );

	const { hasResolved: templatePartsHasResolved, updateHeader, updateFooter } = useTemplateParts();
	const { hasResolved: globalStylesHasResolved, setColorPalette } = useGlobalStyles();

	// Ready to fulfill.
	useEffect( () => {
		if ( templatePartsHasResolved && globalStylesHasResolved ) {
			setHasResolved( true );
		}
	}, [ templatePartsHasResolved, globalStylesHasResolved ] );

	const publishSite = useCallback(
		async () => {
			if ( ! hasResolved ) {
				// eslint-disable-next-line no-console
				console.error( 'publishSite dependency not yet ready. Use "hasResolved" state to check if the dependency is resolved.' );
				return undefined;
			}

			await Promise.all( [
				updateHeader( homepages[ selectedHomepage ].header ),
				updateFooter( homepages[ selectedHomepage ].footer ),
				setColorPalette( selectedColorPalette ),
			] );

			return true;
		},
		[
			hasResolved,
			homepages,
			selectedHomepage,
			updateHeader,
			updateFooter,
			setColorPalette,
			selectedColorPalette,
		]
	);

	return {
		hasResolved,
		publishSite,
	};
};

export default usePublishSite;
