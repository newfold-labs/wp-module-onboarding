import { check, search, Icon } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';

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
	animationDuration = 2500,
} ) => {

	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShown(true);
		}, animationDuration);
		return () => clearTimeout(timer);
	}, [animationDuration]);

	return (
		<div
			className={ `${ className }` }
			onClick={ typeof onClick === 'function' && ( () => onClick() ) }
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
					className={`${selected
						? `${className}__title-bar--selected `
							: `${className}__title-bar--unselected`
						}`}
				>
					<Icon
						className={`${className}__title-bar--selected__path`}
						icon={check}
						size={64}
					/>
				</div>
			</div>
			<div className={`${className }__live-preview-container live-preview-container` }>
				{isShown ? null : 
					<div className='is-skeleton'>
						<div className='is-skeleton--box is-skeleton--box-header'>
							<div className={`is-skeleton--shimmer`} />
						</div>
						<div className='is-skeleton--box is-skeleton--box-body-1'/>
						<div className='is-skeleton--box is-skeleton--box-body-2'/>
						<div className='is-skeleton--box is-skeleton--box-footer'/>
					</div>}
				<LivePreview
					styling={styling}
					blockGrammer={blockGrammer}
					viewportWidth={viewportWidth}
					previewSettings={previewSettings}
				/> 
				{ overlay && (
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
