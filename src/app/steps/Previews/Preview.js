import { useSelect, dispatch } from '@wordpress/data';
import { SiteGenPreviewCard } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { getSiteGenPreviewSnapshot } from '@/utils/api';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_HOMEPAGE_PREVIEW_FAILED } from '@/utils/analytics/hiive/constants';

const Preview = ( {
	preview,
	onPreview,
} ) => {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isError, setIsError ] = useState( false );
	const [ screenshot, setScreenshot ] = useState( null );
	const [ iframeSrc, setIframeSrc ] = useState( null );

	const { homepages } = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
		};
	} );

	/**
	 * Parse the sitegen preview content to make it saveable by the backend.
	 * @return {string} The preview content.
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

	/**
	 * Custom css to inject into the preview.
	 * @return {string} Custom styles.
	 */
	const getCustomStyles = () => {
		let customStyles = ':root {';

		// Map preview color palette to the custom styles.
		const colorPalette = preview.color.palette;
		if ( colorPalette instanceof Array ) {
			colorPalette.forEach( ( color ) => {
				customStyles += `--wp--preset--color--${ color.slug.replace( '_', '-' ) }: ${ color.color } !important;`;
			} );
		}

		customStyles += '}';
		return customStyles;
	};

	const snapshotFetchRetries = {
		count: 0,
		max: 2,
	};
	const getSnapshot = async () => {
		/**
		 * If we've reached the max number of retries, set the error state and return.
		 */
		if ( snapshotFetchRetries.count >= snapshotFetchRetries.max ) {
			setIsError( true );
			setIsLoading( false );
			return;
		}

		/**
		 * If the screenshot or iframe src is already in the store, use it.
		 * This is useful in case we add a resume feature in the future or if the user refreshes the page.
		 */
		if ( homepages[ preview.slug ]?.screenshot ) {
			setScreenshot( homepages[ preview.slug ].screenshot );
			setIsLoading( false );
			return;
		}
		if ( homepages[ preview.slug ]?.iframeSrc ) {
			setIframeSrc( homepages[ preview.slug ].iframeSrc );
			setIsLoading( false );
			return;
		}

		/**
		 * Request the iframe src from the backend.
		 */
		const response = await getSiteGenPreviewSnapshot( getPreviewContent(), preview.slug, getCustomStyles() );
		
		// Check for various error conditions
		if ( response.error ) {
			console.error( 'Preview generation error:', response.error );
			// Analytics: Failed to generate preview.
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_HOMEPAGE_PREVIEW_FAILED, preview.slug, {
					source: 'quickstart',
					error: response.error,
				} )
			);
			// Increment the retry count and try again.
			snapshotFetchRetries.count++;
			setTimeout( () => getSnapshot(), 1000 ); // Wait 1 second before retrying
			return;
		}
		
		// Check if response doesn't contain required data
		if ( ! response?.body?.post_id || ! response?.body?.post_url ) {
			console.error( 'Invalid preview response:', response );
			// Analytics: Failed to generate preview.
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_HOMEPAGE_PREVIEW_FAILED, preview.slug, {
					source: 'quickstart',
					error: 'Invalid response data',
				} )
			);
			// Increment the retry count and try again.
			snapshotFetchRetries.count++;
			setTimeout( () => getSnapshot(), 1000 ); // Wait 1 second before retrying
			return;
		}

		// If we get a screenshot, use it.
		if ( response.body.screenshot ) {
			setScreenshot( response.body.screenshot );
			setIsLoading( false );
			homepages[ preview.slug ].screenshot = response.body.screenshot;
		}

		// Iframe will be used as fallback if the screenshot fails.
		setIframeSrc( response.body.post_url );
		homepages[ preview.slug ].iframeSrc = response.body.post_url;
		homepages[ preview.slug ].postId = response.body.post_id;

		// Update the homepages in the store.
		dispatch( nfdOnboardingStore ).setHomepages( homepages );
	};

	useEffect( () => {
		if ( preview ) {
			getSnapshot();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ preview ] );

	const iframeOnLoad = () => {
		setTimeout( () => {
			// Set 500ms delay to allow the iframe to fully render.
			setIsLoading( false );
		}, 500 );
	};

	return (
		<SiteGenPreviewCard
			screenshot={ screenshot }
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
