import { Container } from '@newfold/ui-component-library';
import { Navigate, Step } from '@/components';
import { dispatch, select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { PromptInput } from '.';

const IntakeStep = () => {
	const prompt = select( nfdOnboardingStore ).getPrompt();
	const bluPrompt = select( nfdOnboardingStore ).getBluPrompt();
	const [ promptValue, setPromptValue ] = useState( prompt || bluPrompt );

	const handleNext = () => {
		dispatch( nfdOnboardingStore ).setInputSlice( {
			prompt: promptValue.trim(),
		} );
	};

	const getStepTitle = () => {
		return __( 'Tell us about your site', 'wp-module-onboarding' );
	};

	const getStepDescription = () => {
		return __( 'Share your story! We will use your answer to build a wonderful website for you.', 'wp-module-onboarding' );
	};

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-intake">
				<Container.Header
					title={ getStepTitle() }
					description={ getStepDescription() }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<div className="nfd-flex nfd-flex-col nfd-gap-6">
						<PromptInput value={ promptValue } onChange={ setPromptValue } />
					</div>
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/generating"
							direction="forward"
							disabled={ ! promptValue }
							callback={ handleNext }
						>
							{ __( 'Next', 'wp-module-onboarding' ) }
						</Navigate>
					</Step.Actions>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default IntakeStep;
