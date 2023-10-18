import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../data/models/Step';
import { navigation } from '@wordpress/icons';

const StepSiteGenGetStarted = lazy( () => import( './index' ) );

export const stepSiteGenGetStarted = new Step( {
	path: '/wp-setup/step/sitegen-get-started',
	title: __( 'AI Site Generate Get Started', 'wp-module-onboarding' ),
	tooltipText: __( 'AI Site Generate Get Started', 'wp-module-onboarding' ),
	Component: StepSiteGenGetStarted,
	icon: navigation,
} );
