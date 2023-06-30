import { useState } from '@wordpress/element';
import { Icon, help } from '@wordpress/icons';

import { CheckboxControl } from '@wordpress/components';
import Animate from '../../Animate';

/**
 * Checkbox Item Component
 * This returns a Single Element with a toggable description
 *
 * @param {string} icon     - The icon name of the Item
 * @param {string} title    - The Main Title of the Item
 * @param {string} subtitle - The Sub Title of the Item
 * @param {string} desc     - The Description of the Item
 *
 * @return CheckboxItem
 */

const CheckboxItem = ( {
	name,
	icon,
	title,
	desc,
	subtitle,
	callback,
	tabIndex = 0,
	isSelectedDefault,
	className = 'checkbox-item',
} ) => {
	const [ showDescription, setShowDescription ] = useState( false );
	const [ isSelected, setIsSelected ] = useState( isSelectedDefault );

	const handleCheck = () => {
		setIsSelected( ! isSelected );
		callback( name, ! isSelected );
	};

	const handleShowDesc = () => {
		setShowDescription( ! showDescription );
	};

	return (
		<div>
			<div
				className={ `${ className } ${
					isSelected && `${ className }--selected`
				} ${ showDescription && `${ className }--shown` }` }
			>
				<div className={ `${ className }-container` }>
					<CheckboxControl
						checked={ isSelected }
						onChange={ handleCheck }
						className={ `${ className }-checkbox` }
					/>
					<div className={ `${ className }__contents` }>
						<div
							className={ `${ className }__contents-icon
                                     ${
											isSelected &&
											`${ className }__contents-icon--selected`
										}
                                     ${
											showDescription &&
											`${ className }__contents-icon--shown`
										}` }
						>
							<div
								style={ {
									width: '35px',
									height: '35px',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
									backgroundImage: `var(${ icon })`,
									filter: isSelected
										? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)'
										: 'none',
								} }
							/>
						</div>
						<div className={ `${ className }__contents-text` }>
							<div
								className={ `${ className }__contents-text-title ${
									isSelected &&
									`${ className }__contents-text-title--selected`
								}` }
							>
								{ title }
							</div>
							<div
								className={ `${ className }__contents-text-subtitle` }
							>
								{ subtitle }
							</div>
						</div>
						<div
							className={ `${ className }__contents-help ${
								showDescription ? 'highlighted' : ''
							}` }
							onClick={ handleShowDesc }
							role="button"
							onKeyDown={ handleShowDesc }
							tabIndex={ tabIndex }
						>
							<Icon
								icon={ help }
								style={ {
									width: '30px',
									height: '30px',
								} }
							/>
						</div>
					</div>
				</div>
			</div>
			{ showDescription && (
				<Animate
					className={ ` ${ className }__dropdown ` }
					type={ 'dropdown' }
				>
					<div className={ `${ className }__desc` }>{ desc }</div>
				</Animate>
			) }
		</div>
	);
};

export default CheckboxItem;
