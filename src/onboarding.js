import './webpack-public-path';

import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

import * as Sentry from '@sentry/react';
import domReady from '@wordpress/dom-ready';
const version = require('../package.json').version;
import { registerCoreBlocks } from '@wordpress/block-library';
import initializeNFDOnboarding from './OnboardingSPA';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { onboardingRestURL } from './OnboardingSPA/utils/api/common';
import { CATEGORY } from './OnboardingSPA/utils/analytics/hiive/constants';

const releaseVersion = `wp-onboarding@${version}`;

if (runtimeDataExists) {
	domReady(() => {
		// Integrate Sentry to send errors and data for tracking
		Sentry.init({
			dsn: 'https://cd5bd4c30b914e0d1d0f49413e600afa@o4506197201715200.ingest.us.sentry.io/4507383861805056',
			integrations: [Sentry.browserTracingIntegration()],
			release: releaseVersion,
			// Performance Monitoring
			tracesSampleRate: 1.0, //  Capture 100% of the transactions
		});

		HiiveAnalytics.initialize({
			namespace: CATEGORY,
			urls: {
				single: onboardingRestURL('events'),
				batch: onboardingRestURL('events/batch'),
			},
			settings: {
				debounce: {
					time: 3000,
				},
			},
		});

		initializeNFDOnboarding(
			NFD_ONBOARDING_ELEMENT_ID,
			window.nfdOnboarding
		);
		registerCoreBlocks();
	});
} else {
	/* eslint-disable no-console */
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
