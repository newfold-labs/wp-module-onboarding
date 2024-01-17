import { useState } from '@wordpress/element';
import { ColorPalette, Popover } from '@wordpress/components';
import './stylesheet.scss';
import { __ } from '@wordpress/i18n';

const CustomColorPalette = ( {
	onChange,
	paletteSecondaryColors,
	palettePrimaryColors,
} ) => {
	const [ color, setColor ] = useState( palettePrimaryColors[ 0 ].color );
	const baseClassName =
		'nfd-onboarding-sidebar--customize__custom-color-palette';
	const colors = [
		{
			colors: palettePrimaryColors,
			name: __( 'Primary colors', 'wp-module-onboarding' ),
		},
		{
			colors: paletteSecondaryColors,
			name: __( 'Secondary colors', 'wp-module-onboarding' ),
		},
	];
	const handleColorChange = ( newColor ) => {
		setColor( newColor );
		onChange( newColor );
	};
	return (
		<Popover placement="left">
			<div className={ `${ baseClassName }__container` }>
				<ColorPalette
					colors={ colors }
					value={ color }
					onChange={ handleColorChange }
				/>
			</div>
		</Popover>
	);
};

export default CustomColorPalette;
