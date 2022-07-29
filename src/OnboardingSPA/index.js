import './styles/app.scss';
import { store as nfdOnboardingStore } from './store'; /* must import prior to App! */
import { getFlow } from './utils/api/flow';
import { init as initPlugins } from './utils/api/plugins';
import { trigger as cronTrigger } from './utils/api/cronTrigger';

import App from './components/App';
import { HashRouter } from 'react-router-dom';
import { dispatch } from '@wordpress/data';
import { render } from '@wordpress/element';

/**
 * Component passed to wp.element.render().
 *
 * @return WPComponent
 */
const NFDOnboarding = () => (
	<HashRouter>
		<App />
	</HashRouter>
);

/**
 * Method to initialize Onboarding interface inside WordPress Admin.
 *
 * @param {string} id      - Element ID to render into.
 * @param {Object} runtime - Expects runtime data from window.nfdOnboarding.
 */
export async function initializeNFDOnboarding( id, runtime ) {
	initPlugins();
	setInterval( cronTrigger, 45000 );

	const DOM_TARGET = document.getElementById( id );
	dispatch( nfdOnboardingStore ).setRuntime( runtime );
	const currentData = await getFlow();
	if ( currentData.error == null )
		dispatch( nfdOnboardingStore ).setCurrentOnboardingData(
			currentData.body
		);

	if ( null !== DOM_TARGET && 'undefined' !== typeof render ) {
		render( <NFDOnboarding />, DOM_TARGET );
	} else {
		console.log( 'Could not find mount element or wp.element.render().' );
	}
}

export default initializeNFDOnboarding;
