import { store } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../../data/models/Step";
import LearnMore from "./Sidebar/LearnMore";
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from "../../../../constants";

const StepAddress = lazy( () => import( './index' ) );

export const stepAddress = new Step(
	{
		path: '/ecommerce/step/address',
		title: __( 'Street Address', 'wp-module-onboarding' ),
		Component: StepAddress,
		icon: store,
		drawerView: VIEW_NAV_ECOMMERCE_STORE_INFO,
		sidebars: {
			LearnMore: {
				SidebarComponents: [ LearnMore ],
			},
		},
		data: {
			tooltipText: __( 'Street Address', 'wp-module-onboarding' ),
		}
	},
)