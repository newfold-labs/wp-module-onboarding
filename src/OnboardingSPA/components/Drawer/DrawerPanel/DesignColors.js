import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { Popover, ColorPicker } from '@wordpress/components';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignColors = () => {

	const [isLoaded, setIsLoaded] = useState(false);
	const [globalStyles, setGlobalStyles] = useState();
	const [selectedColors, setSelectedColors] = useState();

	const [showColorPicker, setShowColorPicker] = useState(false);
	const [tertiaryColor, setTertiaryColor] = useState();
	const [secondaryColor, setSecondaryColor] = useState();
	const [backgroundColor, setBackgroundColor] = useState();
	const [colorPickerCalledBy, setColorPickerCalledBy] = useState('');

	const { currentStep, currentData, storedPreviewSettings } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				currentData:
					select(nfdOnboardingStore).getCurrentOnboardingData(),
				storedPreviewSettings:
					select(nfdOnboardingStore).getPreviewSettings(),
			};
		},
		[]
	);

	const { updatePreviewSettings, setCurrentOnboardingData } =
		useDispatch(nfdOnboardingStore);

	async function setThemeColorPalette(colorStyle) {
		let selectedGlobalStyle = globalStyles;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (colorStyle && selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'primary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][0];
						break;
					case 'secondary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][1];
						break;
					case 'tertiary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][2];
						break;
				}
			}

			selectedGlobalStyle.settings.color.palette.theme = selectedThemeColorPalette;
			setGlobalStyles(selectedGlobalStyle);
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}
	}

	const getStylesAndPatterns = async () => {
		const globalStyles = await getGlobalStyles();
		let selectedGlobalStyle;
		if (currentData.data.theme.variation) {
			selectedGlobalStyle = globalStyles.body.filter(
				(globalStyle) =>
					globalStyle.title === currentData.data.theme.variation
			)[0];
		} else {
			selectedGlobalStyle = globalStyles.body[0];
		}
		setGlobalStyles(selectedGlobalStyle);

		let selectedColors;
		if (!currentData?.data?.palette[0]?.hasOwnProperty('supports')) {
			currentData.data.palette[0] = {
				"slug": "",
       			"name": "",
       			"color": [],
				"supports": ["yith-wonder"]
			};
			selectedColors = currentData.data.palette[0];
			setCurrentOnboardingData(currentData);
		}
		else {
			selectedColors = currentData.data.palette[0];
		} 
		setSelectedColors(selectedColors);
		setThemeColorPalette(currentData.data.palette[0]['slug']);
		setIsLoaded(true);

	};

	useEffect(() => {
		if (!isLoaded) getStylesAndPatterns();
	}, [isLoaded]);

	useEffect(() => {
		let selectedGlobalStyle = globalStyles;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'background':
						if (colorPickerCalledBy == 'background' && backgroundColor)
							selectedThemeColorPalette[idx].color = backgroundColor;
						break;
					case 'secondary':
						if (colorPickerCalledBy == 'secondary' && secondaryColor)
							selectedThemeColorPalette[idx].color = secondaryColor;
						break;
					case 'tertiary':
						if (colorPickerCalledBy == 'tertiary' && tertiaryColor)
							selectedThemeColorPalette[idx].color = tertiaryColor;
						break;
				}
			}

			selectedGlobalStyle.settings.color.palette.theme = selectedThemeColorPalette;
			console.log(selectedGlobalStyle);
			setGlobalStyles(selectedGlobalStyle);
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}
	}, [backgroundColor, secondaryColor, tertiaryColor])

	const colorPalettes = {
		'calm': [
			'#C7DBFF',
			'#E6EBEE',
			'#1A4733',
		],
		'cool': [
			'#C7DBFF',
			'#EDF7FE',
			'#21447B',
		],
		'warm': [
			'#FFEDED',
			'#FEF7E8',
			'#7A3921',
		],
		'radiant': [
			'#C7F0FF',
			'#FEF4FB',
			'#63156A',
		],
		'bold': [
			'#F2A3D6',
			'#FFFBF5',
			'#09857C',
		],
		'retro': [
			'#F2E6A2',
			'#F5FFFF',
			'#096385',
		],
		'professional': [
			'#A2C1F2',
			'#F5FAFF',
			'#669933',
		],
	}

	const handleClick = (colorStyle) => {
		const selectedColorsTemp = {
			"slug": colorStyle,
			"name": colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1),
			"color": colorPalettes[colorStyle].reverse(),
			"supports": ["yith-wonder"]
		};
		setSelectedColors(selectedColorsTemp);
		currentData.data.palette[0] = selectedColorsTemp;
		setCurrentOnboardingData(currentData);

		// setBackgroundColor('');
		setSecondaryColor();
		setTertiaryColor();
		setThemeColorPalette(colorStyle);
	};

	const changeCustomPickerColor = async (color) => {

		let selectedColorsTemp = {
			"slug": 'custom',
			"name": 'Custom',
			"color": ['', secondaryColor ?? '', tertiaryColor ?? ''],
			"background": backgroundColor ?? '',
			"supports": ["yith-wonder"]
		};
		
		switch (colorPickerCalledBy) {
			case 'background':
					setBackgroundColor(color);
					selectedColorsTemp["background"] = color;
					break;
			case 'secondary':
					setSecondaryColor(color);
					selectedColorsTemp.color[1] = color;
 					break;
			case 'tertiary':
					setTertiaryColor(color);
					selectedColorsTemp.color[2] = color;
					break;
		}

		setSelectedColors(selectedColorsTemp);
		currentData.data.palette[0] = selectedColorsTemp;
		setCurrentOnboardingData(currentData);		
	}

	const selectCustomColor = (colorType) => {
		const showColorPickerTemp = showColorPicker;
		setShowColorPicker(!showColorPickerTemp);

		if (!showColorPickerTemp)
			setColorPickerCalledBy(colorType);
		else
			setColorPickerCalledBy('');
	}

	function buildPalettes () {
		let paletteRenderedList = [];
		for (const colorStyle in colorPalettes) {
			paletteRenderedList.push(
				<div className={`color-palette ${colorStyle == selectedColors?.slug ? 'color-palette-selected' : ''} `}
					onClick={(e) => handleClick(colorStyle)}>
					<div className='color-palette-colors'>
						<div className='color-palette-colors-tert'
							style={{ backgroundColor: `${colorPalettes[colorStyle][0]}` }}/>
						<div className='color-palette-colors-scnd'
							style={{ backgroundColor: `${colorPalettes[colorStyle][1]}` }}/>
						<div className='color-palette-colors-prim'
							style={{ backgroundColor: `${colorPalettes[colorStyle][2]}` }} />
					</div>
					<div className='color-palette-name'>
						{colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1) }
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	function buildCustomPalette () {
		return (
			<div className='custom-palette'>
				<div className='custom-palette-top'>
					<div className='custom-palette-top-text'>SELECT CUSTOM COLORS</div>
					<div className='custom-palette-top-icon'>-</div>
				</div>
				<div className='custom-palette-below'>
					<div className='custom-palette-below-row'
						onClick={(e) => selectCustomColor('background')}>
						<div className='custom-palette-below-row-icon'
							style={{ backgroundColor: `${backgroundColor ?? '#000'}` }}>
							{backgroundColor ? <div className='custom-palette-below-row-icon-selected'>&#10003;</div> : null}
							</div>
						<div className='custom-palette-below-row-text'>Background</div>
					</div>
					<div className='custom-palette-below-row'
						onClick={(e) => selectCustomColor('secondary')}>
						<div className='custom-palette-below-row-icon'
							style={{ backgroundColor: `${secondaryColor ?? '#fff'}` }}>
							{secondaryColor ? <div className='custom-palette-below-row-icon-selected'>&#10003;</div> : null}
							</div>
						<div className='custom-palette-below-row-text'>Secondary</div>
					</div>
					<div className='custom-palette-below-row'
						onClick={(e) => selectCustomColor('tertiary')}>
						<div className='custom-palette-below-row-icon'
							style={{ backgroundColor: `${tertiaryColor ?? '#0000ff'}` }}>
							{tertiaryColor ? <div className='custom-palette-below-row-icon-selected'>&#10003;</div> : null}
							</div>
						<div className='custom-palette-below-row-text'>Tertiary</div>
					</div>
				</div>
				{showColorPicker && (
					<Popover>
						<div className='custom-palette-close'
							onClick={() => setShowColorPicker(false)}>X</div>
						<ColorPicker
							onChange={changeCustomPickerColor}
							defaultValue="#874141"
						/>
					</Popover>
				)}
			</div>
		);
	}

	return (
		<div style={{ padding: '0 4px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
			{buildPalettes()}
			{buildCustomPalette()}
		</div>
	);
};

export default DesignColors;
