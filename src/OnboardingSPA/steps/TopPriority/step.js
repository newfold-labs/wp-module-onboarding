import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";
import { navigation } from '@wordpress/icons';

const StepTopPriority = lazy( () => import( './index' ) );

export const stepTopPriority = new Step(
	{
		path: '/wp-setup/step/top-priority',
		title: __( 'Top Priority', 'wp-module-onboarding' ),
		tooltipText: __( 'Tell us your top priority', 'wp-module-onboarding' ),
		Component: StepTopPriority,
		icon: navigation,
	},
)