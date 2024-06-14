import { header } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../data/models/Step';
import LearnMore from './Sidebar/LearnMore';
import { VIEW_DESIGN_HEADER_MENU } from '../../../constants';

const StepDesignHeaderMenu = lazy( () => import( './index' ) );

export const stepDesignHeaderMenu = new Step( {
	slug: 'design-header-menu',
	path: '/wp-setup/step/design/header-menu',
	title: __( 'Header & Menu', 'wp-module-onboarding' ),
	Component: StepDesignHeaderMenu,
	icon: header,
	drawerView: VIEW_DESIGN_HEADER_MENU,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		tooltipText: __(
			"Let's make the right things visible",
			'wp-module-onboarding'
		),
		patternId: 'header-menu',
	},
} );
