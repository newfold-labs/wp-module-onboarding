/**
 * Common Grid View Component
 * Shows the components in a grid view
 *
 * @return GridView of children
 */

const GridView = ( { size, colGap = 0, children } ) => {
	return (
		<div
			className={ `grid-basic` }
			style={ {
				gridTemplateColumns: `repeat(${ size }, 1fr)`,
				gridColumnGap: `${ colGap }px`,
			} }
		>
			{ children }
		</div>
	);
};

export default GridView;
