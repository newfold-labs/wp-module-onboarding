import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenBuilding = lazy( () => import( './index' ) );

export const stepSiteGenBuilding = new Step( {
	path: '/sitegen/step/building',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: SiteGenBuilding,
	icon: copy,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
