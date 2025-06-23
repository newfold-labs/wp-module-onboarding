/**
 * Click the zoom out button
 */
export const enableZoomOut = () => {
	// Find and click the zoom out button
	const zoomButtonSelectors = [
		'button[aria-label="Zoom out"]',
		'button[aria-label="Zoom Out"]',
		'.block-editor-zoom-out-button',
		'.edit-site-visual-editor__zoom-dropdown button',
	];

	let zoomButton = null;
	for ( const selector of zoomButtonSelectors ) {
		zoomButton = document.querySelector( selector );
		if ( zoomButton ) {
			break;
		}
	}

	if ( zoomButton ) {
		zoomButton.click();
		return true;
	}

	// Retry after a delay
	setTimeout( () => {
		const retryZoomButton = document.querySelector( zoomButtonSelectors.join( ', ' ) );
		if ( retryZoomButton ) {
			retryZoomButton.click();
		}
	}, 1500 );

	return false;
};
