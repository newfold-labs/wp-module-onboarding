import { __ } from '@wordpress/i18n';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Renders Skeletons for Radio Control.
 *
 * @property {number} data                      The options to be renedered
 * @property {number} count                     The number of Live Previews to be shown
 * @property {number} watch                     The variable to be awaited for
 * @property {string} callback                  The Render function in parent to be called
 * @property {string} className                 The class name for the Live Preview
 * 
 */
const RadioControlWithSkeleton = ({
    data,
    count,
    watch,
    selected,
    callback,
    className,
}) => {

    const [rerender, doRerender] = useState(0);

    useEffect(() => doRerender(1), [watch, selected]);

    const buildDummyPreviews = () => {
        var customItems = [];

        for (let idx = 0; idx < count; idx++)
            customItems.push(<div className="radio-control-skeleton-item" />);
            
        return (
            <div className='radio-control-skeleton'>
                {customItems}
           </div>
        );
    };

    const buildRealPreview = () => {
        return (
            <RadioControl
                className={`${className} radio-control-main`}
                selected={selected}
                options={data.map((option) => {
                    return {
                        label: __(
                            option.content,
                            'wp-module-onboarding'
                        ),
                        value: __(
                            option.value,
                            'wp-module-onboarding'
                        ),
                    };
                })}
                onChange={(value) => callback(value)}
            />
        );
    };

    return !watch ? buildDummyPreviews() :
        <>
            {watch ? <div style={{ display: 'none' }}>{rerender}</div> : null}
            {buildRealPreview()}
        </>;
};

export default RadioControlWithSkeleton;
