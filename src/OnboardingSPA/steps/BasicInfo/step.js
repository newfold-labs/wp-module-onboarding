import { info } from '@wordpress/icons';
import { Step } from '../../data/models/Step';
import { lazy } from '@wordpress/element';
import LearnMore from './Sidebar/LearnMore';
import { __, sprintf } from '@wordpress/i18n';
import { translations } from '../../utils/locales/translations';
import { VIEW_NAV_PRIMARY } from '../../../constants';

const StepBasicInfo = lazy( () => import( './index' ) );

export const stepBasicInfo = new Step( {
	path: '/wp-setup/step/basic-info',
	title: __( 'Basic Info', 'wp-module-onboarding' ),
	Component: StepBasicInfo,
	icon: info,
	drawerView: VIEW_NAV_PRIMARY,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
	data: {
		tooltipText: sprintf(
			/* translators: %s: website or store */
			__( 'Introduce us to this %s', 'wp-module-onboarding' ),
			translations( 'website' )
		),
	},
} );
