import { check, search, Icon } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';

import { LivePreview } from '../LivePreview';

const HeaderMenuPreview = ( {
	className = 'live-preview--selectable-card',
	selected = false,
	blockGrammer,
	viewportWidth = 1500,
	styling = 'large',
	previewSettings,
	overlay = false,
	onClick = false,
	skeletonLoadingTime = 2500,
} ) => {
	const [ loadingParent, setIsLoadingParent ] = useState( true );

	return (
		<div
			className={ `${ className }` }
			onClick={ typeof onClick === 'function' && ( () => {
				if ( ! loadingParent ) {
					onClick();
				}
			} ) }
		>
			<div className={ `${ className }__title-bar` }>
				<div className={ `${ className }__title-bar__browser` }></div>
				<div
					className={ `${ selected
						? `${ className }__title-bar--selected live-preview-selected-check`
						: `${ className }__title-bar--unselected`
					}` }
				>
					<Icon
						className={ `${ className }__title-bar--selected__path` }
						icon={ check }
						size={ 64 }
					/>
				</div>
			</div>
			<div className={ `${ className }__live-preview-container` }>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					setIsLoadingParent={ setIsLoadingParent }
					skeletonLoadingTime={ skeletonLoadingTime }
				/>
			</div>
		</div>
	);
};

export default HeaderMenuPreview;