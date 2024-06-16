import { home } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import LearnMore from './Sidebar/LearnMore';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';
import { VIEW_NAV_GET_STARTED } from '../../../../constants';

const GetStartedExperience = lazy( () => import( './index' ) );

export const stepExperience = new Step( {
	slug: 'get-started-experience',
	path: '/wp-setup/step/get-started/experience',
	title: __( 'WordPress Experience', 'wp-module-onboarding' ),
	Component: GetStartedExperience,
	icon: home,
	drawerView: VIEW_NAV_GET_STARTED,
	sidebars: {
		LearnMore: {
			SidebarComponents: [ LearnMore ],
		},
	},
} );
