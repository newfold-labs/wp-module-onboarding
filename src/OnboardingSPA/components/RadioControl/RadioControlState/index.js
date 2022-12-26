import { useState, useEffect } from '@wordpress/element';
import RadioControlSkeleton from '../RadioControlSkeleton';

/**
 * A State Handler to manage Radio Control
 *
 * @param {number} data           The options to be renedered.
 * @param {string} children       The children to be rendered out.
 * @param {number} watch          The variable to be awaited for to be fetched.
 *
 */
const RadioControlState = ({ data, watch, children }) => {
    const [rerender, doRerender] = useState(0);

    useEffect(() => doRerender(1), [watch]);

    return !watch ? (
        <RadioControlSkeleton data={data} />
    ) : (
        <>
            {<div style={{ display: 'none' }}>{rerender}</div>}
            {children}
        </>
    );
};

export default RadioControlState;