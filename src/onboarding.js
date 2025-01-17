import './webpack-public-path';

// WordPress
import domReady from '@wordpress/dom-ready';
import { createRoot } from 'react-dom/client';
import App from './app';
import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

if ( runtimeDataExists ) {
	domReady( () => {
		const domRootId = document.getElementById( NFD_ONBOARDING_ELEMENT_ID );
		const domRoot = createRoot( domRootId );
		domRoot.render( <App /> );
	} );
} else {
	/* eslint-disable no-console */
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
