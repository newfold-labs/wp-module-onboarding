import { Navigate, Step } from '@/components';
import { Container } from '@newfold/ui-component-library';
import { SiteTitleInput, PromptInput, LanguageSelector, calculatePromptStrength } from '.';
import { select, dispatch } from '@wordpress/data';
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

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-site-details">
				<Container.Header
					title={ __( 'Tell us about your site', 'wp-module-onboarding' ) }
					description={ __( 'Share your story! We will use your answer to build a wonderful website for you.', 'wp-module-onboarding' ) }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<div className="nfd-flex nfd-flex-col nfd-gap-6">
						<div className="nfd-flex nfd-gap-4 nfd-w-full">
							<SiteTitleInput value={ siteTitleValue } onChange={ setSiteTitleValue } />
							<LanguageSelector value={ selectedLocaleValue } onChange={ setSelectedLocaleValue } />
						</div>
						<PromptInput value={ promptValue } onChange={ setPromptValue } />
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
