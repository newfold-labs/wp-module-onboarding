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
	const [isAccordionClosed, setIsAccordionClosed] = useState(true);

	const [primaryColor, setPrimaryColor] = useState();
	const [tertiaryColor, setTertiaryColor] = useState();
	const [secondaryColor, setSecondaryColor] = useState();
	const [backgroundColor, setBackgroundColor] = useState();
	const [colorPickerCalledBy, setColorPickerCalledBy] = useState('');

	const { storedPreviewSettings, currentData } = useSelect(
		(select) => {
			return {
				storedPreviewSettings:
					select(nfdOnboardingStore).getPreviewSettings(),
				currentData:
					select(nfdOnboardingStore).getCurrentOnboardingData(),
			};
		},
		[]
	);

	const { updatePreviewSettings, setCurrentOnboardingData } =
		useDispatch(nfdOnboardingStore);

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

	async function setThemeColorPalette(colorStyle, selectedColorsTemp = selectedColors, globalStylesTemp = globalStyles) {
		const isCustomStyle = colorStyle === 'custom';
		let primaryColorTemp = selectedColorsTemp?.color[0].color ?? null;
		let secondaryColorTemp = selectedColorsTemp?.color[1].color ?? null;
		let tertiaryColorTemp = selectedColorsTemp?.color[2].color ?? null;
		let backgroundColorTemp = selectedColorsTemp?.color[3].color ?? null;

		let selectedGlobalStyle = globalStylesTemp;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (colorStyle && selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'primary':
						if (isCustomStyle && primaryColorTemp)
							selectedThemeColorPalette[idx].color = primaryColorTemp;
						else
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][2];
						break;
					case 'secondary':
						if (isCustomStyle && secondaryColorTemp)
							selectedThemeColorPalette[idx].color = secondaryColorTemp;
						else
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][1];
						break;
					case 'tertiary':
						if (isCustomStyle && tertiaryColorTemp)
							selectedThemeColorPalette[idx].color = tertiaryColorTemp;
						else
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][0];
						break;
					case 'background':
						if (isCustomStyle && backgroundColorTemp)
							selectedThemeColorPalette[idx].color = backgroundColorTemp;
						else
							selectedThemeColorPalette[idx].color = '#ffffff';
						break;
				}
			}

			selectedGlobalStyle.settings.color.palette.theme = selectedThemeColorPalette;
			setGlobalStyles(selectedGlobalStyle);
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);

			return selectedGlobalStyle;
		}
	}

	const getColorStylesAndPatterns = async () => {
		const globalStyles = await getGlobalStyles();
		let selectedGlobalStyle;
		if (currentData?.data?.theme?.variation) {
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
       			"color": [
					{"slug": "primary", "name": "Primary", "color": ""},
					{ "slug": "secondary", "name": "Secondary", "color": ""},
					{ "slug": "tertiary", "name": "Tertiary", "color": ""},
					{ "slug": "background", "name": "Background", "color": ""},
				],
				"supports": ["yith-wonder"]
			};
			selectedColors = currentData.data.palette[0];
			setCurrentOnboardingData(currentData);
		}
		else {
			selectedColors = currentData.data.palette[0];

			if(selectedColors.slug === 'custom') {
				setBackgroundColor(selectedColors?.color[3].color ?? null);
				setPrimaryColor(selectedColors?.color[0].color ?? null);
				setSecondaryColor(selectedColors?.color[1].color ?? null);
				setTertiaryColor(selectedColors?.color[2].color ?? null);
			}
		} 
		setSelectedColors(selectedColors);
		setThemeColorPalette(currentData?.data?.palette[0]['slug'], selectedColors, selectedGlobalStyle);
		setIsLoaded(true);

	};

	useEffect(() => {
		if (!isLoaded) getColorStylesAndPatterns();
	}, [isLoaded]);

	async function setCustomColors() {
		let selectedGlobalStyle = globalStyles;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'background':
						if (colorPickerCalledBy == 'background' && backgroundColor)
							selectedThemeColorPalette[idx].color = backgroundColor;
						break;
					case 'primary':
						if (colorPickerCalledBy == 'primary' && primaryColor)
							selectedThemeColorPalette[idx].color = primaryColor;
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
			setGlobalStyles(selectedGlobalStyle);
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}
	}

	const handleClick = (colorStyle) => {
		const selectedColorsTemp = {
			"slug": colorStyle,
			"name": colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1),
			"color": [
					{ "slug": "primary", "name": "Primary", "color": colorPalettes[colorStyle][2] },
					{ "slug": "secondary", "name": "Secondary", "color": colorPalettes[colorStyle][1] },
					{ "slug": "tertiary", "name": "Tertiary", "color": colorPalettes[colorStyle][0] },
					{ "slug": "background", "name": "Background", "color": "" },
				],
			"supports": ["yith-wonder"]
		};
		setBackgroundColor();
		setPrimaryColor();
		setSecondaryColor();
		setTertiaryColor();
		setThemeColorPalette(colorStyle);

		setSelectedColors(selectedColorsTemp);
		currentData.data.palette[0] = selectedColorsTemp;
		setCurrentOnboardingData(currentData);
	};

	const changeCustomPickerColor = async (color) => {
		let primaryColorTemp = selectedColors?.color[0].color ?? '';
		let secondaryColorTemp = selectedColors?.color[1].color ?? '';
		let tertiaryColorTemp = selectedColors?.color[2].color ?? '';

		let selectedColorsTemp = {
			"slug": 'custom',
			"name": 'Custom',
			"color": [
				{ "slug": "primary", "name": "Primary", "color": primaryColor ?? primaryColorTemp },
				{ "slug": "secondary", "name": "Secondary", "color": secondaryColor ?? secondaryColorTemp },
				{ "slug": "tertiary", "name": "Tertiary", "color": tertiaryColor ?? tertiaryColorTemp },
				{ "slug": "background", "name": "Background", "color": backgroundColor ?? '' },
			],
			"supports": ["yith-wonder"]
		};
		
		switch (colorPickerCalledBy) {
			case 'background':
					setBackgroundColor(color);
					selectedColorsTemp.color[3].color = color;
					break;
			case 'primary':
					setPrimaryColor(color);
					selectedColorsTemp.color[0].color = color;
					break;
			case 'secondary':
					setSecondaryColor(color);
					selectedColorsTemp.color[1].color = color;
 					break;
			case 'tertiary':
					setTertiaryColor(color);
					selectedColorsTemp.color[2].color = color;
					break;
		}
		
		setCustomColors();
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
					<div className='color-palette__colors'>
						<div className='color-palette__colors-tert'
							style={{ backgroundColor: `${colorPalettes[colorStyle][0]}` }}/>
						<div className='color-palette__colors-scnd'
							style={{ backgroundColor: `${colorPalettes[colorStyle][1]}` }}/>
						<div className='color-palette__colors-prim'
							style={{ backgroundColor: `${colorPalettes[colorStyle][2]}` }} />
					</div>
					<div className='color-palette__name'>
						{colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1) }
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	function buildCustomPalette () {

		let primaryColorTemp = selectedColors?.color[0].color ?? '#fff';
		let secondaryColorTemp = selectedColors?.color[1].color ?? '#fff';
		let tertiaryColorTemp = selectedColors?.color[2].color ?? '#fff';

		return (
			<div className='custom-palette'>
				<div className='custom-palette__top'
					onClick={(e) => setIsAccordionClosed(!isAccordionClosed)}>
					<div className='custom-palette__top-text'>SELECT CUSTOM COLORS</div>
					{isAccordionClosed && <div className='custom-palette__top-icon'>+</div> }
					{!isAccordionClosed && <div className='custom-palette__top-icon'>-</div> }
				</div>
				<div className={`custom-palette__below ${isAccordionClosed ? 'custom-palette_acc_closed' : 'custom-palette_acc_opened' }`}>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('background')}>
						<div className={`custom-palette__below-row-icon ${backgroundColor && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${backgroundColor ?? '#FFF'}` }}>
							{backgroundColor ? <div>&#10003;</div> : null}
							</div>
						<div className='custom-palette__below-row-text'>Background</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('primary')}>
						<div className={`custom-palette__below-row-icon ${primaryColor && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${primaryColor ?? primaryColorTemp}` }}>
							{primaryColor ? <>&#10003;</> : null}
						</div>
						<div className='custom-palette__below-row-text'>Primary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('secondary')}>
						<div className={`custom-palette__below-row-icon ${secondaryColor && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${secondaryColor ?? secondaryColorTemp}` }}>
							{secondaryColor ? <>&#10003;</> : null}
							</div>
						<div className='custom-palette__below-row-text'>Secondary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('tertiary')}>
						<div className={`custom-palette__below-row-icon ${tertiaryColor && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${tertiaryColor ?? tertiaryColorTemp}` }}>
							{tertiaryColor ? <>&#10003;</> : null}
							</div>
						<div className='custom-palette__below-row-text'>Tertiary</div>
					</div>
				</div>
				{showColorPicker && (
					<Popover>
						<div className='custom-palette__picker-close-icon'
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
