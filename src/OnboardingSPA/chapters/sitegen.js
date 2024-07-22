import { CHAPTER_SITEGEN } from '../../constants';
import { Chapter } from '../data/models/Chapter';
import { __ } from '@wordpress/i18n';
import { stepSiteGenSiteDetails } from '../steps/SiteGen/SiteDetails/step';
import { stepSiteGenSiteLogo } from '../steps/SiteGen/SiteLogo/step';
import { stepSiteGenExperience } from '../steps/SiteGen/Experience/step';
import { stepSiteGenPreview } from '../steps/SiteGen/Preview/step';
import { stepSiteGenEditor } from '../steps/SiteGen/Editor/step';

const steps = [
	stepSiteGenSiteDetails,
	stepSiteGenSiteLogo,
	stepSiteGenExperience,
	stepSiteGenPreview,
	stepSiteGenEditor,
];

export const sitegen = new Chapter( {
	id: CHAPTER_SITEGEN,
	name: __( 'Site Generation', 'wp-module-onboarding' ),
	steps,
} );
