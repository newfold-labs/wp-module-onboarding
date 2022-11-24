import { useState, useEffect } from '@wordpress/element';

import { LivePreviewSelectableCard, LivePreviewSelectableCardWithInfo } from '..';

/**
 * Renders Skeletons for Live Previews.
 *
 * @property {number} count                     The number of Live Previews to be shown
 * @property {number} watch                     The variable to be awaited for
 * @property {string} callback                  The Render function in parent to be called
 * @property {string} className                 The class name for the Live Preview
 * @property {number} viewportWidth             Viewport Width for the Live Preview
 * 
 */
const LivePreviewSkeleton = ( {
	count,
	watch,
	callback,
	className,
	viewportWidth,
	isWithCard = false,
} ) => {

	const MAX_ANIMATION_TIME = 600000;
	const [rerender, doRerender] = useState(0);

	useEffect(() => doRerender(1), [watch]);

	const buildDummyPreviews = () => {
		const dummyPreviews = [];

		for ( let i = 0; i < count; i++ ) {
			dummyPreviews.push(
				<LivePreviewSelectableCard
					key={ i }
					blockGrammer={ '' }
					styling={ 'custom' }
					className={ className }
					skeletonLoadingTime={ MAX_ANIMATION_TIME }
					viewportWidth={ viewportWidth }
				/>
			);
		}
		return dummyPreviews;
	};

	const buildDummyPreviewsWithInfo = () => {
		const dummyPreviews = [];

		for (let i = 0; i < count; i++) {
			dummyPreviews.push(
				<LivePreviewSelectableCardWithInfo
						key={ i }
						className={ className }
						blockGrammer={ '' }
						viewportWidth={ 1200 }
						styling={ 'custom' }
						title={ 'Loading...' }
						description={'Loading...'}
					/>
			);
		}
		console.log(dummyPreviews);
		return dummyPreviews;
	};

	return !watch ? (isWithCard ? buildDummyPreviewsWithInfo() : buildDummyPreviews()) : 
			<>
				{watch ? <div style={{ display: 'none' }}>{rerender}</div> : null}
				{callback()}
			</>;
};

export default LivePreviewSkeleton;
