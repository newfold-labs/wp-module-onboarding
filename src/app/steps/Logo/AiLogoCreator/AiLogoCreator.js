import { useSelect } from '@wordpress/data';
import { Modal } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { InlineAction } from '@/components';
import { prefetchGenerationStateAnimations } from '@/utils/logogen';
import { LogoGenSetSiteLogoHookContextProvider } from '@/utils/hooks/useLogoGenSetSiteLogo';
import { ReactComponent as AiIcon } from '@/assets/ai-icon.svg';
import Logos from './Logos';
import Intro from './Intro';

const AiLogoCreatorContent = () => {
	const { referenceId } = useSelect( ( select ) => {
		return {
			referenceId: select( nfdOnboardingStore ).getLogogenReferenceId(),
		};
	} );

	return (
		<div className="nfd-onboarding-logogen-content nfd-flex nfd-flex-col nfd-items-center nfd-h-full nfd-w-full">
			{ referenceId ? <Logos /> : <Intro /> }
		</div>
	);
};

const AiLogoCreator = ( { onSetSiteLogo } ) => {
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

	/**
	 * Styles override for the modal.
	 */
	const getCustomStyles = () => {
		return (
			<style>{ `
				.nfd-onboarding-logogen-modal .nfd-modal__overlay {
					background-color: rgba(30, 41, 59, 0.9);
				}
			` }</style>
		);
	};

	return (
		<div>
			<InlineAction
				title={ __( 'Create with AI', 'wp-module-onboarding' ) }
				icon={ <AiIcon className="nfd-fill-primary" /> }
				className="nfd-onboarding-logogen-trigger nfd-text-primary"
				onClick={ () => {
					setIsOpen( true );
				} }
			/>
			<Modal
				isOpen={ isOpen }
				onClose={ () => {
					setIsOpen( false );
				} }
				className="nfd-onboarding-logogen-modal"
			>
				<Modal.Panel className="nfd-w-[768px] nfd-max-w-[90vw] nfd-min-h-[620px] nfd-h-[620px] nfd-max-h-[90vh] nfd-overflow-y-auto">
					{ getCustomStyles() }
					<LogoGenSetSiteLogoHookContextProvider uploadLogo={ onSetSiteLogo }>
						<AiLogoCreatorContent />
					</LogoGenSetSiteLogoHookContextProvider>
				</Modal.Panel>
			</Modal>
		</div>
	);
};

export default AiLogoCreator;
