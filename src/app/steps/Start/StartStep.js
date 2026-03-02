import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';

const StartStep = () => {
	const { bluPrompt, regenerateMode } = useSelect( ( select ) => {
		return {
			bluPrompt: select( nfdOnboardingStore ).getBluPrompt(),
			regenerateMode: select( nfdOnboardingStore ).getRegenerateMode(),
		};
	} );

	const navigate = useNavigate();

	useEffect( () => {
		if ( regenerateMode || ! bluPrompt ) {
			// Navigate to IntakeStep
			navigate( '/intake' );
			return;
		}

		// Navigate to GeneratingStep
		navigate( '/generating' );
	}, [ bluPrompt, regenerateMode, navigate ] );

	const getCustomStyles = () => {
		return (
			<style>
				{ `
				.nfd-onboarding-header {
					display: none !important;
				}

				.nfd-onboarding-body {
					min-height: calc(100dvh - 64px) !important;
					padding-top: 0 !important;
					padding-bottom: 0 !important;
				}
				` }
			</style>
		);
	};

	return (
		<Container className="nfd-onboarding-step-container nfd-onboarding-step-start">
			{ getCustomStyles() }
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-h-full">
				<Spinner
					variant="primary"
					size="8"
				/>
			</div>
		</Container>
	);
};

export default StartStep;
