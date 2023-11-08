import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenSiteDetails = lazy( () => import( './index' ) );

export const stepSiteGenSiteDetails = new Step( {
	path: '/sitegen/step/site-details',
	title: __( 'Site Details', 'wp-module-onboarding' ),
	Component: SiteGenSiteDetails,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
