/**
 * A Animator to show animation
 *
 * @param {string}             type  The name of Animation to be shown.
 * @param { object | boolean } after The variable to look after for before showing the animation, by default true to show the children right away.
 *
 */
const Animate = ( { type, after = true, children } ) => {
	const prefix = 'animate';

	/**
	 * Returns the appropriate className
	 *
	 * @return {string | void} ClassName that applies the animations
	 */
	function getAnimateClassName() {
		if ( type ) {
			let classname = '';

			switch ( type ) {
				// Add animation types and appropriate CSS
				case 'fade-in':
					classname = prefix.concat( '__fade-in' );
					break;
			}
			return classname;
		}
	}

	return ! after ? (
		<div className={ `${ prefix }__blank` }>{ children }</div>
	) : (
		<div className={ getAnimateClassName() }>{ children }</div>
	);
};

export default Animate;
