import { useState } from '@wordpress/element';
import { Icon, help } from '@wordpress/icons';
import { CheckboxControl } from '@wordpress/components';

import { LivePreview } from '..';
import Animate from '../../Animate';

const SelectableCardWithInfo = ( {
	className = 'live-preview--selectable-card--title-description',
	selected = false,
	blockGrammer,
	viewportWidth = 1500,
	styling = 'large',
	previewSettings,
	onClick = false,
	skeletonLoadingTime = 2500,
	title = false,
	description = false,
	slug,
} ) => {
	const [ showDescription, setShowDescription ] = useState( false );

	const handleCheck = ( isChecked ) => {
		if ( typeof onClick === 'function' ) {
			onClick( isChecked, slug, title );
		}
	};

	return (
		<div className={ `${ className }` }>
			<div
				className={ `${ className }__live-preview-container` }
				onClick={ () => handleCheck( ! selected ) }
				role="presentation"
			>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					skeletonLoadingTime={ skeletonLoadingTime }
				/>
			</div>
			<div
				className={ `${ className }__information` }
				style={ {
					backgroundColor: showDescription
						? 'var(--nfd-onboarding-light-gray-highlighted)'
						: 'var(--nfd-onboarding-light-gray-3)',
				} }
			>
				<div
					className={ `${ className }__information__title-question` }
				>
					<div
						className={ `${ className }__information__title-question__checkbox` }
					>
						<CheckboxControl
							label={ <b>{ title }</b> }
							onChange={ () => handleCheck( ! selected ) }
							checked={ selected }
						/>
					</div>
					<div
						className={ `${ className }__information__title-question__question` }
					>
						<Icon
							className={ `${ className }__information__title-question__question__icon` }
							icon={ help }
							style={ {
								fill:
									showDescription &&
									'var(--wp-admin-theme-color-darker-10)',
							} }
							onClick={ () =>
								setShowDescription( ! showDescription )
							}
						/>
					</div>
				</div>
			</div>
			{ showDescription && (
				<Animate
					type={ 'dropdown' }
					className={ `${ className }__description--container ${
						showDescription ? 'highlighted' : 'not-highlighted'
					}` }
					style={ {
						backgroundColor: showDescription
							? 'var(--nfd-onboarding-light-gray-highlighted)'
							: 'var(--nfd-onboarding-light-gray-3)',
					} }
				>
					<p className={ `${ className }__description--text` }>
						{ description }
					</p>
				</Animate>
			) }
		</div>
	);
};

export default SelectableCardWithInfo;
