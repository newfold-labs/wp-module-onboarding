import { Navigate, Step } from '@/components';
import { Container } from '@newfold/ui-component-library';
import { PromptInput } from '.';

const DreamAndDecideStep = () => {
	return (
		<Step>
			<Container className="nfd-onboarding-step-info nfd-min-w-[768px] nfd-max-w-3xl">
				<Container.Header
					title="Share your vision"
					description="Tell us who you are and we'll put you in a great starting place."
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<PromptInput />
				</Container.Block>
				<Container.Footer>
					<div className="nfd-flex nfd-gap-3">
						<Navigate toRoute="/design" direction="forward">Next</Navigate>
						<Navigate toRoute="/intake" direction="backward" variant="secondary">Back</Navigate>
					</div>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default DreamAndDecideStep;
