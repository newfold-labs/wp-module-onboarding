import { useState, useEffect } from '@wordpress/element';

/**
 * A State Handler to manage Steps
 *
 * @param {string} children          The children to be rendered out.
 * @param {number} watch             The variable to be awaited for to be fetched.
 *
 */
const StepStateHandler = ({ watch, children }) => {
    const [rerender, doRerender] = useState(0);

    useEffect(() => doRerender(1), [watch]);

    return !watch ? (
        <div className='step-state-handler--blank'>
            { children }
        </div>
    ) : (
        <>
            {<div style={{ display: 'none' }}>{rerender}</div>}
                <div className='step-state-handler--visible'>
                {children}
            </div>
        </>
    );
};

export default StepStateHandler;