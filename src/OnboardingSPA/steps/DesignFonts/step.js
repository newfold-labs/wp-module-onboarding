import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../data/models/Step';
import { typography as fonts } from '@wordpress/icons';
import LearnMore from './Sidebar/LearnMore';
import { VIEW_DESIGN_FONTS } from '../../../constants';

const StepDesignFonts = lazy( () => import( './index' ) );

export const stepDesignFonts = new Step( {
	slug: 'design-typography',
	path: '/wp-setup/step/design/typography',
	title: __( 'Fonts', 'wp-module-onboarding' ),
	Component: StepDesignFonts,
	icon: fonts,
	drawerView: VIEW_DESIGN_FONTS,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		tooltipText: __( "What's your font style?", 'wp-module-onboarding' ),
		patternId: 'theme-styles',
	},
} );
