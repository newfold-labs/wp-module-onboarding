import { useCallback, useMemo } from '@wordpress/element';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const PreviewLightbox = ( {
	logos,
	activeLogoReferenceId,
	onClose,
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );

	// Opens the lightbox.
	useEffect( () => {
		if ( activeLogoReferenceId ) {
			setIsOpen( true );
		}
	}, [ activeLogoReferenceId ] );

	// Closes the lightbox.
	const handleClose = useCallback( () => {
		setIsOpen( false );
		onClose();
	}, [ onClose ] );

	// Intercept and handle the escape key event by the lightbox component to not clash with the onboarding.
	useEffect( () => {
		// Only register listener if the lightbox is open.
		if ( ! isOpen ) {
			return;
		}

		// Handle the escape key event.
		const handleEscapeKey = ( e ) => {
			if ( e.key === 'Escape' ) {
				e.preventDefault();
				e.stopPropagation();

				// Close the lightbox.
				handleClose();
			}
		};

		// Register the listener.
		document.addEventListener( 'keydown', handleEscapeKey, { capture: true } );

		// On unmount: unregister the listener.
		return () => {
			document.removeEventListener( 'keydown', handleEscapeKey, { capture: true } );
		};
	}, [ isOpen, handleClose ] );

	// Get the logo preview images and the active slide
	const sources = useMemo( () => {
		if ( ! logos.length || ! activeLogoReferenceId ) {
			return {};
		}

		const slides = [];
		let activeSlide = 0;

		logos.forEach( ( logo ) => {
			if ( ! logo.src ) {
				return;
			}

			slides.push( {
				src: logo.src,
				imageFit: 'contain',
				width: 600,
				height: 600,
			} );

			if ( logo.reference_id === activeLogoReferenceId ) {
				activeSlide = slides.length - 1;
			}
		} );

		return { slides, activeSlide };
	}, [ logos, activeLogoReferenceId ] );

	// Custom styles not exposed by the lightbox component.
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-logogen-preview-lightbox {
						--yarl__color_backdrop: rgba(2, 6, 23, 0.9);
						--yarl__thumbnails_thumbnail_background: white;
					}
					.nfd-onboarding-logogen-preview-lightbox .yarl__slide_image {
						background: white;
					}
					.nfd-onboarding-logogen-preview-lightbox .yarl__container {
						backdrop-filter: blur(10px);
					}
					.nfd-onboarding-logogen-preview-lightbox .yarl__thumbnails_container {
						backdrop-filter: blur(10px);
					}
					.nfd-onboarding-logogen-preview-lightbox .yarl__thumbnails_thumbnail {
						background-clip: content-box !important;
					}
				` }
			</style>
		);
	};

	if ( ! isOpen || ! sources.slides?.length ) {
		return null;
	}

	return (
		<>
			{ getCustomStyles() }
			<Lightbox
				open={ isOpen }
				slides={ sources.slides }
				index={ sources.activeSlide || 0 }
				close={ handleClose }
				plugins={ [ Thumbnails ] }
				thumbnails={ {
					imageFit: 'contain',
					width: 100,
					height: 100,
					border: 2,
					borderColor: 'rgba(255, 255, 255, 0.4)',
				} }
				className="nfd-onboarding-logogen-preview-lightbox"
			/>
		</>
	);
};

export default PreviewLightbox;
