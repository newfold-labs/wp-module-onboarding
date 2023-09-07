import { shipping } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from "../../../../constants";

const StepProducts = lazy( () => import( './index' ) );

export const stepProducts = new Step(
    {
		path: '/ecommerce/step/products',
		title: __( 'Product Info', 'wp-module-onboarding' ),
		Component: StepProducts,
		icon: shipping,
		drawerView: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
        data: {
            tooltipText: __( 'Product Info', 'wp-module-onboarding' ),
        }
	},
)