const CustomColorOption = ( {
	color,
	displayColor,
	colorCateg,
	colorName,
	onClickFunc,
} ) => {
	return (
		<div
			className="custom-palette__below-row"
			onClick={ () => onClickFunc( colorCateg ) }
			onKeyDown={ () => onClickFunc( colorCateg ) }
			role="button"
			tabIndex={ 0 }
		>
			<div
				className={ `custom-palette__below-row-icon ${
					color && 'custom-palette__below-row-icon_selected_border'
				}` }
				style={ {
					backgroundColor: `${ displayColor }`,
				} }
			>
				{ color ? <>&#10003;</> : null }
			</div>
			<div className="custom-palette__below-row-text">{ colorName }</div>
		</div>
	);
};

export default CustomColorOption;
