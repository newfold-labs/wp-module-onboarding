import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const StepSiteGenMigration = lazy( () => import( './index' ) );

export const stepSiteGenMigration = new Step( {
	path: '/sitegen/step/migration',
	title: __( 'Migration', 'wp-module-onboarding' ),
	Component: StepSiteGenMigration,
	icon: copy,
	drawerNavigation: false,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
