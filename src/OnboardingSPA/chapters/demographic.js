import { __ } from '@wordpress/i18n';

import { CHAPTER_DEMOGRAPHIC } from '../../constants';
import { stepBasicInfo } from '../steps/BasicInfo/step';
import { stepExperience } from '../steps/GetStarted/GetStartedExperience/step';
import { stepPrimarySetup } from '../steps/GetStarted/SiteTypeSetup/PrimarySite/step';
import { stepSecondarySetup } from '../steps/GetStarted/SiteTypeSetup/SecondarySite/step';
import { stepTopPriority } from '../steps/TopPriority/step';
import { Chapter } from '../data/models/Chapter';
import { Step } from '../data/models/Step';
import ChapterInterstitialLoader from '../components/Loaders/Chapter/Interstitial';
import { DEFAULT_FLOW } from '../data/flows/constants';

const interstitialStep = new Step( {
	path: `/${ DEFAULT_FLOW }/step/interstitial/${ CHAPTER_DEMOGRAPHIC }`,
	Component: ChapterInterstitialLoader,
} );

const steps = [
	stepExperience,
	stepPrimarySetup,
	stepSecondarySetup,
	stepBasicInfo,
	stepTopPriority,
];

export const demographic = new Chapter( {
	id: CHAPTER_DEMOGRAPHIC,
	name: __( 'Demographic', 'wp-module-onboarding' ),
	steps,
	interstitialSteps: [ interstitialStep ],
} );
