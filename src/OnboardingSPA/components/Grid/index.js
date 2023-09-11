import classNames from "classnames";

/**
 * Grid Component
 * Shows the components in a grid view
 *
 * @return Grid of children
 */
const Grid = ( { className = '', size, colGap = 0, children } ) => {
	return (
		<div
			className={ classNames('nfd-onboarding-grid', className) }
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
