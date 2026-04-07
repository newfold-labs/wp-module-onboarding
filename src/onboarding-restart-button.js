import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import RestartButton from './app/components/RestartButton';

domReady( () => {
	registerPlugin( 'nfd-onboarding-restart', {
		render: RestartButton,
	} );
} );
