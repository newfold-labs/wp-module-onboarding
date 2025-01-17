// WordPress
import { FullscreenMode } from '@wordpress/interface';
import { Root, Alert } from "@newfold/ui-component-library";

import './styles/tailwind.css';
import './styles/app.scss';

const App = () => {
	return (
		<>
			<FullscreenMode isActive={ true } />
			<Root context={ { isRtl: false } }>
				<Alert variant="success">
					Congrats! You've successfully setup the UI library.
				</Alert>
			</Root>
		</>
	);
};

export default App;
