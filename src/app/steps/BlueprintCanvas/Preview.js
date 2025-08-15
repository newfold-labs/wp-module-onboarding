import { useRef, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { Iframe } from '@/components';
import { Spinner } from '@newfold/ui-component-library';

const Preview = () => {
	const [ preview, setPreview ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( true );

	const { blueprints, selectedBlueprint } = useSelect( ( select ) => {
		return {
			blueprints: select( nfdOnboardingStore ).getBlueprints(),
			selectedBlueprint: select( nfdOnboardingStore ).getSelectedBlueprint(),
		};
	} );

	const refMap = useRef( {
		previewContainer: null,
		previewContainerResizeObserver: null,
		iframeElement: null,
		previousIframeDimensions: {
			width: 0,
			height: 0,
		},
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
		const selectedPreview = blueprints.find( ( blueprint ) => blueprint.slug === selectedBlueprint );
		setPreview( selectedPreview );
	};

	useEffect( () => {
		setIsLoading( true );
		getPreview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedBlueprint ] );

	const iframeOnLoad = () => {
		setTimeout( () => {
			// Set 500ms delay to allow the iframe to fully render and avoid flickering.
			setIsLoading( false );
		}, 500 );
	};

	return (
		<div
			className="nfd-onboarding-canvas-preview nfd-relative nfd-w-full"
			ref={ ( el ) => {
				refMap.current.previewContainer = el;
			} }
		>
			<StatusOverlay />
			{ preview && <Iframe
				ref={ ( el ) => {
					refMap.current.iframeElement = el;
				} }
				title={ preview.slug }
				id={ `nfd-onboarding-${ preview.slug }-selected` }
				src={ preview.preview_url + '?source=nfd-onboarding' }
				width="100%"
				height="100vh"
				viewportWidth="100%"
				viewportHeight="100dvh"
				onLoad={ iframeOnLoad }
				tabIndex="-1"
				inert
				className="nfd-cursor-default nfd-h-screen"
			/> }
		</div>
	);
};

export default Preview;
