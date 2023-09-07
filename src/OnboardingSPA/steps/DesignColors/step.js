import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import { color } from '@wordpress/icons';
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_DESIGN_COLORS } from '../../../constants';

const StepDesignColors = lazy( () => import( './index' ) );

export const stepDesignColors = new Step(
	{
		path: '/wp-setup/step/design/colors',
		title: __( 'Colors', 'wp-module-onboarding' ),
		Component: StepDesignColors,
		icon: color,
		drawerView: VIEW_DESIGN_COLORS,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __( "What's your color palette?", 'wp-module-onboarding' ),
            patternId: 'theme-styles',
        }
	},
)