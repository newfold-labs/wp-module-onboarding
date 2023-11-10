import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';
import SiteGenEditorHeader from './SiteGenEditorHeader';

const StepSiteGenEditor = lazy( () => import( './index' ) );

export const stepSiteGenEditor = new Step( {
	path: '/sitegen/step/editor',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: StepSiteGenEditor,
	icon: copy,
	header: SiteGenEditorHeader,
	sidebars: {
		LearnMore: {
			SidebarComponents: [],
		},
	},
} );
