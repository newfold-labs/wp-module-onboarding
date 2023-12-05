import React, { useState } from 'react';
import { ColorPalette, Popover } from '@wordpress/components';
import './stylesheet.scss';

const CustomColorPalette = ({ onChange, paletteSecondaryColors, palettePrimaryColors }) => {
  const [color, setColor] = useState(palettePrimaryColors[0].color)
  const baseClassName = 'nfd-onboarding-sidebar-customize--custom-color-palette'
  const colors = [
    {
      colors: palettePrimaryColors,
      name: 'Primary colors'
    },
    {
      colors: paletteSecondaryColors,
      name: 'Secondary colors'
    }
  ];
  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };
  return (
    <Popover placement='left'>
    <div className={`${baseClassName}__container`}>
    <ColorPalette
      colors={colors}
      value={color}
      onChange={handleColorChange}
    />
    </div>
    </Popover>
  );
};

  export default CustomColorPalette;
