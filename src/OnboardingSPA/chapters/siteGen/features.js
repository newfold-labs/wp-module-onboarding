import { __ } from '@wordpress/i18n';

import { CHAPTER_SITEGEN_FEATURES } from '../../../constants';
import { Chapter } from '../../data/models/Chapter';
import { stepSiteGenExperience } from '../../steps/SiteGen/Experience/step';

const steps = [ stepSiteGenExperience ];

export const siteGenFeatures = new Chapter( {
	id: CHAPTER_SITEGEN_FEATURES,
	name: __( 'Sitegen Features', 'wp-module-onboarding' ),
	steps,
} );
