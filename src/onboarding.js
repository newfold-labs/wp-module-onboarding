import domReady from '@wordpress/dom-ready';
import { createRoot } from 'react-dom/client';
import { HiiveAnalytics } from '@newfold/js-utility-ui-analytics';
import * as Sentry from '@sentry/react';
import { onboardingRestURL } from '@/utils/api';
import { CATEGORY } from '@/utils/analytics/hiive/constants';
import { isCypress } from '@/utils/helpers';
import './webpack-public-path';
import App from '@';

// Check if the runtime data object is mounted.
const runtimeDataObjectIsMounted = () => {
	return (
		'object' === typeof window?.nfdOnboarding?.runtime &&
		'buildUrl' in window.nfdOnboarding.runtime
	);
};

const initializeSentry = () => {
	// Don't initialize Sentry in Cypress
	if ( isCypress() ) {
		return;
	}

	const version = require( '../package.json' ).version;
	const releaseVersion = `wp-onboarding@${ version }`;

	return Sentry.init( {
		dsn: window.nfdOnboarding.sentryInitDsnURL,
		integrations: [ Sentry.browserTracingIntegration() ],
		release: releaseVersion,
		// Performance Monitoring
		tracesSampleRate: 1.0, //  Capture 100% of the transactions
	} );
};

const initializeAnalytics = () => {
	return HiiveAnalytics.initialize( {
		namespace: CATEGORY,
		urls: {
			single: onboardingRestURL( 'events', false ),
			batch: onboardingRestURL( 'events/batch', false ),
		},
		settings: {
			debounce: {
				time: 3000,
			},
		},
	} );
};

// If window.nfdOnboarding is mounted, initialize the app.
if ( runtimeDataObjectIsMounted() ) {
	domReady( () => {
		initializeSentry();
		initializeAnalytics();

		const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
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
