import { useNavigate } from 'react-router-dom';
import { Button, Title, ProgressBar, Link } from '@newfold/ui-component-library';
import { ArrowLeftIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { InteractionBlockingOverlay } from '@/components';
import { usePublishBlueprintSite } from '@/utils/hooks';
import { pluginDashboardPage } from '@/data/constants';

const HeaderActions = () => {
	const [ isPublishing, setIsPublishing ] = useState( false );

	const navigate = useNavigate();

	const { status, publishBlueprintSite } = usePublishBlueprintSite();

	const handlePublishBlueprintSite = async () => {
		setIsPublishing( true );

		const result = await publishBlueprintSite();
		if ( ! result ) {
			// On error, do not redirect to the Plugin Dashboard...
			// Let renderBlueprintImportStatus handle the error UI.
			return;
		}

		// Send to the Plugin Dashboard.
		window.location.replace( pluginDashboardPage );
	};

	const handleBackToTemplates = () => {
		navigate( '/blueprints', {
			state: { direction: 'backward' },
		} );
	};

	const renderBlueprintImportStatus = () => {
		return (
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-5 nfd-min-w-[470px] nfd-max-w-[470px] nfd-mx-auto nfd-z-30">
				{ status.hasError && (
					<ExclamationTriangleIcon className="nfd-w-9 nfd-h-9 nfd-text-white" />
				) }
				{ status.message && (
					<Title as="h2" size="2" className="nfd-text-white nfd-text-center nfd-text-[22px] nfd-font-semibold nfd-max-w-[400px]">
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
							onClick={ handlePublishBlueprintSite }
							size="large"
						>
							{ __( 'Try Again', 'wp-module-onboarding' ) }
						</Button>
						<Link
							href="#"
							className="nfd-font-semibold nfd-text-white nfd-no-underline nfd-text-base"
							onClick={ ( e ) => {
								e.preventDefault();
								handleBackToTemplates();
							} }
						>
							{ __( 'Try another template', 'wp-module-onboarding' ) }
						</Link>
					</div>
				) }
			</div>
		);
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-gap-4 mobile:nfd-w-full mobile:nfd-justify-between">
			{ isPublishing && (
				<InteractionBlockingOverlay
					hasLoadingSpinner={ status.hasError ? false : true }
					hasBackground={ true }
				>
					{ renderBlueprintImportStatus() }
				</InteractionBlockingOverlay>
			) }
			<Button
				variant="secondary"
				className="nfd-font-semibold"
				onClick={ handleBackToTemplates }
				disabled={ isPublishing }
			>
				<ArrowLeftIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Back to Templates', 'wp-module-onboarding' ) }
			</Button>
			<Button
				variant="primary"
				className="nfd-font-semibold"
				onClick={ handlePublishBlueprintSite }
				disabled={ isPublishing }
			>
				<CheckIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Select Template', 'wp-module-onboarding' ) }
			</Button>
		</div>
	);
};

export default HeaderActions;
