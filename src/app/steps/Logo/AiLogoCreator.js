import { Modal, Title, Button } from '@newfold/ui-component-library';
import { InlineAction } from '@/components';
import { ReactComponent as AiIcon } from '@/assets/ai-icon.svg';
import { ReactComponent as LogoGenFigure } from '@/assets/logogen-figure.svg';

const Intro = () => {
	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-8 nfd-w-[390px]">
			<LogoGenFigure className="nfd-w-[170px] nfd-h-auto" />

			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-3 nfd-text-center">
				<Title as="h2" className="nfd-text-2xl nfd-text-content-default">
					{ __( 'Create your logo with AI', 'wp-module-onboarding' ) }
				</Title>
				<p className="nfd-text-content-default nfd-text-tiny">
					{ __( "Let our AI logo creator design your logo. We'll create custom options that capture your brand's essence. Pick your favorite to add to your new site.", 'wp-module-onboarding' ) }
				</p>
				<Button
					className="nfd-mt-4 nfd-py-[11px] nfd-px-[35px]"
				>
					{ __( 'Generate', 'wp-module-onboarding' ) }
				</Button>
			</div>
		</div>
	);
};

const AiLogoCreatorContent = () => {
	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-h-full nfd-py-12">
			<Intro />
		</div>
	);
};

const AiLogoCreator = () => {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<div>
			<InlineAction
				title={ __( 'Create with AI', 'wp-module-onboarding' ) }
				icon={ <AiIcon className="nfd-fill-primary" /> }
				className="nfd-text-primary"
				onClick={ () => {
					setIsOpen( true );
				} }
			/>
			<Modal
				isOpen={ isOpen }
				onClose={ () => {
					setIsOpen( false );
				} }
			>
				<Modal.Panel className="nfd-w-[768px] nfd-max-w-[90vw] nfd-h-[600px] nfd-max-h-[90vh]">
					<AiLogoCreatorContent />
				</Modal.Panel>
			</Modal>
		</div>
	);
};

export default AiLogoCreator;
