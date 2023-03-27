import { check, search, Icon } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import { LivePreview } from '..';

const SelectableCard = ( {
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
			role="button"
			tabIndex={ 0 }
			onClick={
				typeof onClick === 'function' &&
				( () => {
					if ( ! loadingParent ) {
						onClick();
					}
				} )
			}
			onKeyDown={
				typeof onClick === 'function' &&
				( () => {
					if ( ! loadingParent ) {
						onClick();
					}
				} )
			}
		>
			<div className={ `${ className }__title-bar` }>
				<div className={ `${ className }__title-bar__browser` }>
					<span
						className={ `${ className }__title-bar__browser__dot` }
					></span>
					<span
						className={ `${ className }__title-bar__browser__dot` }
					></span>
					<span
						className={ `${ className }__title-bar__browser__dot` }
					></span>
				</div>
				<div
					className={ `${
						selected
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
				{ overlay && ! loadingParent && (
					<div
						className={ `${ className }__live-preview-container__overlay` }
					>
						<Icon
							className={ `${ className }__live-preview-container__overlay__icon` }
							size={ 64 }
							icon={ search }
						/>
					</div>
				) }
			</div>
		</div>
	);
};

export default SelectableCard;
