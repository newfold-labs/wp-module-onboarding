import './styles/app.scss';
import { store as nfdOnboardingStore } from './store'; /* must import prior to App! */
import { getFlow } from './utils/api/flow';
import { init as initializePlugins } from './utils/api/plugins';
import { init as initializeThemes } from './utils/api/themes';
import { trigger as cronTrigger } from './utils/api/cronTrigger';
import { initialize as initializeSettings } from './utils/api/settings';
import { DESIGN_STEPS_THEME } from '../constants';

import App from './components/App';
import { HashRouter } from 'react-router-dom';
import { dispatch } from '@wordpress/data';
import { render } from '@wordpress/element';

/**
 * Component passed to wp.element.render().
 *
 * @return {WPComponent} NFDOnboarding Component
 */
const NFDOnboarding = () => (
	<HashRouter>
		<App />
	</HashRouter>
);

const initializeFlowData = ( currentData ) => {
	currentData.hasExited = 0;
	currentData.isComplete = 0;
	return currentData;
};

/**
 * Method to initialize Onboarding interface inside WordPress Admin.
 *
 * @param {string} id      - Element ID to render into.
 * @param {Object} runtime - Expects runtime data from window.nfdOnboarding.
 */
export async function initializeNFDOnboarding( id, runtime ) {
	initializePlugins();
	initializeThemes();
	setInterval( cronTrigger, 45000 );

	const DOM_TARGET = document.getElementById( id );
	dispatch( nfdOnboardingStore ).setRuntime( runtime );
	if ( runtime.previewSettings.settings.preRequisites?.themes ) {
		dispatch( nfdOnboardingStore ).updateThemeStatus(
			runtime.previewSettings.settings.preRequisites?.themes[
				DESIGN_STEPS_THEME
			]
		);
	}

	const currentData = await getFlow();
	if ( currentData.error === null ) {
		currentData.body = initializeFlowData( currentData.body );
		dispatch( nfdOnboardingStore ).setCurrentOnboardingData(
			currentData.body
		);
	}

	if ( null !== DOM_TARGET && 'undefined' !== typeof render ) {
		render( <NFDOnboarding />, DOM_TARGET );
		initializeSettings();
	} else {
		// eslint-disable-next-line no-console
		console.log( 'Could not find mount element or wp.element.render().' );
	}
}

export default initializeNFDOnboarding;
