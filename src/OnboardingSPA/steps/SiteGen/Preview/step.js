import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenPreview = lazy( () => import( './index' ) );

export const stepSiteGenPreview = new Step( {
	path: '/sitegen/step/preview',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenPreview,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
