import { CHAPTER_SITEGEN } from '../../constants';
import { Chapter } from '../data/models/Chapter';
import { __ } from '@wordpress/i18n';
import { stepSiteGenWelcome } from '../steps/SiteGen/Welcome/step';
import { stepSiteGenSiteDetails } from '../steps/SiteGen/SiteDetails/step';
import { stepSiteGenSiteLogo } from '../steps/SiteGen/SiteLogo/step';
import { stepSiteGenSiteError} from '../steps/SiteGen/SiteError/step';
import { stepSiteGenSocialMedia } from '../steps/SiteGen/SocialMedia/step';
import { stepSiteGenExperience } from '../steps/SiteGen/Experience/step';
import { stepSiteGenBuilding } from '../steps/SiteGen/Building/step';
import { stepSiteGenPreview } from '../steps/SiteGen/Preview/step';
import { stepSiteGenEditor } from '../steps/SiteGen/Editor/step';

const steps = [
	stepSiteGenWelcome,
	stepSiteGenSiteDetails,
	stepSiteGenSocialMedia,
	stepSiteGenSiteError,
	stepSiteGenSiteLogo,
	stepSiteGenExperience,
	stepSiteGenBuilding,
	stepSiteGenPreview,
	stepSiteGenEditor,
];

export const sitegen = new Chapter( {
	id: CHAPTER_SITEGEN,
	name: __( 'Site Generation', 'wp-module-onboarding' ),
	steps,
} );
