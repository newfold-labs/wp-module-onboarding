import { useState } from '@wordpress/element';
import { Icon, help } from '@wordpress/icons';
import { CheckboxControl } from '@wordpress/components';

import { LivePreview } from '..';

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
	const [ loadingParent, setIsLoadingParent ] = useState( true );
	const [ showDescription, setShowDescription ] = useState( false );

	const handleCheck = ( isChecked ) => {
		if ( typeof onClick === 'function' ) {
			onClick( isChecked, slug, title );
		}
	};

	return (
		<div
			className={ `${ className }` }
		>
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
				<div
					className={ `${ className }__description--container` }
					style={ {
						backgroundColor: showDescription
							? 'var(--nfd-onboarding-light-gray-highlighted)'
							: 'var(--nfd-onboarding-light-gray-3)',
					} }
				>
					<p className={ `${ className }__description--text` }>
						{ description }
					</p>
				</div>
			) }
		</div>
	);
};

export default SelectableCardWithInfo;
