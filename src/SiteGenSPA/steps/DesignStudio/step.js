import { home } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../OnboardingSPA/data/models/Step';
import { VIEW_NAV_GET_STARTED } from '../../../constants';

const DesignStudioPreview = lazy( () => import( './index' ) );

export const stepDesignStudioPreview = new Step( {
	path: '/wp-setup/step/get-started/site-gen',
	title: __( 'WordPress Site Gen', 'wp-module-onboarding' ),
	Component: DesignStudioPreview,
	icon: home,
	drawerView: VIEW_NAV_GET_STARTED,
	sidebars: {},
} );