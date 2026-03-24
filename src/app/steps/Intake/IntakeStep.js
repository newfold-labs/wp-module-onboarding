import { useState } from '@wordpress/element';
import { select, dispatch, resolveSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Container } from '@newfold/ui-component-library';
import { Navigate, Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_INTAKE_PROMPT_SET, ACTION_SITE_TYPE_SET } from '@/utils/analytics/hiive/constants';
import { SiteTitleInput, PromptInput, calculatePromptStrength, SiteTypeSelector } from '.';
import { completeBlueprintOnboarding } from '@/utils/api/onboarding';
import { wpAdminPage } from '@/data/constants';

const IntakeStep = () => {
	// Initiale state values.
	const { siteType, siteTitle, prompt } = select( nfdOnboardingStore ).getInputSlice();
	const retryMode = select( nfdOnboardingStore ).getRetryMode();

	// Step states.
	const [ siteTypeValue, setSiteTypeValue ] = useState( siteType );
	const [ siteTitleValue, setSiteTitleValue ] = useState( siteTitle );
	const [ promptValue, setPromptValue ] = useState( prompt );

	/**
	 * Set WordPress site title.
	 */
	const setSiteTitle = async () => {
		const title = siteTitleValue.trim();
		if ( title ) {
			// Force the site entity to be loaded.
			await resolveSelect( coreStore ).getEntityRecord( 'root', 'site' );
			// Change site title.
			dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
				title,
			} );
			dispatch( coreStore ).saveEditedEntityRecord( 'root', 'site' );
		}
	};

	const handleNext = () => {
		// If prompt value is 'skip', skip the onboarding.
		if ( promptValue.trim().toLowerCase() === 'skip' ) {
			completeBlueprintOnboarding();
			// redirect to wordpress dashboard
			window.location.href = wpAdminPage;
			return;
		}

		dispatch( nfdOnboardingStore ).setInputSlice( {
			siteType: siteTypeValue,
			siteTitle: siteTitleValue.trim(),
			prompt: promptValue.trim(),
		} );

		setSiteTitle();

		// Analytics: Track site type selection
		if ( siteTypeValue && siteTypeValue !== siteType ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITE_TYPE_SET,
					siteTypeValue,
					{
						source: 'quickstart',
					}
				)
			);
		}

		// Analytics: Prompt set.
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
			return __( "Sorry, let's try that again.", 'wp-module-onboarding' );
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
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-site-details">
				<Container.Header
					title={ getStepTitle() }
					description={ getStepDescription() }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<div className="nfd-flex nfd-flex-col nfd-gap-6">
						<div className="nfd-flex nfd-gap-4 nfd-w-full nfd-pb-7 nfd-border-b mobile:nfd-flex-col">
							<SiteTitleInput value={ siteTitleValue } onChange={ setSiteTitleValue } />
							<SiteTypeSelector value={ siteTypeValue } onChange={ setSiteTypeValue } />
						</div>
						<PromptInput value={ promptValue } onChange={ setPromptValue } />
					</div>
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/logo"
							direction="forward"
							disabled={ ! siteTypeValue || ! siteTitleValue || ! promptValue }
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
