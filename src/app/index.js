// WordPress
import { FullscreenMode } from '@wordpress/interface';
import { Root, ErrorBoundary } from '@newfold/ui-component-library';
import { HashRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';

import '@/styles/tailwind.css';
import '@/styles/app.scss';
import { AppBody, Header } from '@/components';

const FallbackRender = ( { error } ) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={ { color: 'red' } }>{ error.message }</pre>
		</div>
	);
};

const App = () => {
	return (
		<>
			<FullscreenMode isActive={ true } />
			<ErrorBoundary FallbackComponent={ FallbackRender }>
				<Root style={ { width: '100%' } }>
					<Router>
						<Header />
						<AppBody />
					</Router>
				</Root>
			</ErrorBoundary>
		</>
	);
};

export default App;
