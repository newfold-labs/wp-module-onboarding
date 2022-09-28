import './webpack-public-path';

import { NFD_ONBOARDING_ELEMENT_ID, runtimeDataExists } from './constants';

import domReady from '@wordpress/dom-ready';
import { registerCoreBlocks } from '@wordpress/block-library';
import initializeNFDOnboarding from './OnboardingSPA';

if ( runtimeDataExists ) {
    console.log(window.nfdOnboarding.previewSettings)
	domReady( () => {
		initializeNFDOnboarding(
			NFD_ONBOARDING_ELEMENT_ID,
			window.nfdOnboarding
		);
		registerCoreBlocks();
	} );
} else {
	console.log(
		'Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.'
	);
}
