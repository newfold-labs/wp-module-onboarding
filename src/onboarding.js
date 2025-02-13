import './webpack-public-path';

// WordPress
import domReady from '@wordpress/dom-ready';
import { createRoot } from 'react-dom/client';

import App from '@';
import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

if ( runtimeDataExists ) {
	domReady( () => {
		const appTarget = document.getElementById( NFD_ONBOARDING_ELEMENT_ID );
		/**
		 * Temporarily elevate the container's z-index during transition.
		 * This ensures proper layering while fading from loading screen to app.
		 */
		appTarget.style.zIndex = 100000;
		setTimeout( () => {
			appTarget.style.zIndex = 'initial';
		}, 500 );

		// Fade out the loading screen before rendering the app.
		const loadingContainer = appTarget.querySelector( '.nfd-onboarding-loading-app' );
		loadingContainer.classList.add( 'fade-out' );

		// Render the app after the loading screen has faded out.
		setTimeout( () => {
			const appRoot = createRoot( appTarget );
			appRoot.render( <App /> );
		}, 300 );
	} );
} else {
	/* eslint-disable no-console */
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
