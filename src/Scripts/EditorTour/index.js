import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import Tour from './components/tour';

const EditorTour = () => {
	return (
		<div className="App">
			<Tour />
		</div>
	);
};

const renderModal = () => {
	const elementId = 'nfd-editor-tour-modal';
	const modalRoot = document.createElement( 'div' );
	modalRoot.id = elementId;

	// Append the modal container to the body if it hasn't been added already.
	if ( ! document.getElementById( elementId ) ) {
		document.body.append( modalRoot );
	}
	render( <EditorTour />, modalRoot );
};

domReady( () => {
	renderModal();
} );
