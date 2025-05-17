import { Navigate, Step } from '@/components';
import { Container } from '@newfold/ui-component-library';
import { SiteTitleInput, PromptInput, LanguageSelector } from '.';

const IntakeStep = () => {
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
							<SiteTitleInput />
							<LanguageSelector />
						</div>
						<PromptInput />
					</div>
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/logo"
							direction="forward"
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
