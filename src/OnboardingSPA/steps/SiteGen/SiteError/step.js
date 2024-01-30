import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenSiteError = lazy( () => import( './index' ) );

export const stepSiteGenSiteError = new Step( {
	path: '/sitegen/step/site-error',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenSiteError,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
