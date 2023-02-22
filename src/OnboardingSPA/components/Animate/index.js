import classNames from 'classnames';

/**
 * A Animator to show animation
 *
 * @param {string}             type  The name of Animation to be shown.
 * @param { object | boolean } after The variable to look after for before showing the animation, by default true to show the children right away.
 *
 */
const Animate = ( {
	type,
	after = true,
	children,
	className = '',
	duration = false,
	timingFunction = false,
} ) => {
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
				case 'fade-in-disabled':
					classname = prefix.concat( '__fade-in--disabled' );
					break;
				case 'fade-in-right':
					classname = prefix.concat( '__fade-in--right' );
					break;
				case 'fade-in-left':
					classname = prefix.concat( '__fade-in--left' );
					break;
				case 'fade-in-up':
					classname = prefix.concat( '__fade-in--up' );
					break;
				case 'shine':
					classname = prefix.concat( '__shine' );
					break;
				case 'shine-placeholder':
					classname = prefix.concat( '__shine--placeholder' );
					break;
				case 'dropdown':
					classname = prefix.concat( '__dropdown' );
					break;
				case 'load':
					classname = prefix.concat( '__load' );
					break;
			}
			return classname;
		}
	}

	return ! after ? (
		<div className={ `${ prefix }__blank` }>{ children }</div>
	) : (
		<div
			className={ classNames( getAnimateClassName(), className ) }
			style={ {
				animationDuration: duration,
				animationTimingFunction: timingFunction,
			} }
		>
			{ children }
		</div>
	);
};

export default Animate;
