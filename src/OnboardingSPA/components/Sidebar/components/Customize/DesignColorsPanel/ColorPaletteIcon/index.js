import React from 'react';
import './stylesheet.scss';

  const ColorPaletteIcon = ({ idx, label, selectedPalette, setSelectedPalette, setSelectedColor, colors }) => {
    const conicGradient = `conic-gradient(${colors[idx]['primary']} 90deg, ${colors[idx]['secondary']} 90deg 150deg, ${colors[idx]['tertiary']} 150deg 330deg, ${colors[idx]['primary']} 330deg 360deg)`;
    const baseClassName = 'nfd-onboarding-sidebar-customize--color-palette-icon'
    const handleClick = () => {
      setSelectedPalette(idx);
      setSelectedColor(colors[idx]);
    };
    return (
      <div className={`${baseClassName}__container`}>
        <div
          className={`${baseClassName}__container__icon`}
          style={{
            boxShadow: selectedPalette == idx ? '0 0 0 2px #FFF, 0 0 0 4px #035FEF' : 'none',
            background: conicGradient,
          }}
          onClick={handleClick}
        ></div>
        <p>{label}</p>
      </div>
    );
  };

  export default ColorPaletteIcon;
