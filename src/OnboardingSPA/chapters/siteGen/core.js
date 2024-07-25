import { __ } from '@wordpress/i18n';

import { CHAPTER_SITEGEN_CORE } from '../../../constants';
import { Chapter } from '../../data/models/Chapter';
import { stepSiteGenSiteDetails } from '../../steps/SiteGen/SiteDetails/step';
import { stepSiteGenSiteLogo } from '../../steps/SiteGen/SiteLogo/step';

const steps = [ stepSiteGenSiteDetails, stepSiteGenSiteLogo ];

export const siteGenCore = new Chapter( {
	id: CHAPTER_SITEGEN_CORE,
	name: __( 'Sitegen Core', 'wp-module-onboarding' ),
	steps,
} );
