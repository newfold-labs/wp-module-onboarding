import { useEffect } from '@wordpress/element';

const OrbAnimation = ( { height = '80px' } ) => {
	// Inline style to handle custom properties
	const logoStyle = {
		'--wnd-ai-logo-size': height,
		height: `var(--wnd-ai-logo-size, ${ height })`,
	};

	useEffect( () => {
		document
			.querySelectorAll( '[data-wnd-ai-logo]' )
			.forEach( function ( input ) {
				let keyIsDown = false;
				let animationFrameId = null;

				const toggleClass = () => {
					if ( keyIsDown ) {
						document.body.classList.add( 'wnd-ai-logo-keydown' );
					} else {
						document.body.classList.remove( 'wnd-ai-logo-keydown' );
					}
					animationFrameId = null;
				};

				input.addEventListener( 'keydown', function () {
					if ( ! keyIsDown ) {
						keyIsDown = true;
						if ( ! animationFrameId ) {
							animationFrameId =
								window.requestAnimationFrame( toggleClass );
						}
					}
				} );

				input.addEventListener( 'keyup', function () {
					keyIsDown = false;
					if ( ! animationFrameId ) {
						animationFrameId =
							window.requestAnimationFrame( toggleClass );
					}
				} );
			} );
	}, [] );

	return (
		<span className="wnd-ai-logo" style={ logoStyle }>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--bg"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--1"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--2"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--3"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--4"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--5"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--6"></span>
			<span className="wnd-ai-logo__spinner"></span>
		</span>
	);
};

export default OrbAnimation;
