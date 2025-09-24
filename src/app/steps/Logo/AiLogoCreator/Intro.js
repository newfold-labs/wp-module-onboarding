import { Title, Button } from '@newfold/ui-component-library';
import { ReactComponent as LogoGenFigure } from '@/assets/logogen-figure.svg';
import { generateLogos } from '@/utils/logogen';

const Intro = () => {
	const [ isGenerating, setIsGenerating ] = useState( false );

	const handleGenerate = async () => {
		setIsGenerating( true );
		generateLogos();
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
					isLoading={ isGenerating }
					disabled={ isGenerating }
				>
					{ __( 'Generate', 'wp-module-onboarding' ) }
				</Button>
			</div>
		</div>
	);
};

export default Intro;
