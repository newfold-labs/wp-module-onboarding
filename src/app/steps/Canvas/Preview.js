import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { Iframe } from '@/components';
import { Spinner } from '@newfold/ui-component-library';

const Preview = () => {
	const [ preview, setPreview ] = useState( null );
	const [ iframeHeight, setIframeHeight ] = useState( 0 );
	const [ isLoading, setIsLoading ] = useState( true );

	const { hompages, selectedHomepage } = useSelect( ( select ) => {
		return {
			hompages: select( nfdOnboardingStore ).getHomepages(),
			selectedHomepage: select( nfdOnboardingStore ).getSelectedHomepage(),
		};
	} );
	
	const StatusOverlay = () => {
		const appHeaderHeight = document.querySelector( '.nfd-onboarding-header' )?.offsetHeight || 0;

		if ( isLoading ) {
			return (
				<div
					className="nfd-absolute nfd-inset-0 nfd-bg-[#F7F9FC] nfd-w-full nfd-flex nfd-items-center nfd-justify-center nfd-z-10"
					style={ {
						height: `calc(100dvh - ${ appHeaderHeight }px)`,
					} }
				>
					<Spinner
						variant="primary"
						size="8"
						/>
				</div>
			);
		}
		return null;
	};

	const getPreview = () => {
		const selectedPreview = hompages[ selectedHomepage ];
		setPreview( selectedPreview );
	};

	useEffect( () => {
		setIsLoading( true );
		getPreview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedHomepage ] );

	const calculateIframeHeight = () => {
		// Get the height from the iframe
		const iframeDoc = window.frames[ `nfd-onboarding-${ preview.slug }` ]?.document;
		if ( iframeDoc ) {
			return iframeDoc.documentElement.scrollHeight;
		}
		// Or fallback to the window height - header height
		const appHeaderHeight = document.querySelector( '.nfd-onboarding-header' )?.offsetHeight || 0;
		return window.innerHeight - appHeaderHeight;
	};

	const iframeOnLoad = () => {
		console.log( preview.slug );
		setIframeHeight( calculateIframeHeight() );

		/**
		 * Custom styles to add spacing around the preview.
		 */
		const iframeDoc = document.getElementById( `nfd-onboarding-${ preview.slug }-selected` )?.contentWindow?.document;
		if ( iframeDoc ) {
			console.log( 'should add styles' );
			// Preview margins and styles
			// <html> styles
			iframeDoc.documentElement.style.setProperty("padding", "40px 25px 110px", "important");
			iframeDoc.documentElement.style.setProperty("overflow", "overlay", "important");
			iframeDoc.documentElement.style.setProperty("background-color", "#ECEDEE", "important");
			// <body> styles
			iframeDoc.body.style.setProperty("border-radius", "10px", "important");
			iframeDoc.body.style.setProperty("overflow", "overlay", "important");
			iframeDoc.body.style.setProperty("border", "1px solid #CBD5E1", "important");
			iframeDoc.body.style.setProperty("box-shadow", "0 0 0px 2px #c5cbd4, 0 0 25px 7px rgba(64, 77, 96, 0.1)", "important");
			// End: Preview styles
		}

		setTimeout( () => {
			// Set 500ms delay to allow the iframe to fully render.
			setIsLoading( false );
		}, 500 );
	};

	return (
		<div className="nfd-onboarding-canvas-preview nfd-relative nfd-w-full">
			<StatusOverlay />
			{ preview && <Iframe
				title={ preview.slug }
				id={ `nfd-onboarding-${ preview.slug }-selected` }
				src={ preview.iframeSrc }
				width="100%"
				height="100vh"
				viewportWidth="100%"
				viewportHeight={ iframeHeight }
				onLoad={ iframeOnLoad }
				tabIndex="-1"
				inert
				className="nfd-cursor-default"
			/> }
		</div>
	);
};

export default Preview;
