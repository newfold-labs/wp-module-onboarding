/**
 * Common Grid View Component
 * Shows the components in a grid view
 *
 * @return GridView
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
