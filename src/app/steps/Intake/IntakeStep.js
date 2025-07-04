import { Navigate, Step } from '@/components';
import { Container, Title } from '@newfold/ui-component-library';
import { SiteTitleInput, PromptInput, LanguageSelector, calculatePromptStrength } from '.';
import { select, dispatch, useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_INTAKE_PROMPT_SET } from '@/utils/analytics/hiive/constants';

const IntakeStep = () => {
	// Initiale state values.
	const { siteTitle, selectedLocale, prompt } = select( nfdOnboardingStore ).getInputSlice();

	// Step states.
	const [ siteTitleValue, setSiteTitleValue ] = useState( siteTitle );
	const [ selectedLocaleValue, setSelectedLocaleValue ] = useState( selectedLocale );
	const [ promptValue, setPromptValue ] = useState( prompt );

	const { retryMode } = useSelect( ( select ) => {
		return {
			retryMode: select( nfdOnboardingStore ).getRetryMode(),
		};
	} );

	const handleNext = () => {
		dispatch( nfdOnboardingStore ).setInputSlice( {
			siteTitle: siteTitleValue.trim(),
			selectedLocale: selectedLocaleValue,
			prompt: promptValue.trim(),
		} );

		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_INTAKE_PROMPT_SET,
				promptValue.trim(),
				{
					strength: calculatePromptStrength( promptValue.trim() ).strength,
					source: 'quickstart',
				}
			)
		);
	};

	const getStepTitle = () => {
		if ( retryMode ) {
			return __( 'Sorry, let’s try that again.', 'wp-module-onboarding' );
		}
		return __( 'Tell us about your site', 'wp-module-onboarding' );
	};

	const getStepDescription = () => {
		if ( retryMode ) {
			return __( "We're sorry, but we ran into a problem. Just enter your info again and we'll try once more.", 'wp-module-onboarding' );
		}
		return __( 'Share your story! We will use your answer to build a wonderful website for you.', 'wp-module-onboarding' );
	};

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-site-details nfd-px-4 sm:nfd-px-0 nfd-mt-5 sm:nfd-my-0">
				<Container.Header
					title={
						<Title
							as="h2"
							className="nfd-text-base sm:nfd-text-xl md:nfd-text-2xl nfd-font-semibold"
						>
							{ getStepTitle() }
						</Title>
					}
					description={
						<p className="nfd-text-sm sm:nfd-text-base md:nfd-text-[17px] nfd-text-content-primary nfd-mt-2">
							{ getStepDescription() }
						</p>
					}
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<div className="nfd-flex nfd-flex-col nfd-gap-6">
						<div className="nfd-flex nfd-flex-col sm:nfd-flex-row nfd-gap-4 nfd-w-full">
							<SiteTitleInput
								value={ siteTitleValue }
								onChange={ setSiteTitleValue }
								className="nfd-w-full"
							/>
							<LanguageSelector
								value={ selectedLocaleValue }
								onChange={ setSelectedLocaleValue }
								className="nfd-w-full sm:nfd-w-auto"
							/>
						</div>
						<PromptInput
							value={ promptValue }
							onChange={ setPromptValue }
							className="nfd-w-full"
						/>
					</div>
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/logo"
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
