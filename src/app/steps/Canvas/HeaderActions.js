import { useState } from 'react';
import { dispatch, useSelect } from '@wordpress/data';
import { store as viewportStore } from '@wordpress/viewport';
import { Button, SelectField } from '@newfold/ui-component-library';
import {
	AdjustmentsVerticalIcon,
	CloudArrowUpIcon,
	RectangleStackIcon as RectangleStackIconOutline,
} from '@heroicons/react/24/outline';
import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/react/24/solid';
import { InteractionBlockingOverlay } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { usePublishSite } from '@/utils/hooks';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '@/utils/analytics/hiive/constants';
import { pluginDashboardPage, wpEditorDesignStudio } from '@/data/constants';

const HeaderActions = () => {
	const actionLabelMap = {
		toggleSidebar: __( 'Toggle Layouts Sidebar', 'wp-module-onboarding' ),
		selectCustomize: __( 'Select & Customize', 'wp-module-onboarding' ),
		savePublish: __( 'Save & Publish', 'wp-module-onboarding' ),
	};

	const isMobile = useSelect(
		( select ) => select( viewportStore ).isViewportMatch( '< small' ),
		[]
	);

	const [ isPublishing, setIsPublishing ] = useState( false );
	const [ mobileAction, setMobileAction ] = useState( '' );

	const { canvasSidebarIsOpen } = useSelect( ( select ) => ( {
		canvasSidebarIsOpen: select( nfdOnboardingStore ).getCanvasSidebarIsOpen(),
	} ) );

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

	const handleMobileAction = async ( value ) => {
		setMobileAction( value );
		if ( value === 'toggleSidebar' ) {
			handleCanvasSidebarToggle();
		} else if ( value === 'selectCustomize' ) {
			await handleSelectAndCustomize();
		} else if ( value === 'savePublish' ) {
			await handleSaveAndPublish();
		}
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-flex-wrap nfd-items-center nfd-gap-4 nfd-w-full sm:nfd-w-auto">
			{ isPublishing && (
				<InteractionBlockingOverlay hasLoadingSpinner hasBackground />
			) }

			{ /* Desktop view: toggle button */ }
			{ ! isMobile && (
				<button
					type="button"
					title={ __( 'Toggle layouts sidebar', 'wp-module-onboarding' ) }
					aria-label={ __( 'Toggle layouts sidebar', 'wp-module-onboarding' ) }
					className="nfd-onboarding-canvas-sidebar-header-close nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2"
					onClick={ handleCanvasSidebarToggle }
				>
					{ canvasSidebarIsOpen ? (
						<RectangleStackIconSolid className="nfd-w-6 nfd-h-6 nfd-text-primary" />
					) : (
						<RectangleStackIconOutline className="nfd-w-6 nfd-h-6" />
					) }
				</button>
			) }

			{ /* Desktop buttons */ }
			{ ! isMobile && (
				<>
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
						disabled={ ! isReadyToPublish || isPublishing }
						onClick={ handleSaveAndPublish }
					>
						<CloudArrowUpIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
						{ __( 'Save & Publish', 'wp-module-onboarding' ) }
					</Button>
				</>
			) }

			{ /* Mobile dropdown */ }
			{ isMobile && (
				<div className="nfd-relative nfd-z-[9999] nfd-w-full nfd-max-w-[14rem] sm:nfd-max-w-[12rem]">
					<SelectField
						id="nfd-mobile-actions"
						label={ __( 'Choose Action', 'wp-module-onboarding' ) }
						value={ mobileAction }
						selectedLabel={
							mobileAction
								? actionLabelMap[ mobileAction ]
								: actionLabelMap.toggleSidebar
						}
						disabled={ ! isReadyToPublish || isPublishing }
						onChange={ ( e ) => handleMobileAction( e ) }
						className="nfd-w-full"
					>
						<SelectField.Option
							label={ actionLabelMap.toggleSidebar }
							value="toggleSidebar"
						/>
						<SelectField.Option
							label={ actionLabelMap.selectCustomize }
							value="selectCustomize"
						/>
						<SelectField.Option
							label={ actionLabelMap.savePublish }
							value="savePublish"
						/>
					</SelectField>
				</div>
			) }
		</div>
	);
};

export default HeaderActions;
