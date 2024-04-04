import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const StepMigration = lazy( () => import( './index' ) );

export const stepMigration = new Step( {
	path: '/sitegen/step/migration',
	title: __( 'Migration', 'wp-module-onboarding' ),
	Component: StepMigration,
	icon: copy,
	drawerNavigation: false,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
