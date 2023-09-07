import { institution } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from "../../../../../constants";

const StepTax = lazy( () => import( './index' ) );

export const stepTax = new Step(
	{
		path: '/ecommerce/step/tax',
		title: __( 'Tax Info', 'wp-module-onboarding' ),
		Component: StepTax,
		icon: institution,
		drawerView: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __( 'Tax Info', 'wp-module-onboarding' ),
        }
	},
)