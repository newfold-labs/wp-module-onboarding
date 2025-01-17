import './webpack-public-path';

// WordPress
import domReady from '@wordpress/dom-ready';
import { registerCoreBlocks } from '@wordpress/block-library';

// Classes and functions
import initializeNFDOnboarding from './OnboardingSPA';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { onboardingRestURL } from './OnboardingSPA/utils/api/common';
import { isEnvironmentCypress } from './OnboardingSPA/utils';
import * as Sentry from '@sentry/react';

// Misc
import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';
import { CATEGORY } from './OnboardingSPA/utils/analytics/hiive/constants';

const version = require( '../package.json' ).version;
const releaseVersion = `wp-onboarding@${ version }`;
if ( runtimeDataExists ) {
	domReady( () => {
		// Only initialize Sentry if not running in Cypress
		if ( ! isEnvironmentCypress() ) {
			// Integrate Sentry to send errors and data for tracking
			Sentry.init( {
				dsn: window.nfdOnboarding.sentryInitDsnURL,
				integrations: [ Sentry.browserTracingIntegration() ],
				release: releaseVersion,
				// Performance Monitoring
				tracesSampleRate: 1.0, //  Capture 100% of the transactions
			} );
		}

		HiiveAnalytics.initialize( {
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

		initializeNFDOnboarding(
			NFD_ONBOARDING_ELEMENT_ID,
			window.nfdOnboarding
		);
		registerCoreBlocks();
	} );
} else {
	/* eslint-disable no-console */
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
