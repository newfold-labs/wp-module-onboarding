import { pages } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_NAV_DESIGN } from "../../../constants";

const StepDesignHomepageMenu = lazy( () => import( './index' ) );

export const stepDesignHomepageMenu = new Step(
    {
		path: '/wp-setup/step/design/homepage-menu',
		title: __( 'Homepage Layouts', 'wp-module-onboarding' ),
		Component: StepDesignHomepageMenu,
		icon: pages,
		drawerView: VIEW_NAV_DESIGN,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            patternId: 'homepage-styles',
            tooltipText: __(
                'There’s no place like a great home page',
                'wp-module-onboarding'
            ),
        }
	},
)