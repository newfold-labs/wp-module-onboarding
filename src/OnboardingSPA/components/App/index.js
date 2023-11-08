import { FullscreenMode } from '@wordpress/interface';
import { SlotFillProvider } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import FlowStateHandler from '../StateHandlers/Flow';

/**
 * Primary app that renders the <FlowStateHandler />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @return {WPComponent} App Component
 */
const App = () => {
	return (
		<Fragment>
			<FullscreenMode isActive={ true } />
			<SlotFillProvider>
				<FlowStateHandler />
			</SlotFillProvider>
		</Fragment>
	);
};
export default App;
