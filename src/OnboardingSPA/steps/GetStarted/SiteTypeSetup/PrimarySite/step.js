import { moveTo } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import LearnMore from './Sidebar/LearnMore';
import { __, sprintf } from '@wordpress/i18n';
import { Step } from '../../../../data/models/Step';
import { translations } from '../../../../utils/locales/translations';

const StepPrimarySetup = lazy( () => import( './index' ) );

export const stepPrimarySetup = new Step( {
	slug: 'get-started-site-primary',
	path: '/wp-setup/step/get-started/site-primary',
	title: sprintf(
		/* translators: %s: website or store */
		__( 'Primary %s Setup', 'wp-module-onboarding' ),
		translations( 'Site' )
	),
	Component: StepPrimarySetup,
	icon: moveTo,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
} );
