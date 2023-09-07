import { plugins } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";

const StepSiteFeatures = lazy( () => import( './index' ) );

export const stepSiteFeatures = new Step(
    {
		path: '/wp-setup/step/site-features',
		title: __( 'Features', 'wp-module-onboarding' ),
		Component: StepSiteFeatures,
		icon: plugins,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __(
                'Key features to supercharge your site',
                'wp-module-onboarding'
            ),
            patternId: 'site-features',
        }
	},
)