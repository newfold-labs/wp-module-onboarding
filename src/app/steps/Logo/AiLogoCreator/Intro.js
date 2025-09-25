import { Title, Button } from '@newfold/ui-component-library';
import { ReactComponent as LogoGenFigure } from '@/assets/logogen-figure.svg';
import { generateLogos } from '@/utils/logogen';

const Intro = () => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ hasError, setHasError ] = useState( false );

	const handleGenerate = async () => {
		// Reset state.
		setHasError( false );
		setIsLoading( true );

		// Start the generation.
		const result = await generateLogos();
		if ( ! result ) {
			// Set error state.
			setIsLoading( false );
			setHasError( true );
		}
	};

	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-8 nfd-w-[390px] nfd-h-full nfd-py-12">
			<LogoGenFigure className="nfd-w-[170px] nfd-h-auto" />
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-3 nfd-text-center">
				<Title as="h2" className="nfd-text-2xl nfd-text-content-default">
					{ __( 'Create your logo with AI', 'wp-module-onboarding' ) }
				</Title>
				<p className="nfd-text-content-default nfd-text-tiny">
					{ __( "Let our AI logo creator design your logo. We'll create custom options that capture your brand's essence. Pick your favorite to add to your new site.", 'wp-module-onboarding' ) }
				</p>
				<Button
					className="nfd-mt-4 nfd-button--enhanced"
					onClick={ handleGenerate }
					isLoading={ isLoading }
					disabled={ isLoading }
				>
					{ __( 'Generate', 'wp-module-onboarding' ) }
				</Button>
				{ hasError && (
					<p className="nfd-text-tiny nfd-text-red-500 nfd-bg-red-500/10 nfd-p-2 nfd-rounded-md nfd-mt-4">
						{ __( 'Error connecting to the AI service. Please try again.', 'wp-module-onboarding' ) }
					</p>
				) }
			</div>
		</div>
	);
};

export default Intro;
