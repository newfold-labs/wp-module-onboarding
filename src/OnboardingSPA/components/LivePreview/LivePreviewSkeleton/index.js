import { useSelect } from '@wordpress/data';
import { LivePreviewSelectableCard } from '..';

/**
 * Renders Skeletons for Live Previews.
 *
 * @property {number} count                     The number of Live Previews to be shown
 * @property {string} className                 The class name for the Live Preview
 * @property {number} viewportWidth             Viewport Width for the Live Preview
 * @property {number} skeletonLoadingTime       Change the Animation time for the Skeleton
 * 
 */
const LivePreviewSkeleton = ( {
	count,
	className,
	viewportWidth,
	skeletonLoadingTime,
} ) => {

	const MAX_ANIMATION_TIME = 600000;

	const buildDummyPreviews = () => {
		const dummyPreviews = [];

		for ( let i = 0; i < count; i++ ) {
			dummyPreviews.push(
				<LivePreviewSelectableCard
					key={ i }
					blockGrammer={ '' }
					styling={ 'custom' }
					className={ className }
					skeletonLoadingTime={ skeletonLoadingTime ?? MAX_INTEGER_VALUE }
					viewportWidth={ viewportWidth }
				/>
			);
		}

		return dummyPreviews;
	};

	return buildDummyPreviews();
};

export default LivePreviewSkeleton;
