import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { HiiveAnalytics } from '@newfold/js-utility-ui-analytics';
import * as Sentry from '@sentry/react';
import { dispatch } from '@wordpress/data';
import { onboardingRestURL, startOnboarding } from '@/utils/api';
import { CATEGORY } from '@/utils/analytics/hiive/constants';
import { POSTHOG_PUBLIC } from '@/data/constants';
import { nfdOnboardingStore, initializeStoreDbSyncServices } from '@/data/store';
import { isCypress } from '@/utils/helpers';
import './webpack-public-path';
import { PostHogProvider } from 'posthog-js/react';
import App from '@';

// Check if the runtime data object is mounted.
export const runtimeDataObjectIsMounted = () => {
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

const AppRender = () => {
	// check session replay rollout capability flag
	if ( window.NewfoldRuntime?.capabilities?.hasPHSessionReplay ) {
		return (
			<PostHogProvider
				// public facing api key has write only access - this is not a sensitive key
				apiKey={ POSTHOG_PUBLIC.PUBLIC_API_KEY }
				options={ {
					api_host: POSTHOG_PUBLIC.PUBLIC_HOST,
					defaults: POSTHOG_PUBLIC.DEFAULT_VERSION,
					capture_exceptions: POSTHOG_PUBLIC.CAPTURE_EXCEPTIONS,
					debug: process.env.NODE_ENV === 'development',
				} }
			>
				<App />
			</PostHogProvider>
		);
	}

	return <App />;
};

// If window.nfdOnboarding is mounted, initialize the app.
if ( runtimeDataObjectIsMounted() ) {
	domReady( () => {
		initializeSentry();
		initializeAnalytics();
		startOnboarding();

		// Hydrate the Redux store with server-side runtime data.
		dispatch( nfdOnboardingStore ).setRuntimeSlice(
			window.nfdOnboarding.runtime
		);
		initializeStoreDbSyncServices();

		const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
		const appTarget = document.getElementById( NFD_ONBOARDING_ELEMENT_ID );

		// Fade out the loading screen before rendering the app.
		const loadingContainer = appTarget.querySelector( '.nfd-loading' );
		if ( loadingContainer ) {
			loadingContainer.classList.add( 'fade-out' );
		}

		// Render the app after the loading screen has faded out.
		setTimeout( () => {
			const appRoot = createRoot( appTarget );
			appRoot.render( <AppRender /> );
		}, 300 );
	} );
} else {
	/* eslint-disable no-console */
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
