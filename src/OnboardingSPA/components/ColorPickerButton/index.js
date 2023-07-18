// This is an Color Picker Option with a color displayed infront of the name
const ColorPickerButton = ( {
	isColorSelected,
	color,
	slug,
	name,
	callback,
} ) => {
	return (
		<div
			className="custom-palette__below-row"
			onClick={ () => callback( slug ) }
			onKeyDown={ () => callback( slug ) }
			role="button"
			tabIndex={ 0 }
		>
			<div
				className={ `custom-palette__below-row-icon ${
					isColorSelected &&
					'custom-palette__below-row-icon_selected_border'
				}` }
				style={ {
					backgroundColor: `${ color }`,
				} }
			>
				{ isColorSelected ? <>&#10003;</> : null }
			</div>
			<div className="custom-palette__below-row-text">{ name }</div>
		</div>
	);
};

export default ColorPickerButton;
