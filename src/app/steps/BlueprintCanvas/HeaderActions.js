import { Button } from '@newfold/ui-component-library';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { InteractionBlockingOverlay } from '@/components';
import { useNavigate } from 'react-router-dom';

const HeaderActions = () => {
	const [ isPublishing, setIsPublishing ] = useState( false );

	const navigate = useNavigate();

	const handleBackToTemplates = () => {
		navigate( '/blueprints', {
			state: { direction: 'backward' },
		} );
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-gap-4 mobile:nfd-w-full mobile:nfd-justify-between">
			{ isPublishing && (
				<InteractionBlockingOverlay
					hasLoadingSpinner={ true }
					hasBackground={ isPublishing }
				/>
			) }
			<Button
				variant="secondary"
				className="nfd-font-semibold"
				onClick={ handleBackToTemplates }
			>
				<ArrowLeftIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Back to Templates', 'wp-module-onboarding' ) }
			</Button>
			<Button
				variant="primary"
				className="nfd-font-semibold"
			>
				<CheckIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Select Template', 'wp-module-onboarding' ) }
			</Button>
		</div>
	);
};

export default HeaderActions;
