import { Navigate, Step } from '@/components';
import { Container } from '@newfold/ui-component-library';
import { SiteTitleInput, LogoUploadInput, SocialAccounts } from '.';

const IntakeStep = () => {
	return (
		<Step>
			<Container
				className="nfd-onboarding-step-welcome nfd-min-w-[768px] nfd-max-w-3xl"
			>
				<Container.Header
					title={ __( 'Let\'s get started!' ) }
					description={ __( 'Help us start designing and optimzing your site to be found!' ) }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<div className="nfd-flex nfd-flex-col nfd-gap-4">
						<SiteTitleInput />
						<LogoUploadInput />
						<SocialAccounts />
					</div>
				</Container.Block>
				<Container.Footer>
					<div>
						<Navigate toRoute="/decide" direction="forward">Next</Navigate>
					</div>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default IntakeStep;
