import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import { typography } from '@wordpress/icons';
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_DESIGN_TYPOGRAPHY } from '../../../constants';

const StepDesignTypography = lazy( () => import( './index' ) );

export const stepDesignTypography = new Step(
    {
		path: '/wp-setup/step/design/typography',
		title: __( 'Typography', 'wp-module-onboarding' ),
		Component: StepDesignTypography,
		icon: typography,
		drawerView: VIEW_DESIGN_TYPOGRAPHY,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __( "What's your font style?", 'wp-module-onboarding' ),
            patternId: 'theme-styles',
        }
	},
)