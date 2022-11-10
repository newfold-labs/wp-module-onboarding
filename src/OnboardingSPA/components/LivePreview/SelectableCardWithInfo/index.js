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
} ) => {
	const [ loadingParent, setIsLoadingParent ] = useState( true );
	const [ isChecked, setIsChecked ] = useState( selected );
	const [ showDescription, setShowDescription ] = useState(false);

	const handleCheck = ( isChecked ) => {
		setIsChecked( isChecked );
		if ( typeof onClick === 'function' ) {
			onClick( isChecked );
		}
	}

	return (
		<div
			className={ `${ className }` }
			onClick={
				typeof onClick === 'function' &&
				( () => {
					if ( ! loadingParent ) {
						onClick();
					}
				} )
			}
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
			<div className={`${ className }__information`}>
				<div className={`${ className }__information__title-question`}>
					<div className={`${ className }__information__title-question__checkbox`}>
						<CheckboxControl
						label = {<b>{title}</b>}
						onChange={() => handleCheck( ! isChecked )}
						checked={isChecked} />
					</div>
					<div className={`${ className }__information__title-question__question`}>
						<Icon className={`${ className }__information__title-question__question__icon`} icon={help} 
						onClick={() => setShowDescription( ! showDescription )}/>
					</div>

				</div>
			</div>
			{ showDescription &&  <div className={`${ className }__description--container`}>
			<p className={`${ className }__description--text`}>{description}</p>
			</div>}

		</div>
	);
};

export default SelectableCardWithInfo;
