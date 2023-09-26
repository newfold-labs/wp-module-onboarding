import { __ } from '@wordpress/i18n';
import { redo } from '@wordpress/icons';
import ErrorPage from '.';
import { Page } from '../../data/models/Page';

export const errorPage = new Page( {
	path: '*',
	title: __( 'Error 404', 'wp-module-onboarding' ),
	Component: ErrorPage,
	Icon: redo,
} );
