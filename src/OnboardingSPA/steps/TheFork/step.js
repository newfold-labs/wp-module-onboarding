import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../data/models/Step';

const StepTheFork = lazy( () => import( './index' ) );

export const stepTheFork = new Step( {
	slug: 'fork',
	path: '/wp-setup/step/fork',
	title: __( 'The Fork', 'wp-module-onboarding' ),
	Component: StepTheFork,
	icon: copy,
	drawerNavigation: false,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
