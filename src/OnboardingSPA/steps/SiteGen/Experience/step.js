import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenExperience = lazy( () => import( './index' ) );

export const stepSiteGenExperience = new Step( {
	slug: 'sitegen-experience',
	path: '/sitegen/step/experience',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenExperience,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
