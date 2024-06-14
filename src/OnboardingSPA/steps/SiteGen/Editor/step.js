import { copy } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Step } from '../../../data/models/Step';
import StepSiteGenEditorHeader from './Header';
import Customize from './Sidebar/Customize';

const StepSiteGenEditor = lazy( () => import( './index' ) );

export const stepSiteGenEditor = new Step( {
	slug: 'sitegen-editor',
	path: '/sitegen/step/editor',
	title: __( 'Page Layouts', 'wp-module-onboarding' ),
	Component: StepSiteGenEditor,
	icon: copy,
	sidebars: {
		Customize: {
			SidebarComponents: [ Customize ],
		},
	},
	header: StepSiteGenEditorHeader,
} );
