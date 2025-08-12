import { HashRouter as Router } from 'react-router-dom';
import { dispatch } from '@wordpress/data';
import { FullscreenMode } from '@wordpress/interface';
import { Root, ErrorBoundary as RootErrorBoundary } from '@newfold/ui-component-library';
import { AppBody, ErrorBoundaryFallback, Header } from '@/components';
import { nfdOnboardingStore, initializeStoreDbSyncServices } from '@/data/store';
import '@/styles/tailwind.css';
import '@/styles/app.scss';

const App = () => {
	// Feed store data.
	dispatch( nfdOnboardingStore ).setRuntimeSlice( window.nfdOnboarding.runtime );
	dispatch( nfdOnboardingStore ).setInputSlice( window.nfdOnboarding.input );
	dispatch( nfdOnboardingStore ).setSiteGenSlice( window.nfdOnboarding.sitegen );
	dispatch( nfdOnboardingStore ).setBlueprintsSlice( window.nfdOnboarding.blueprints );

	// Initialize the store-DB sync services.
	initializeStoreDbSyncServices();

	return (
		<>
			<FullscreenMode isActive={ true } />
			<Root style={ { width: '100%' } }>
				<RootErrorBoundary FallbackComponent={ ErrorBoundaryFallback }>
					<Router>
						<Header />
						<AppBody />
					</Router>
				</RootErrorBoundary>
			</Root>
		</>
	);
};

export default App;
