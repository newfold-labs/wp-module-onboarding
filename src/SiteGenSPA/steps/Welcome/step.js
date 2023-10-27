import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../OnboardingSPA/data/models/Step';
import { navigation } from '@wordpress/icons';

const StepSiteGenGetStartedWelcome = lazy( () => import( './index' ) );

export const stepSiteGenGetStartedWelcome = new Step( {
	path: '/wp-setup/step/sitegen-get-started/welcome',
	title: __( 'AI Site Generate Get Started', 'wp-module-onboarding' ),
	tooltipText: __( 'AI Site Generate Get Started', 'wp-module-onboarding' ),
	Component: StepSiteGenGetStartedWelcome,
	icon: navigation,
} );