import { Navigate, Step } from '@/components';
import { Container } from '@newfold/ui-component-library';
import { LogoUploadInput } from '.';

const LogoStep = () => {
	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-logo">
				<Container.Header
					title={ __( 'Do you have a logo you would like to use?', 'wp-module-onboarding' ) }
					description={ __( 'Browse to upload your logo, or drag and drop it below.', 'wp-module-onboarding' ) }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<LogoUploadInput />
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/generating"
							direction="forward"
						>
							{ __( 'Next', 'wp-module-onboarding' ) }
						</Navigate>
						<Navigate
							toRoute="/intake"
							direction="backward"
							variant="secondary"
						>
							{ __( 'Back', 'wp-module-onboarding' ) }
						</Navigate>
					</Step.Actions>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default LogoStep;
