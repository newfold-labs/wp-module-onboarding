import { copy } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";

const StepSitePages = lazy( () => import( './index' ) );

export const stepSitePages = new Step(
    {
		path: '/wp-setup/step/design/site-pages',
		title: __( 'Page Layouts', 'wp-module-onboarding' ),
		Component: StepSitePages,
		icon: copy,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __(
                'You have ideas, we have page templates',
                'wp-module-onboarding'
            ),
			patternId: 'site-pages',
        }
	},
)