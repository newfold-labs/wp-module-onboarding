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
	const [selectedColorsLocal, setSelectedColorsLocal] = useState();

	const [customColors, setCustomColors] = useState();
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
		'calm': {
			'tertiary': '#C7DBFF',
			'secondary': '#E6EBEE',
			'primary': '#1A4733',
			'background': ''
		},
		'cool': {
			'tertiary': '#C7DBFF',
			'secondary': '#EDF7FE',
			'primary': '#21447B',
			'background': ''
		},
		'warm': {
			'tertiary': '#FFEDED',
			'secondary': '#FEF7E8',
			'primary': '#7A3921',
			'background': ''
		},
		'radiant': {
			'tertiary': '#C7F0FF',
			'secondary': '#FEF4FB',
			'primary': '#63156A',
			'background': ''
		},
		'bold': {
			'tertiary': '#F2A3D6',
			'secondary': '#FFFBF5',
			'primary': '#09857C',
			'background': ''
		},
		'retro': {
			'tertiary': '#F2E6A2',
			'secondary': '#F5FFFF',
			'primary': '#096385',
			'background': ''
		},
		'professional': {
			'tertiary': '#A2C1F2',
			'secondary': '#F5FAFF',
			'primary': '#669933',
			'background': ''
		},
	}

	function stateToLocal(selectedColors) {
		if (selectedColors) {
			let selectedColorsLocalTemp = {};
			selectedColors?.color.forEach(color => {
				selectedColorsLocalTemp[color.slug] = color.color;
			});

			setSelectedColorsLocal(selectedColorsLocalTemp);
			return selectedColorsLocalTemp;
		}
	}

	function LocalToState(selectedColorsLocalTemp, colorStyle) {
		if (selectedColorsLocalTemp && colorStyle) {
			let selectedColorsTemp = selectedColors;
			selectedColorsTemp.slug = colorStyle;
			selectedColorsTemp.name = colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1);

			let colorsArray = [];
			for (let colorName in selectedColorsLocalTemp) {
				colorsArray.push({
					'slug': colorName,
					'name': colorName?.charAt(0).toUpperCase() + colorName?.slice(1),
					'color': selectedColorsLocalTemp[colorName]
				});
			}

			selectedColorsTemp.color = colorsArray;
			setSelectedColors(selectedColorsTemp);
			currentData.data.palette = selectedColorsTemp;
			setCurrentOnboardingData(currentData);
			return selectedColorsTemp;
		}
	}

	async function saveThemeColorPalette(colorStyle, selectedColorsLocalTemp = selectedColors, globalStylesTemp = globalStyles) {
		const isCustomStyle = colorStyle === 'custom';
		let selectedGlobalStyle = globalStylesTemp;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (colorStyle && selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'primary':
						if (isCustomStyle && selectedColorsLocalTemp?.primary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.primary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle].primary;
						break;
					case 'secondary':
						if (isCustomStyle && selectedColorsLocalTemp?.secondary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.secondary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle].secondary;
						break;
					case 'tertiary':
						if (isCustomStyle && selectedColorsLocalTemp?.tertiary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.tertiary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettes[colorStyle].tertiary;
						break;
					case 'background':
						if (isCustomStyle && selectedColorsLocalTemp?.background != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.background;
						else if (!isCustomStyle)
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

	async function saveCustomColors() {
		let selectedGlobalStyle = globalStyles;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if (selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'background':
						if (colorPickerCalledBy == 'background' && customColors?.background)
							selectedThemeColorPalette[idx].color = customColors?.background;
						break;
					case 'primary':
						if (colorPickerCalledBy == 'primary' && customColors?.primary)
							selectedThemeColorPalette[idx].color = customColors?.primary;
						break;
					case 'secondary':
						if (colorPickerCalledBy == 'secondary' && customColors?.secondary)
							selectedThemeColorPalette[idx].color = customColors?.secondary;
						break;
					case 'tertiary':
						if (colorPickerCalledBy == 'tertiary' && customColors?.tertiary)
							selectedThemeColorPalette[idx].color = customColors?.tertiary;
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
		let selectedColorsLocal;
		if (!currentData?.data?.palette?.slug === '') {
			selectedColors = currentData.data.palette;
			selectedColorsLocal = stateToLocal(selectedColors);
			setCustomColors(selectedColorsLocal);
			setCurrentOnboardingData(currentData);
		}
		else {
			selectedColors = currentData.data.palette;
			selectedColorsLocal = stateToLocal(selectedColors);
			setCustomColors(selectedColorsLocal);

			if(selectedColors.slug === 'custom') {
				setCustomColors(selectedColorsLocal);
			}
		} 
		setSelectedColors(selectedColors);
		saveThemeColorPalette(currentData?.data?.palette['slug'], selectedColorsLocal, selectedGlobalStyle);
		setIsLoaded(true);

	};

	useEffect(() => {
		if (!isLoaded) getColorStylesAndPatterns();
	}, [isLoaded]);

	const handleClick = (colorStyle) => {
		let selectedColorsLocalTemp = selectedColorsLocal;
		selectedColorsLocalTemp = colorPalettes[colorStyle];

		let customColorsTemp = customColors;
		for(let custom in customColorsTemp)
			customColorsTemp[custom] = '';
		
		setCustomColors(customColorsTemp);
		saveThemeColorPalette(colorStyle);
		setSelectedColorsLocal(selectedColorsLocalTemp);
		LocalToState(selectedColorsLocalTemp, colorStyle);
	};

	const changeCustomPickerColor = async (color) => {

		let selectedColorsLocalTemp = selectedColorsLocal;
		selectedColorsLocalTemp = customColors;
		customColors[colorPickerCalledBy] = color;
		
		saveCustomColors();
		LocalToState(selectedColorsLocalTemp, 'custom');
	}

	const selectCustomColor = (colorType) => {
		setShowColorPicker(!showColorPicker);

		if (!showColorPicker)
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
						<div className='color-palette__colors--tertiary'
							style={{ backgroundColor: `${colorPalettes[colorStyle].tertiary}` }}/>
						<div className='color-palette__colors--secondary'
							style={{ backgroundColor: `${colorPalettes[colorStyle].secondary}` }}/>
						<div className='color-palette__colors--primary'
							style={{ backgroundColor: `${colorPalettes[colorStyle].primary}` }} />
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
						<div className={`custom-palette__below-row-icon ${customColors?.background && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${customColors?.background ?? '#FFF'}` }}>
							{customColors?.background ? <div>&#10003;</div> : null}
							</div>
						<div className='custom-palette__below-row-text'>Background</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('primary')}>
						<div className={`custom-palette__below-row-icon ${customColors?.primary && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${customColors?.primary ?? primaryColorTemp}` }}>
							{customColors?.primary ? <>&#10003;</> : null}
						</div>
						<div className='custom-palette__below-row-text'>Primary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('secondary')}>
						<div className={`custom-palette__below-row-icon ${customColors?.secondary && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${customColors?.secondary ?? secondaryColorTemp}` }}>
							{customColors?.secondary ? <>&#10003;</> : null}
							</div>
						<div className='custom-palette__below-row-text'>Secondary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('tertiary')}>
						<div className={`custom-palette__below-row-icon ${customColors?.tertiary && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${customColors?.tertiary ?? tertiaryColorTemp}` }}>
							{customColors?.tertiary ? <>&#10003;</> : null}
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
