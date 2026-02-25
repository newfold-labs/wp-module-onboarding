import { useState, useEffect, useRef } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { dispatch, useSelect } from '@wordpress/data';
import { Button, Title, ProgressBar } from '@newfold/ui-component-library';
import { AdjustmentsVerticalIcon, CloudArrowUpIcon, RectangleStackIcon as RectangleStackIconOutline, ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/react/24/solid';
import { InteractionBlockingOverlay } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { usePublishSite } from '@/utils/hooks';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '@/utils/analytics/hiive/constants';
import { pluginDashboardPage, wpEditorChat, wpEditorDesignStudio } from '@/data/constants';

const HeaderActions = () => {
	const [ isPublishing, setIsPublishing ] = useState( false );

	const navigate = useNavigate();

	const { canvasSidebarIsOpen, hasOriginPrompt } = useSelect( ( select ) => ( {
		canvasSidebarIsOpen: select( nfdOnboardingStore ).getCanvasSidebarIsOpen(),
		hasOriginPrompt: select( nfdOnboardingStore ).getHasOriginPrompt(),
	} ), [] );

	const { hasResolved: isReadyToPublish, publishSite, status } = usePublishSite();
	const hasAutoRedirectedRef = useRef( false );

	// Origin-prompt flow: auto-publish and send user to editor chat (same as "Customize with AI").
	useEffect( () => {
		if ( ! hasOriginPrompt || ! isReadyToPublish || hasAutoRedirectedRef.current ) {
			return;
		}
		hasAutoRedirectedRef.current = true;
		handleCustomizeWithAI();
	}, [ hasOriginPrompt, isReadyToPublish ] );

	const handleCanvasSidebarToggle = () => {
		dispatch( nfdOnboardingStore ).setCanvasSidebarIsOpen( ! canvasSidebarIsOpen );
	};

	const handlePublishSite = async () => {
		setIsPublishing( true );
		const result = await publishSite();

		return result;
	};

	const handleCustomizeWithAI = async () => {
		await handlePublishSite();

		// Analytics: Onboarding complete event.
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_COMPLETE, 'customize_with_ai', {
				source: 'quickstart',
			} )
		);

		// Send to the Editor Chat.
		window.location.replace( wpEditorChat );
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

	const handleTryAgain = () => {
		navigate( '/previews', {
			state: { direction: 'backward' },
		} );
	};

	const renderPublishSiteStatus = () => {
		return (
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-5 nfd-min-w-[470px] nfd-max-w-[470px] nfd-mx-auto nfd-z-30 mobile:nfd-min-w-[90%] mobile:nfd-max-w-[90%]">
				{ status.hasError && (
					<ExclamationTriangleIcon className="nfd-w-9 nfd-h-9 nfd-text-white" />
				) }
				{ status.message && (
					<Title as="h2" size="2" className="nfd-text-white nfd-text-center nfd-text-[22px] nfd-font-semibold nfd-max-w-[400px] mobile:nfd-text-base">
						{ status.message }
					</Title>
				) }
				{ ! status.hasError && (
					<>
						<ProgressBar
							max={ 100 }
							min={ 0 }
							progress={ status.progress }
							className="nfd-bg-zinc-300/40 nfd-mt-3"
						/>
						<style>
							{ `
								.nfd-progress-bar .nfd-progress-bar__progress {
									background-color: white;
								}
							` }
						</style>
					</>
				) }
				{ status.hasError && (
					<div className="nfd-flex nfd-items-center nfd-gap-4 nfd-mt-3">
						<Button
							className="nfd-font-semibold"
							onClick={ handleTryAgain }
							size="large"
						>
							{ __( 'Try Again', 'wp-module-onboarding' ) }
						</Button>
					</div>
				) }
			</div>
		);
	};

	const renderCustomizeButton = () => {
		const hasBluMVP = window.NewfoldRuntime?.capabilities?.hasBluMVP;
		// If the site has the Blu MVP capability, show the Customize with AI button.
		if ( hasBluMVP ) {
			return (
				<Button
					variant="secondary"
					className="nfd-font-semibold"
					disabled={ ! isReadyToPublish || isPublishing }
					onClick={ handleCustomizeWithAI }
				>
					<SparklesIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
					{ __( 'Customize with AI', 'wp-module-onboarding' ) }
				</Button>
			);
		}

		// Otherwise, show the Select & Customize button.
		return (
			<Button
				variant="secondary"
				className="nfd-font-semibold"
				disabled={ ! isReadyToPublish || isPublishing }
				onClick={ handleSelectAndCustomize }
			>
				<AdjustmentsVerticalIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Select & Customize', 'wp-module-onboarding' ) }
			</Button>
		);
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-gap-4 mobile:nfd-w-full mobile:nfd-justify-between">
			{ isPublishing && (
				<InteractionBlockingOverlay
					hasLoadingSpinner={ status.hasError ? false : true }
					hasBackground={ true }
				>
					{ renderPublishSiteStatus() }
				</InteractionBlockingOverlay>
			) }
			<button
				type="button"
				title={ __( 'Toggle layouts sidebar', 'wp-module-onboarding' ) }
				aria-label={ __( 'Toggle layouts sidebar', 'wp-module-onboarding' ) }
				className="nfd-onboarding-canvas-sidebar-header-close nfd-mr-2 nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2 mobile:nfd-hidden"
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
			{ renderCustomizeButton() }
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
};

export default HeaderActions;
