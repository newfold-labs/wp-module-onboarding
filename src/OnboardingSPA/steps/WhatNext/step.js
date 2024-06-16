import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../data/models/Step';
import { moveTo } from '@wordpress/icons';
import LearnMore from './Sidebar/LearnMore';

const StepWhatNext = lazy( () => import( './index' ) );

export const stepWhatNext = new Step( {
	slug: 'what-next',
	path: '/wp-setup/step/what-next',
	title: __( 'What Next', 'wp-module-onboarding' ),
	Component: StepWhatNext,
	icon: moveTo,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		tooltipText: __( 'How else can we help?', 'wp-module-onboarding' ),
	},
} );
