// window.onload = function () {
// 	alert( 'volla' );
// 	console.log('volla')
// };

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

import Tour from '../tour/index';

domReady( () => {
	renderModal();
} );

const renderModal = () => {
	const elementId  = 'nfd-tour-modal';
	const modalRoot = document.createElement( 'div' );
	modalRoot.id = elementId;

	// Append the modal container to the body if it hasn't been added already.
	if ( ! document.getElementById( elementId ) ) {
		document.body.append( modalRoot );
	}
	render( <Tour />, modalRoot );
};
