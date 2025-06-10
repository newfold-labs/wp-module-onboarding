import { Container } from '@newfold/ui-component-library';
import { Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { useSelect } from '@wordpress/data';

const PreviewsStep = () => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ globalStyles, setGlobalStyles ] = useState( null );
	const homepages = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
		};
	} );

	const getGlobalStyles = async () => {
		const globalStyles = await getGlobalStyles();
		setGlobalStyles( globalStyles );
	};

	useEffect( () => {
		getGlobalStyles();
	}, [] );

	const renderPreviews = () => {
		return homepages.map( ( homepage ) => {
			return <div key={ homepage.id }>{ homepage.title }</div>;
		} );
	};

	// we need to loop through the homepages and render them
	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-previews">
				<Container.Header
					title={ __( 'Pick your website', 'wp-module-onboarding' ) }
					description={ __( 'Here are three unique designs for you to start with. Pick your favorite to customize it!', 'wp-module-onboarding' ) }
					className="nfd-gap-2"
				/>
				<Container.Block>
					{ renderPreviews() }
				</Container.Block>
			</Container>
		</Step>
	);
};

export default PreviewsStep;
