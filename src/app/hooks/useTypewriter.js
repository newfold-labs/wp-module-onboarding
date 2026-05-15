/**
 * WordPress dependencies
 */
import { useRef, useEffect, useState } from '@wordpress/element';

const TYPING_SPEED = 40;
const DELETING_SPEED = 25;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 400;

const useTypewriter = ( examples, { enabled = true, prefix = '' } ) => {
	const [ text, setText ] = useState( '' );
	const stateRef = useRef( {
		exampleIndex: 0,
		charIndex: 0,
		isDeleting: false,
	} );

	useEffect( () => {
		if ( ! enabled ) {
			setText( '' );
			return;
		}

		let timeout;
		const tick = () => {
			const { exampleIndex, charIndex, isDeleting } = stateRef.current;
			const currentExample = examples[ exampleIndex ];

			if ( ! isDeleting ) {
				// Typing
				if ( charIndex < currentExample.length ) {
					stateRef.current.charIndex++;
					setText( currentExample.slice( 0, stateRef.current.charIndex ) );
					timeout = setTimeout( tick, TYPING_SPEED );
				} else {
					// Pause then start deleting
					timeout = setTimeout( () => {
						stateRef.current.isDeleting = true;
						tick();
					}, PAUSE_AFTER_TYPING );
				}
			} else if ( charIndex > 0 ) {
				stateRef.current.charIndex--;
				setText( currentExample.slice( 0, stateRef.current.charIndex ) );
				timeout = setTimeout( tick, DELETING_SPEED );
			} else {
				// Move to next example
				stateRef.current.isDeleting = false;
				stateRef.current.exampleIndex = ( exampleIndex + 1 ) % examples.length;
				timeout = setTimeout( tick, PAUSE_AFTER_DELETING );
			}
		};

		tick();
		return () => clearTimeout( timeout );
	}, [ examples, enabled ] );

	if ( ! enabled ) {
		return '';
	}

	return prefix ? prefix + ' ' + text : text;
};

export default useTypewriter;
