/* global ResizeObserver */
import { useRef, useState, useEffect } from '@wordpress/element';
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
		const selectedPreview = hompages[ selectedHomepage ];
		setPreview( selectedPreview );
	};

	useEffect( () => {
		setIsLoading( true );
		getPreview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedHomepage ] );

	// Calculate the iframe height.
	const calculateIframeHeight = () => {
		// Get the iframe content height.
		const iframeDoc = refMap.current.iframeElement?.contentWindow?.document;
		if ( iframeDoc ) {
			return iframeDoc.documentElement.scrollHeight;
		}
		// Or fallback to the window height - header height
		const appHeaderHeight = document.querySelector( '.nfd-onboarding-header' )?.offsetHeight || 0;
		return window.innerHeight - appHeaderHeight;
	};

	/**
	 * Calculate the iframe content (preview) scale based on the parent container width.
	 */
	const calculateIframeContentScale = () => {
		const previewContainer = refMap.current.previewContainer;
		const iframeDoc = refMap.current.iframeElement?.contentWindow?.document;
		if ( ! previewContainer || ! iframeDoc ) {
			return;
		}

		const containerWidth = previewContainer.offsetWidth;
		if ( containerWidth === 0 ) {
			return;
		}

		// Set the preview content scale by changing its zoom property.
		const setContentScale = ( value ) => {
			iframeDoc.documentElement.style.setProperty( 'zoom', value, 'important' );
		};

		/**
		 * The scale breakpoints map.
		 * The order of the breakpoints is important.
		 * The first breakpoint that matches the container width will be used.
		 */
		const scaleBreakpointsMap = [
			{ minWidth: 1440, scale: 1 },
			{ minWidth: 1280, scale: 0.95 },
			{ minWidth: 1024, scale: 0.9 },
			{ minWidth: 768, scale: 0.85 },
			{ minWidth: 480, scale: 0.8 },
		];

		// Find the scale breakpoint that matches the container width.
		const scaleBreakpoint = scaleBreakpointsMap.find( ( breakpoint ) => containerWidth > breakpoint.minWidth );
		if ( scaleBreakpoint ) {
			setContentScale( scaleBreakpoint.scale );
		} else {
			setContentScale( 1 );
		}
	};

	/**
	 * Dynamically control the iframe content scale and height.
	 * Runs on iframe load/re-render.
	 *
	 * Don't let the code scare you, just follow the comments and you'll be fine.
	 */
	const dynamicallyControlIframeScale = () => {
		// Disconnect lingering resize observer.
		if ( refMap.current.previewContainerResizeObserver ) {
			refMap.current.previewContainerResizeObserver.disconnect();
		}
		// Observe the preview container for resize events (console, user window resize, etc).
		refMap.current.previewContainerResizeObserver = new ResizeObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				// Get the new width and height values after the resize event.
				const { width: newWidth, height: newHeight } = entry.contentRect;

				// Check which values have changed (width, height, both, none).
				const widthHasChanged = newWidth !== refMap.current.previousIframeDimensions.width;
				const heightHasChanged = newHeight !== refMap.current.previousIframeDimensions.height;

				// Update the previous dimensions to the new values.
				refMap.current.previousIframeDimensions = {
					width: newWidth,
					height: newHeight,
				};

				// If the width has changed, calculate the iframe content scale.
				if ( widthHasChanged ) {
					calculateIframeContentScale();
				}

				// If the height has changed, set the iframe height.
				if ( heightHasChanged ) {
					setIframeHeight( calculateIframeHeight() );
				}
			} );
		} );
		refMap.current.previewContainerResizeObserver.observe( refMap.current.previewContainer );
	};

	// On unmount: Disconnect the resize observer.
	useEffect( () => {
		return () => {
			if ( refMap.current.previewContainerResizeObserver ) {
				refMap.current.previewContainerResizeObserver.disconnect();
			}
		};
	}, [] );

	const iframeOnLoad = () => {
		dynamicallyControlIframeScale();

		const iframeDoc = refMap.current.iframeElement?.contentWindow?.document;
		if ( iframeDoc ) {
			/**
			 * The styles below add the spacing around the preview.
			 */
			// <html> styles
			iframeDoc.documentElement.style.setProperty( 'padding', '40px 25px 110px', 'important' );
			iframeDoc.documentElement.style.setProperty( 'overflow', 'overlay', 'important' );
			iframeDoc.documentElement.style.setProperty( 'background-color', '#ECEDEE', 'important' );
			// <body> styles
			iframeDoc.body.style.setProperty( 'border-radius', '10px', 'important' );
			iframeDoc.body.style.setProperty( 'overflow', 'overlay', 'important' );
			iframeDoc.body.style.setProperty( 'border', '1px solid #CBD5E1', 'important' );
			iframeDoc.body.style.setProperty( 'box-shadow', '0 0 0px 2px #c5cbd4, 0 0 25px 7px rgba(64, 77, 96, 0.1)', 'important' );
			// End: Preview styles
		}

		setTimeout( () => {
			// Set 500ms delay to allow the iframe to fully render.
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
				src={ preview.iframeSrc }
				width="100%"
				height="100vh"
				viewportWidth="100%"
				viewportHeight={ iframeHeight }
				onLoad={ iframeOnLoad }
				tabIndex="-1"
				inert
				className="nfd-cursor-default "
			/> }
		</div>
	);
};

export default Preview;
