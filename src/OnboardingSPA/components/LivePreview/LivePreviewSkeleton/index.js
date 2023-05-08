import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	LivePreviewSelectableCard,
	LivePreviewSelectableCardWithInfo,
} from '..';

/**
 * Renders Skeletons for Live Previews.
 *
 * @param {Object}  root0               Props.
 * @param {number}  root0.count         The number of Live Previews to be shown
 * @param {number}  root0.watch         The variable to be awaited for
 * @param {string}  root0.callback      The Render function in parent to be called
 * @param {string}  root0.className     The class name for the Live Preview
 * @param {number}  root0.viewportWidth Viewport Width for the Live Preview
 * @param {boolean} root0.isWithCard    Whether the skeleton is a Card
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
	const [ rerender, doRerender ] = useState( 0 );

	useEffect( () => doRerender( 1 ), [ watch ] );

	const buildDummyPreviews = () => {
		const dummyPreviews = [];

		for ( let i = 0; i < count; i++ ) {
			dummyPreviews.push(
				<LivePreviewSelectableCard
					key={ i }
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

		for ( let i = 0; i < count; i++ ) {
			dummyPreviews.push(
				<LivePreviewSelectableCardWithInfo
					key={ i }
					className={ className }
					viewportWidth={ 1200 }
					styling={ 'custom' }
					title={ __( 'Loading…', 'wp-module-onboarding' ) }
					description={ __( 'Loading…', 'wp-module-onboarding' ) }
				/>
			);
		}
		return dummyPreviews;
	};

	const build = () => {
		if ( isWithCard ) {
			return buildDummyPreviewsWithInfo();
		}
		return buildDummyPreviews();
	};

	return ! watch ? (
		build()
	) : (
		<>
			{ watch ? (
				<div style={ { display: 'none' } }>{ rerender }</div>
			) : null }
			{ callback() }
		</>
	);
};

export default LivePreviewSkeleton;
