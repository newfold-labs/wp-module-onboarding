import { dispatch, useSelect } from '@wordpress/data';
import { Button } from '@newfold/ui-component-library';
import { AdjustmentsVerticalIcon, CloudArrowUpIcon, RectangleStackIcon as RectangleStackIconOutline } from '@heroicons/react/24/outline';
import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/react/24/solid'
import { InteractionBlockingOverlay } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { usePublishSite } from '@/utils/hooks';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '@/utils/analytics/hiive/constants';
import { pluginDashboardPage, wpEditorDesignStudio } from '@/data/constants';

const HeaderActions = () => {
	const [ isPublishing, setIsPublishing ] = useState( false );

	const { canvasSidebarIsOpen } = useSelect( ( select ) => {
		return {
			canvasSidebarIsOpen: select( nfdOnboardingStore ).getCanvasSidebarIsOpen(),
		};
	} );

	const { hasResolved: isReadyToPublish, publishSite } = usePublishSite();

	const handleCanvasSidebarToggle = () => {
		dispatch( nfdOnboardingStore ).setCanvasSidebarIsOpen( ! canvasSidebarIsOpen );
	};

	const handlePublishSite = async () => {
		setIsPublishing( true );
		const result = await publishSite();
		setIsPublishing( false );

		return result;
	};

	const handleSelectAndCustomize = async () => {
		await handlePublishSite();

		// Analytics: Onboarding complete event.
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_COMPLETE, 'select_and_customize', {
				source: 'quickstart',
			} )
		);

		// Send to the Design Studio.
		window.location.replace( wpEditorDesignStudio );
	};

	const handleSaveAndPublish = async () => {
		await handlePublishSite();

		// Analytics: Onboarding complete event.
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_COMPLETE, 'save_and_publish', {
				source: 'quickstart',
			} )
		);

		// Send to the Plugin Dashboard.
		window.location.replace( pluginDashboardPage );
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-gap-4">
			{ isPublishing && (
				<InteractionBlockingOverlay
					hasLoadingSpinner={ true }
					hasBackground={ isPublishing }
				/>
			) }
			<button
				type="button"
				aria-label={ __( 'Close layouts sidebar', 'wp-module-onboarding' ) }
				className="nfd-onboarding-canvas-sidebar-header-close nfd-mr-2 nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2"
				onClick={ handleCanvasSidebarToggle }
			>
				{
					canvasSidebarIsOpen ? (
						<RectangleStackIconSolid className="nfd-w-6 nfd-h-6 nfd-text-primary nfd-transition-all nfd-duration-200 nfd-ease-in-out" />
					) : (
						<RectangleStackIconOutline className="nfd-w-6 nfd-h-6 nfd-transition-all nfd-duration-200 nfd-ease-in-out" />
					)
				}
			</button>
			<Button
				variant="secondary"
				className="nfd-font-semibold"
				disabled={ ! isReadyToPublish || isPublishing }
				onClick={ handleSelectAndCustomize }
			>
				<AdjustmentsVerticalIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Select & Customize', 'wp-module-onboarding' ) }
			</Button>
			<Button
				variant="primary"
				className="nfd-font-semibold"
				onClick={ handleSaveAndPublish }
				disabled={ ! isReadyToPublish || isPublishing }
			>
				<CloudArrowUpIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Save & Publish', 'wp-module-onboarding' ) }
			</Button>
		</div>
	);
}

export default HeaderActions;
