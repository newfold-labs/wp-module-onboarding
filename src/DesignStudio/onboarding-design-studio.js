import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import DesignStudio from './components/DesignStudio';

// Register the plugin when DOM is ready
domReady( () => {
	registerPlugin( 'nfd-design-studio', {
		render: DesignStudio,
	} );
} );

// Export components for potential reuse
export { DesignStudio };
