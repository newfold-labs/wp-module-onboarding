import classNames from 'classnames';

/**
 * Grid Component
 * Shows the components in a grid view
 *
 * @param {Object} root0
 * @param {string} root0.className
 * @param {number} root0.size
 * @param {number} root0.colGap
 * @param {Object} root0.children
 * @return {WPComponent} NFDOnboarding Grid
 */
const Grid = ( { className = '', size, colGap = 0, children } ) => {
	return (
		<div
			className={ classNames( 'nfd-onboarding-grid', className ) }
			style={ {
				gridTemplateColumns: `repeat(${ size }, 1fr)`,
				gridColumnGap: `${ colGap }px`,
			} }
		>
			{ children }
		</div>
	);
};

export default Grid;
