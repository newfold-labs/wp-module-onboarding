import { useSelect } from '@wordpress/data';
import { Modal, Title, Button } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { InlineAction, LogoCard } from '@/components';
import { generateLogos, prefetchGenerationStateAnimations } from '@/utils/logogen';
import { ReactComponent as AiIcon } from '@/assets/ai-icon.svg';
import { ReactComponent as LogoGenFigure } from '@/assets/logogen-figure.svg';
import checkLogogenStatus from '@/utils/logogen/checkLogogenStatus';

const Intro = () => {
	const [ isGenerating, setIsGenerating ] = useState( false );

	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-8 nfd-w-[390px] nfd-h-full">
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
					onClick={ () => {
						setIsGenerating( true );
						generateLogos();
					} }
					isLoading={ isGenerating }
					disabled={ isGenerating }
				>
					{ __( 'Generate', 'wp-module-onboarding' ) }
				</Button>
			</div>
		</div>
	);
};

const Logos = () => {
	const { logos, selectedLogo } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
			selectedLogo: select( nfdOnboardingStore ).getSelectedLogo(),
		};
	} );

	useEffect( () => {
		// if any of the logos are generating, check status every 5 seconds
		checkLogogenStatus();
	}, [] );

	return (
		<div className="nfd-grid nfd-grid-cols-3 nfd-gap-8 nfd-w-full">
			{ logos.map( ( logo, index ) => (
				<LogoCard
					key={ logo.reference_id || index }
					status={ logo.status }
					referenceId={ logo.reference_id }
					style={ logo.style }
					src={ logo.src }
					selectedSrc={ logo.selected_src }
					isSelected={ selectedLogo === ( logo?.reference_id || false ) }
				/>
			) ) }
		</div>
	);
};

const AiLogoCreatorContent = () => {
	const { referenceId } = useSelect( ( select ) => {
		return {
			referenceId: select( nfdOnboardingStore ).getLogogenReferenceId(),
		};
	} );

	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-h-full nfd-py-12 nfd-w-full">
			{ referenceId ? <Logos /> : <Intro /> }
		</div>
	);
};

const AiLogoCreator = () => {
	const [ isOpen, setIsOpen ] = useState( false );

	/**
	 * Proactively prefetch the generation state animations.
	 * This is to avoid flickering when the animations are loaded.
	 *
	 * See the <LogoCard> component for more details.
	 */
	useEffect( () => {
		prefetchGenerationStateAnimations();
	}, [] );

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
