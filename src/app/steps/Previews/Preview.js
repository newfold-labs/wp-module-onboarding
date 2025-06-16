import { useSelect, dispatch } from '@wordpress/data';
import { SiteGenPreviewCard } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { getPreviewIframeSrc } from '@/utils/api';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_HOMEPAGE_PREVIEW_FAILED } from '@/utils/analytics/hiive/constants';

const Preview = ( {
	preview,
	onPreview,
} ) => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isError, setIsError ] = useState( false );
	const [ iframeSrc, setIframeSrc ] = useState( null );

	const homepages = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
		};
	} );

	/**
	 * Parse the sitegen preview content to make it saveable by the backend.
	 */
	const getPreviewContent = () => {
		const previewData = preview;
		const previewParts = [ 'header', 'content', 'footer' ];
		let previewContent = '';

		previewParts.forEach( ( part ) => {
			if ( part in previewData ) {
				previewContent += previewData[ part ];
			}
		} );

		return previewContent;
	};

	const iframeSrcFetchRetries = {
		count: 0,
		max: 2,
	};
	const getIframeSrc = async () => {
		/**
		 * If we've reached the max number of retries, set the error state and return.
		 */
		if ( iframeSrcFetchRetries.count >= iframeSrcFetchRetries.max ) {
			setIsError( true );
			setIsLoading( false );
			return;
		}

		/**
		 * If src is already in the store, use it.
		 * This is useful in case we add a resume feature in the future or if the user refreshes the page.
		 */
		if ( homepages.homepages[ preview.slug ]?.iframeSrc ) {
			setIframeSrc( homepages.homepages[ preview.slug ].iframeSrc );
			return;
		}

		/**
		 * Request the iframe src from the backend.
		 */
		const response = await getPreviewIframeSrc( getPreviewContent(), preview.slug );
		// If error or response doesn't contain a post_id or post_url.
		if (
			response.error ||
			! response?.body.post_id ||
			! response?.body.post_url
		) {
			// Analytics: Failed to generate preview.
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_HOMEPAGE_PREVIEW_FAILED, preview.slug, {
					source: 'quickstart',
				} )
			);
			// Increment the retry count and try again.
			iframeSrcFetchRetries.count++;
			return getIframeSrc();
		}

		setIframeSrc( response.body.post_url );

		// Update the homepages in the store
		homepages.homepages[ preview.slug ].iframeSrc = response.body.post_url;
		homepages.homepages[ preview.slug ].postId = response.body.post_id;
		dispatch( nfdOnboardingStore ).setHomepages( homepages.homepages );
	};

	useEffect( () => {
		if ( preview ) {
			getIframeSrc();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ preview ] );

	const iframeOnLoad = () => {
		const iframeDoc = window.frames[ `nfd-onboarding-${ preview.slug }` ]?.document;
		if ( iframeDoc ) {
			// Hide the admin bar
			const adminBar = iframeDoc.getElementById( 'wpadminbar' );
			if ( adminBar ) {
				adminBar.style.display = 'none';
				// Remove the admin bar reserved space
				iframeDoc.documentElement.style.setProperty( 'margin-top', '0px', 'important' );
			}

			// Inject color palette
			const colorPalette = preview.color.palette;
			if ( colorPalette && colorPalette instanceof Array ) {
				const root = iframeDoc.querySelector( ':root' );
				colorPalette.forEach( ( color ) => {
					const colorSlug = color.slug.replace( '_', '-' );
					const colorValue = color.color;
					root.style.setProperty( `--wp--preset--color--${ colorSlug }`, colorValue );
				} );
			}
		}

		setTimeout( () => {
			// Set 1 second delay to allow the styles above to apply.
			setIsLoading( false );
		}, 1000 );
	};

	return (
		<SiteGenPreviewCard
			frameName={ preview.slug }
			frameSrc={ iframeSrc }
			onFrameLoad={ iframeOnLoad }
			width="300px"
			height="360px"
			viewportWidth={ 1600 }
			viewportHeight={ '540%' }
			viewportScale={ 0.187 }
			overlay={ true }
			isLoading={ isLoading }
			isError={ isError }
			onPreview={ onPreview }
		/>
	);
};

export default Preview;
