import { Navigate, Step } from '@/components';
import { Button, Container } from '@newfold/ui-component-library';

const InfoStep = () => {
	return (
		<Step>
			<Container
				className="nfd-onboarding-step-info nfd-max-w-3xl"
			>
				<Container.Header
					title="Let's get your info"
					description="We're building the future"
				/>
				<Container.Block separator={ false }>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</p>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</p>
				</Container.Block>
				<Container.Footer>
					<div className="nfd-flex nfd-gap-3">
						<Navigate toRoute="/design" direction="forward">Next</Navigate>
						<Navigate toRoute="/" direction="backward" variant="secondary">Back</Navigate>
					</div>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default InfoStep;
