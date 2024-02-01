import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenSiteLogo = lazy( () => import( './index' ) );

export const stepSiteGenSiteLogo = new Step( {
	path: '/sitegen/step/site-logo',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenSiteLogo,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
