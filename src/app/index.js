// WordPress
import { FullscreenMode } from '@wordpress/interface';
import { Root, ErrorBoundary } from '@newfold/ui-component-library';
import { HashRouter as Router } from 'react-router-dom';

import '@/styles/tailwind.css';
import '@/styles/app.scss';
import { AppBody, ErrorBoundaryFallback, Header } from '@/components';
import { dispatch } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

const App = () => {
	// Set the runtime data for the onboarding store.
	dispatch( nfdOnboardingStore ).setRuntime( window.nfdOnboarding );

	return (
		<>
			<FullscreenMode isActive={ true } />
			<Root style={ { width: '100%' } }>
				<ErrorBoundary FallbackComponent={ ErrorBoundaryFallback }>
					<Router>
						<Header />
						<AppBody />
					</Router>
				</ErrorBoundary>
			</Root>
		</>
	);
};

export default App;
