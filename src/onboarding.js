import './webpack-public-path';

import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

import domReady from '@wordpress/dom-ready';
import { registerCoreBlocks } from '@wordpress/block-library';
import initializeNFDOnboarding from './OnboardingSPA';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { onboardingRestURL } from './OnboardingSPA/utils/api/common';
import { CATEGORY } from './OnboardingSPA/utils/analytics/hiive/constants';

if ( runtimeDataExists ) {
	domReady( () => {
		HiiveAnalytics.initialize( {
			namespace: CATEGORY,
			urls: {
				single: onboardingRestURL( 'events' ),
				batch: onboardingRestURL( 'events/batch' ),
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
