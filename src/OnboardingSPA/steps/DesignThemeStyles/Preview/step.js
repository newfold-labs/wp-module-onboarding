import { styles } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_DESIGN_THEME_STYLES_PREVIEW } from "../../../../constants";

const StepDesignThemeStylesPreview= lazy( () => import( './index' ) );

export const stepDesignThemeStylesPreview = new Step(
    {
		path: '/wp-setup/step/design/theme-styles/preview',
		title: __( 'Theme Styles', 'wp-module-onboarding' ),
		Component: StepDesignThemeStylesPreview,
		icon: styles,
		drawerView: VIEW_DESIGN_THEME_STYLES_PREVIEW,
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					LearnMore,
				],
			},
		},
        data: {
            designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
            patternId: 'theme-styles',
        }
	},
)