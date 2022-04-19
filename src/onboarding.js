import './webpack-public-path';

import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

import domReady from '@wordpress/dom-ready';
import initializeNFDOnboarding from './OnboardingSPA';

if (runtimeDataExists) {
	domReady(() => {
		initializeNFDOnboarding(
			NFD_ONBOARDING_ELEMENT_ID,
			window.nfdOnboarding
		);
	});
} else {
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
