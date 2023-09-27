import { __ } from '@wordpress/i18n';

import { CHAPTER_FEATURES } from '../../constants';
import { stepSiteFeatures } from '../steps/SiteFeatures/step';
import { Chapter } from '../data/models/Chapter';

const steps = [ stepSiteFeatures ];

export const features = new Chapter( {
	id: CHAPTER_FEATURES,
	name: __( 'Features', 'wp-module-onboarding' ),
	steps,
} );
