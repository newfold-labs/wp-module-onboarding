import { moveTo } from "@wordpress/icons";
import { lazy } from '@wordpress/element';
import LearnMore from "./Sidebar/LearnMore";
import { __, sprintf } from '@wordpress/i18n';
import { Step } from "../../../../data/models/Step";
import { translations } from "../../../../utils/locales/translations";

const StepSecondaryStep = lazy( () => import( './index' ) );

export const stepSecondarySetup = new Step(
    {
		path: '/wp-setup/step/get-started/site-secondary',
		title: sprintf(
			/* translators: %s: website or store */
			__( 'Secondary %s Setup', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		Component: StepSecondaryStep,
		icon: moveTo,
		sidebars: {
			LearnMore: {
				SidebarComponents: [
					LearnMore,
				],
			},
		},
	},
)
