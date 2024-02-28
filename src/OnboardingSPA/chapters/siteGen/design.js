import { __ } from '@wordpress/i18n';

import { CHAPTER_SITEGEN_DESIGN } from '../../../constants';
import { Chapter } from '../../data/models/Chapter';
import { stepSiteGenEditor } from '../../steps/SiteGen/Editor/step';
import { stepSiteGenPreview } from '../../steps/SiteGen/Preview/step';

const steps = [ stepSiteGenPreview, stepSiteGenEditor ];

export const siteGenDesign = new Chapter( {
	id: CHAPTER_SITEGEN_DESIGN,
	name: __( 'Sitegen Design', 'wp-module-onboarding' ),
	steps,
} );
