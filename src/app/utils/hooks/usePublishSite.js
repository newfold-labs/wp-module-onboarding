import { useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { completeOnboarding } from '@/utils/api';
import { useTemplateParts, useGlobalStyles } from '.';

const usePublishSite = () => {
	const [ status, setStatus ] = useState( {
		progress: 0,
		hasError: false,
		message: '',
	} );
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

			setStatus( {
				progress: 0,
				hasError: false,
				message: __( 'Publishing content…', 'wp-module-onboarding' ),
			} );
			// Set 1 second minimum message duration.
			await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );

			setStatus( ( prev ) => ( {
				...prev,
				progress: 10,
			} ) );
			// Set 3 seconds minimum message duration.
			await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );

			setStatus( {
				progress: 40,
				hasError: false,
				message: __( 'Preparing your new site…', 'wp-module-onboarding' ),
			} );

			await Promise.all( [
				updateHeader( homepages[ selectedHomepage ].header ),
				updateFooter( homepages[ selectedHomepage ].footer ),
				setColorPalette( selectedColorPalette ),
				completeOnboarding( selectedHomepage ),
			] );

			setStatus( {
				progress: 100,
				hasError: false,
				message: __( 'Your new site is ready! Redirecting… 🚀', 'wp-module-onboarding' ),
			} );

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
		status,
	};
};

export default usePublishSite;
