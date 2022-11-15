import { useSelect } from '@wordpress/data';
import { LivePreviewSelectableCard } from '../LivePreview';

/**
 * Renders Skeletons for Live Previews.
 *
 * @property {number} count                     The number of Live Previews to be shown
 * @property {string} className                 The class name for the Live Preview
 * @property {number} viewportWidth             Viewport Width for the Live Preview
 * @property {number} skeletonLoadingTime       Change the Animation time for the Skeleton
 */
const LivePreviewSkeleton = ({ count, className, viewportWidth, skeletonLoadingTime }) => {
   
    const buildDummyPreviews = () => {
        let dummyPreviews = [];

        for (let i = 0; i < count; i++) {
            dummyPreviews.push(
                <LivePreviewSelectableCard
                    key={i}
                    blockGrammer={''}
                    styling={'custom'}
                    className={className}
                    skeletonLoadingTime={ skeletonLoadingTime ?? 3500 }
                    viewportWidth={viewportWidth}
                />
            );
        }

        return dummyPreviews;
    };

    return (
        buildDummyPreviews()
    );
};

export default LivePreviewSkeleton;
