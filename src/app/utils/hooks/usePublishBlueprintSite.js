import { dispatch, select as syncSelect, useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { installBlueprintRequiredPlugins, importBlueprint, completeBlueprintOnboarding } from '@/utils/api';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ERROR_STATE_TRIGGERED, ACTION_BLUEPRINT_PUBLISHED, ACTION_SITE_TYPE_SET } from '@/utils/analytics/hiive/constants';

const usePublishBlueprintSite = () => {
	const [ status, setStatus ] = useState( {
		progress: 0,
		hasError: false,
		message: '',
	} );

	const { selectedBlueprint } = useSelect( ( select ) => {
		return {
			selectedBlueprint: select( nfdOnboardingStore ).getSelectedBlueprint(),
		};
	} );

	const installRequiredPlugins = async () => {
		setStatus( {
			progress: 0,
			hasError: false,
			message: __( 'Installing required plugins…', 'wp-module-onboarding' ),
		} );
		await installBlueprintRequiredPlugins( selectedBlueprint );
		setStatus( ( prev ) => ( {
			...prev,
			progress: 10,
		} ) );
		// Set 2 seconds minimum message duration.
		await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) );
		return true;
	};

	const publishBlueprint = async () => {
		// Import the blueprint.
		setStatus( {
			progress: 25,
			hasError: false,
			message: __( 'Importing template content…', 'wp-module-onboarding' ),
		} );
		const result = await importBlueprint( selectedBlueprint );
		if ( result.error ) {
			setStatus( {
				progress: 0,
				hasError: true,
				message: __( 'Oh no! Template import failed.', 'wp-module-onboarding' ),
			} );

			// Analytics: Failed to publish blueprint.
			sendOnboardingEvent(
				new OnboardingEvent( ACTION_ERROR_STATE_TRIGGERED, 'blueprint_publish_failed', {
					blueprint_slug: selectedBlueprint,
					source: 'quickstart',
				} )
			);

			return false;
		}
		// Complete onboarding.
		setStatus( {
			progress: 80,
			hasError: false,
			message: __( 'Preparing your new site…', 'wp-module-onboarding' ),
		} );
		await completeBlueprintOnboarding();
		// Set 2 seconds minimum message duration.
		await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) );
		setStatus( {
			progress: 100,
			hasError: false,
			message: __( 'Your new site is ready! Redirecting… 🚀', 'wp-module-onboarding' ),
		} );
		// Set 1 seconds minimum message duration.
		await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );

		// Analytics: Successfully published blueprint.
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_BLUEPRINT_PUBLISHED, selectedBlueprint, {
				source: 'quickstart',
			} )
		);

		return true;
	};

	/**
	 * Publish the blueprint site.
	 * @return {boolean} True if the blueprint site was published successfully, false otherwise.
	 */
	const publishBlueprintSite = async () => {
		// Set the site type and experience level (needed for backend processing and reporting).
		const siteType = syncSelect( nfdOnboardingStore ).getActiveTab();
		dispatch( nfdOnboardingStore ).setInputSlice( {
			siteType,
			experienceLevel: 'advanced',
		} );

		// Install any required plugins for the blueprint (background process).
		await installRequiredPlugins();

		// Publish the blueprint.
		const result = await publishBlueprint();
		if ( ! result ) {
			return false;
		}

		// Analytics: site type set.
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_SITE_TYPE_SET,
				siteType,
				{
					source: 'quickstart',
				}
			)
		);

		return true;
	};

	return { status, publishBlueprintSite };
};

export default usePublishBlueprintSite;
