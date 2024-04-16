// WordPress
import { FullscreenMode } from '@wordpress/interface';
import { SlotFillProvider } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// Components
import { FlowStateHandler } from '../StateHandlers';

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
