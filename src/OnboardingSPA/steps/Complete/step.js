import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from "../../data/models/Step";

const StepComplete = lazy( () => import( './index' ) );

export const stepComplete = new Step(
	{
		path: '/wp-setup/step/complete',
		Component: StepComplete,
	},
)