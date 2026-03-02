import { dispatch, select } from '@wordpress/data';
import { Container, Title } from '@newfold/ui-component-library';
import { BrandLoader, Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { SiteGenService } from '@/services';

const GeneratingStep = () => {
	useEffect( () => {
		SiteGenService.generate();
	}, [] );

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-generating">
				<Container.Block className="nfd-text-center nfd-p-0">
					<>
						<div className="nfd-my-6 nfd-flex nfd-justify-center">
							<BrandLoader />
						</div>
						<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-5">
							<Title className="nfd-text-[2.5rem] mobile:nfd-text-xl">
								{ __( 'Building your website…', 'wp-module-onboarding' ) }
							</Title>
							<p className="nfd-text-[18px] nfd-text-content-primary mobile:nfd-text-tiny">
								{ __(
									'Hang tight while we create something wonderful for you.',
									'wp-module-onboarding'
								) }
							</p>
						</div>
					</>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default GeneratingStep;
