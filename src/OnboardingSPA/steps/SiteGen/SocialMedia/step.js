import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenSiteSocialMedia = lazy( () => import( './index' ) );

export const stepSiteGenSocialMedia = new Step( {
	slug: 'sitegen-social-media',
	path: '/sitegen/step/social-media',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenSiteSocialMedia,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
