import { check, search, Icon } from '@wordpress/icons';

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
} ) => {
	return (
		<div
			className={ `${ className }` }
			onClick={ typeof onClick === 'function' && ( () => onClick() ) }
		>
			<div className={ `${ className }__title-bar` }>
				<div className={ `${ className }__title-bar__browser` }>
					<span
						className={ `${ className }__title-bar__browser__dot` }
						style={ { background: '#989EA7' } }
					></span>
					<span
						className={ `${ className }__title-bar__browser__dot` }
						style={ { background: '#989EA7' } }
					></span>
					<span
						className={ `${ className }__title-bar__browser__dot` }
						style={ { background: '#989EA7' } }
					></span>
				</div>
				<div
					className={ `${
						selected
							? `${ className }__title-bar--selected`
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
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					styling={ styling }
					previewSettings={ previewSettings }
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
