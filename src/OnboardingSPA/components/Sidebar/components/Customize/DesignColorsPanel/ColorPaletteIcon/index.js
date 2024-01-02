import './stylesheet.scss';

const ColorPaletteIcon = ( {
	idx,
	label,
	selectedPalette,
	setSelectedPalette,
	setSelectedColor,
	colors,
	setShowCustomColors = null,
} ) => {
	const conicGradient = `conic-gradient(${ colors[ idx ].primary } 90deg, ${ colors[ idx ].secondary } 90deg 150deg, ${ colors[ idx ].tertiary } 150deg 330deg, ${ colors[ idx ].primary } 330deg 360deg)`;
	const baseClassName =
		'nfd-onboarding-sidebar-customize--color-palette-icon';
	const handleClick = () => {
		setSelectedPalette( idx );
		setSelectedColor( colors[ idx ] );
		if ( setShowCustomColors ) {
			setShowCustomColors( false );
		}
	};
	return (
		<div className={ `${ baseClassName }__container` }>
			<div
				role="presentation"
				className={`${selectedPalette === idx ? `${baseClassName}__container__icon__selected` : `${baseClassName}__container__icon`}`}
				style={ {
					background: conicGradient,
				} }
				onClick={ handleClick }
			></div>
			<p>{ label }</p>
		</div>
	);
};

export default ColorPaletteIcon;
