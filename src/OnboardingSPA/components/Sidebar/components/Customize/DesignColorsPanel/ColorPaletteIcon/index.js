import './stylesheet.scss';

const ColorPaletteIcon = ( {
	idx,
	label,
	selectedPalette,
	setSelectedPalette,
	setSelectedColor,
	colors,
	setShowCustomColors = null,
	customColors,
} ) => {
	let conicGradient;
	if (colors) {
		conicGradient = `conic-gradient(${ colors[ idx ].primary } 90deg, ${ colors[ idx ].secondary } 90deg 150deg, ${ colors[ idx ].tertiary } 150deg 330deg, ${ colors[ idx ].primary } 330deg 360deg)`;
	} else if ( customColors ) {
		conicGradient = `conic-gradient(${ customColors.primary } 90deg, ${ customColors.secondary } 90deg 150deg, ${ customColors.tertiary } 150deg 330deg, ${ customColors.primary } 330deg 360deg)`;
	}

	const baseClassName =
		'nfd-onboarding-sidebar--customize__color-palette-icon';
	const handleClick = () => {
		setSelectedPalette( idx );
		if ( colors ) {
			setSelectedColor( colors[ idx ] );
		} else if ( customColors ) {
			setSelectedColor( customColors );
		}

		if ( setShowCustomColors ) {
			setShowCustomColors( false );
		}
	};
	return (
		<div className={ `${ baseClassName }__container` }>
			<div
				role="presentation"
				className={ `${
					selectedPalette === idx
						? `${ baseClassName }__container__icon__selected`
						: `${ baseClassName }__container__icon`
				}` }
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
