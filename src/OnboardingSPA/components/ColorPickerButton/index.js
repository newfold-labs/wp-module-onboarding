/**
 * Build the component with a Color and color name
 *
 * @param {Object}   root0
 * @param {boolean}  root0.isColorSelected - bool to show if the color is active
 * @param {string}   root0.color           - The color to be shown
 * @param {string}   root0.slug            - The color identifier
 * @param {string}   root0.name            - The color name to be shown
 * @param {Function} root0.callback        - callback when it is clicked
 * @return {WPComponent} Predefined Colors Component
 */
const ColorPickerButton = ( {
	isColorSelected,
	color,
	slug,
	name,
	callback,
} ) => {
	return (
		<div
			className="custom-palette__below__row"
			onClick={ () => callback( slug ) }
			onKeyDown={ () => callback( slug ) }
			role="button"
			tabIndex={ 0 }
		>
			<div
				className={ `custom-palette__below__row__icon ${
					isColorSelected &&
					'custom-palette__below__row__icon--selected-border'
				}` }
				style={ {
					backgroundColor: `${ color }`,
				} }
			>
				{ isColorSelected ? <>&#10003;</> : null }
			</div>
			<div className="custom-palette__below__row__text">{ name }</div>
		</div>
	);
};

export default ColorPickerButton;
