import { styles } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';
import LearnMore from './Sidebar/LearnMore';
import { VIEW_NAV_DESIGN } from '../../../../constants';

const StepDesignThemeStylesMenu = lazy( () => import( './index' ) );

export const stepDesignThemeStylesMenu = new Step( {
	path: '/wp-setup/step/design/theme-styles/menu',
	title: __( 'Theme Styles', 'wp-module-onboarding' ),
	Component: StepDesignThemeStylesMenu,
	icon: styles,
	drawerView: VIEW_NAV_DESIGN,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
		patternId: 'theme-styles',
	},
} );
