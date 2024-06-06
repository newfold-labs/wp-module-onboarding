import { home } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import LearnMore from './Sidebar/LearnMore';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';
import { VIEW_NAV_GET_STARTED } from '../../../../constants';

const StepWelcome = lazy( () => import( './index' ) );

export const stepWelcome = new Step( {
	slug: 'get-started-welcome',
	path: '/wp-setup/step/get-started/welcome',
	title: __( 'Welcome', 'wp-module-onboarding' ),
	Component: StepWelcome,
	icon: home,
	drawerView: VIEW_NAV_GET_STARTED,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		tooltipText: __( 'Welcome', 'wp-module-onboarding' ),
	},
} );
