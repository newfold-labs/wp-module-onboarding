import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';

const SiteGenWelcome = lazy( () => import( './index' ) );

export const stepSiteGenWelcome = new Step( {
	path: '/sitegen/step/welcome',
	title: __( 'Welcome', 'wp-module-onboarding' ),
	Component: SiteGenWelcome,
	icon: copy,
	sidebars: {},
} );
