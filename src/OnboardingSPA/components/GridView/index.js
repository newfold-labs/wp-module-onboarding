/**
 * Common Grid View Component
 * Shows the components in a grid view
 *
 * @return GridView
 */

const GridView = ( { size, children } ) => {
	return <div className={ `grid-col-${ size }` }>{ children }</div>;
};

export default GridView;
