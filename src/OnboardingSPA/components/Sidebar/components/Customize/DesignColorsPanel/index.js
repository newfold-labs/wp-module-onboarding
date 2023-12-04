import React, { useState } from 'react';
import { PanelBody, PanelRow, Button, Popover, ColorPicker, ColorPalette } from '@wordpress/components';
import ColorPickerButton from '../../../../ColorPickerButton';


const MyColorPalette = ({onChange}) => {
	const [ color, setColor ] = useState ( '#f00' )
	const colors = [
    {
      colors: [
        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },
        {
          color: '#00f',
          name: 'Blue'
        }
      ],
      name: 'Primary colors'
    },
    {
      colors: [
        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },        {
          color: '#f00',
          name: 'Red'
        },
        {
          color: '#ff0',
          name: 'Yellow'
        },
        {
          color: '#00f',
          name: 'Blue'
        },
        {
          color: '#00f',
          name: 'Blue'
        },
        {
          color: '#00f',
          name: 'Blue'
        },
        {
          color: '#00f',
          name: 'Blue'
        }
      ],
      name: 'Secondary colors'
    }
  ];
  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor); 
  };
	return (
		<ColorPalette
			colors={ colors }
			value={ color }
      onChange={handleColorChange} 
		/>
	);
};
const DesignColorsPanel = ({
  baseClassName = 'nfd-onboarding-sidebar-customize--design-colors-panel',
  heading,
  subheading,
  icon,
}) => {
  const [colors, setColors] = useState([
    { primary: '#ece9e4', secondary: '#1e1f27', tertiary: '#6f8598' },
    { primary: '#0077cc', secondary: '#66aaff', tertiary: '#aaccff' },
    { primary: '#996633', secondary: '#cc9900', tertiary: '#663300' },
    { primary: '#ffcc99', secondary: '#ff9966', tertiary: '#ffeecc' },
  ]);
  const [selectedColor, setSelectedColor] = useState({
    primary: '#0077cc',
    secondary: '#66aaff',
    tertiary: '#aaccff',
  });
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(1);
  const [colorPickerCalledBy, setColorPickerCalledBy] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const ColorPalette = ({ idx, label }) => {
    const conicGradient = `conic-gradient(${colors[idx]['primary']} 90deg, ${colors[idx]['secondary']} 90deg 150deg, ${colors[idx]['tertiary']} 150deg 330deg, ${colors[idx]['primary']} 330deg 360deg)`;

    const handleClick = () => {
      setSelectedPalette(idx);
      setSelectedColor(colors[idx]);
    };
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="color-palette"
          style={{
            boxSizing: 'border-box',
            boxShadow: selectedPalette == idx ? '0 0 0 2px #FFF, 0 0 0 4px #035FEF' : 'none',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: conicGradient,
            cursor: 'pointer',
          }}
          onClick={handleClick}
        ></div>
        <p style={{ marginTop: '8px', color: 'grey' }}>{label}</p>
      </div>
    );
  };

  const handleApplyCustomColors = () => {
    colors[selectedPalette] = selectedColor;
    setShowCustomColors(false);
  };

  const handleColorPickerButton = (colorType) => {
    setShowColorPicker(!showColorPicker);
    setColorPickerCalledBy(!showColorPicker ? colorType : '');
  };

  const handleColorPicker = (color) => {
    let updatedColor = { ...selectedColor };
    updatedColor[colorPickerCalledBy] = color;
    setSelectedColor(updatedColor);
  };

  return (
    <PanelBody className={baseClassName} initialOpen={true}>
      <PanelRow>
        <div className={`${baseClassName}__container`}>
          <div className={`${baseClassName}__container__text`}>
            <p className={`${baseClassName}__container__text__heading`}>
              <strong>{heading}</strong>
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
              {Object.keys(colors).map((idx) => (
                <ColorPalette key={idx} idx={idx} label={idx == 0 ? 'Default' : ''} />
              ))}
            </div>
          </div>
        </div>
      </PanelRow>
      <PanelRow>
        {showCustomColors ? (
          <div style={{ width: '100%' }}>
            <h5 className={`${baseClassName}__heading`}>CUSTOM COLORS</h5>
            <div style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
                {['primary', 'secondary', 'tertiary'].map((colorType, index) => (
                  <ColorPickerButton
                    key={index}
                    isColorSelected={selectedColor}
                    color={selectedColor[colorType]}
                    slug={colorType}
                    name={colorType.charAt(0).toUpperCase() + colorType.slice(1)}
                    callback={handleColorPickerButton}
                  />
                ))}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setShowCustomColors(false)} style={{ color: '#44494d' }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyCustomColors}
                  variant="primary"
                  style={{ backgroundColor: '#44494d', borderRadius: '5px' }}
                >
                  Apply
                </Button>
              </div>
            </div>
            {showColorPicker && (
              <Popover>
                <div style={{padding: '16px', width: '260px'}}>
    
                  <MyColorPalette onChange={handleColorPicker} />
                </div>

                {/* <div
                  role="button"
                  tabIndex={0}
                  className="custom-palette__picker__close-icon"
                  onClick={() => setShowColorPicker(false)}
                  onKeyDown={() => setShowColorPicker(false)}
                >
                  X
                </div>
                <ColorPicker onChange={handleColorPicker} /> */}
              </Popover>
            )}
          </div>
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button
              style={{
                border: '1px solid #9ca2a7',
                borderRadius: '8px',
                width: '100%',
                display: 'block',
                margin: '0 auto',
              }}
              onClick={() => setShowCustomColors(true)}
            >
              Pick your own colors
            </Button>
          </div>
        )}
      </PanelRow>
    </PanelBody>
  );
};

export default DesignColorsPanel;
