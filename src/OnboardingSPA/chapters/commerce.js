import { __ } from '@wordpress/i18n';

import { CHAPTER_COMMERCE } from '../../constants';
import ChapterInterstitialLoader from '../components/Loaders/Chapter/Interstitial';
import { stepAddress } from '../steps/Ecommerce/StepAddress/step';
import { stepProducts } from '../steps/Ecommerce/StepProducts/step';
import { Chapter } from '../data/models/Chapter';
import { Step } from '../data/models/Step';
import { ECOMMERCE_FLOW } from '../data/flows/constants';

const interstitialStep = new Step( {
	path: `/${ ECOMMERCE_FLOW }/step/interstitial`,
	Component: ChapterInterstitialLoader,
} );

const steps = [ stepAddress, stepProducts ];

export const commerce = new Chapter( {
	id: CHAPTER_COMMERCE,
	name: __( 'Commerce', 'wp-module-onboarding' ),
	steps,
	interstitialSteps: [ interstitialStep ],
} );
