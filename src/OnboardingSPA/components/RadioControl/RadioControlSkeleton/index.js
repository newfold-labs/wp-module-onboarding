/**
 * Renders Skeletons for Radio Control.
 *
 * @param {number} data       The options to be renedered
 *
 */
const RadioControlSkeleton = ( { data } ) => {
	const buildDummyRadioControls = () => {
		const customItems = [];

		for ( let idx = 0; idx < data.length; idx++ )
			customItems.push( <div className="radio-control-skeleton-item" /> );

		return <div className="radio-control-skeleton">{ customItems }</div>;
	};

	return buildDummyRadioControls();
};

export default RadioControlSkeleton;
