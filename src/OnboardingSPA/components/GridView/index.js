/**
 * Common Grid View Component
 * Shows the components in a grid view
 * Supports column size 2 - 5
 *
 * @return GridView of children
 */

const GridView = ( { size, colGap = 0, children } ) => {
	return (
		<div
			className={ `grid-basic grid-col-${ size }` }
			style={ { gridColumnGap: `${ colGap }px` } }
		>
			{ children }
		</div>
	);
};

export default GridView;
