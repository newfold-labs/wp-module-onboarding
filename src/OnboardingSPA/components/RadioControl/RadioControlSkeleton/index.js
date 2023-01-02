/**
 * Renders Skeletons for Radio Control.
 *
 * @param {number} options       The options to be renedered
 *
 */
const RadioControlSkeleton = ({ options }) => {

    return <div className="radio-control-skeleton">
            {options.map((option) => (<div className="radio-control-skeleton-item" />))}
        </div>;
};

export default RadioControlSkeleton;