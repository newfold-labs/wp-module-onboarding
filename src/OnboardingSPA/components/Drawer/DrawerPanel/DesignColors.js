import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { Popover, ColorPicker } from '@wordpress/components';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeColors, setGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import GlobalStyleProvider from '../../GlobalStyleProvider';

const DesignColors = () => {

	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedColors, setSelectedColors] = useState();
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [isAccordionClosed, setIsAccordionClosed] = useState(true);
	const [selectedColorsLocal, setSelectedColorsLocal] = useState();

	const [customColors, setCustomColors] = useState();
	const [colorPalettes, setColorPalettes] = useState();
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

	function stateToLocal(selectedColors) {
		if (selectedColors) {
			let selectedColorsLocalTemp = {};
			selectedColors?.color?.forEach(color => {
				selectedColorsLocalTemp[color.slug] = color.color;
			});

			setSelectedColorsLocal(selectedColorsLocalTemp);
			return selectedColorsLocalTemp;
		}
	}

	function LocalToState(selectedColorsLocalTemp, colorStyle) {
		if (selectedColorsLocalTemp && colorStyle) {
			selectedColors.slug = colorStyle;
			selectedColors.name = colorStyle?.charAt(0).toUpperCase() + colorStyle?.slice(1);

			let colorsArray = [];
			for (let colorName in selectedColorsLocalTemp) {
				colorsArray.push({
					'slug': colorName,
					'name': colorName?.charAt(0).toUpperCase() + colorName?.slice(1),
					'color': selectedColorsLocalTemp[colorName]
				});
			}
			
			selectedColors.color = colorsArray;
			setSelectedColors(selectedColors);
			currentData.data.palette = selectedColors;
			setCurrentOnboardingData(currentData);
			return selectedColors;
		}
	}

	async function saveThemeColorPalette(colorStyle, colorPalettesTemp = colorPalettes, selectedColorsLocalTemp = selectedColors, globalStylesTemp = storedPreviewSettings) {
		const isCustomStyle = colorStyle === 'custom';
		let selectedGlobalStyle = globalStylesTemp;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;
		if (colorPalettesTemp && colorStyle && selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'primary':
						if (isCustomStyle && selectedColorsLocalTemp?.primary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.primary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettesTemp[colorStyle].primary;
						break;
					case 'secondary':
						if (isCustomStyle && selectedColorsLocalTemp?.secondary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.secondary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettesTemp[colorStyle].secondary;
						break;
					case 'tertiary':
						if (isCustomStyle && selectedColorsLocalTemp?.tertiary != '')
							selectedThemeColorPalette[idx].color = selectedColorsLocalTemp.tertiary;
						else if (!isCustomStyle)
							selectedThemeColorPalette[idx].color = colorPalettesTemp[colorStyle].tertiary;
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
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);

			return selectedGlobalStyle;
		}
	}

	async function saveCustomColors() {
		let selectedGlobalStyle = storedPreviewSettings;
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
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}
	}

	const getColorStylesAndPatterns = async () => {
		const colorPalettes = await getThemeColors();
		setColorPalettes(colorPalettes?.body);
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

			if(selectedColors.slug === 'custom') {
				setCustomColors(selectedColorsLocal);
			}
		} 
		setSelectedColors(selectedColors);
		saveThemeColorPalette(currentData?.data?.palette['slug'], colorPalettes?.body, selectedColorsLocal, storedPreviewSettings);
		setIsLoaded(true);

	};

	useEffect(() => {
		if (!isLoaded) getColorStylesAndPatterns();
	}, [isLoaded]);

	const handleClick = (colorStyle) => {

		let customColorsTemp = customColors;
		for(let custom in customColorsTemp)
			customColorsTemp[custom] = '';
		
		setCustomColors(customColorsTemp);
		saveThemeColorPalette(colorStyle);
		setSelectedColorsLocal(colorPalettes[colorStyle]);
		LocalToState(colorPalettes[colorStyle], colorStyle);
	};

	const changeCustomPickerColor = async (color) => {
		let selectedColorsLocalCopy = { ...selectedColorsLocal };
		selectedColorsLocalCopy[colorPickerCalledBy] = color;

		saveCustomColors();
		LocalToState(selectedColorsLocalCopy, 'custom');
		setSelectedColorsLocal(selectedColorsLocalCopy);
		setCustomColors(selectedColorsLocalCopy);
	}

	const selectCustomColor = (colorType) => {
		setShowColorPicker(!showColorPicker);

		if (!showColorPicker)
			setColorPickerCalledBy(colorType);
		else
			setColorPickerCalledBy('');
	}

	async function resetColors() {
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
		updatePreviewSettings(
			useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
		);
		selectedColors.slug = '';
		selectedColors.name = '';
		for (let colorVal in selectedColors?.color)
			selectedColors.color[colorVal].color = '';
		setCustomColors(stateToLocal(selectedColors));
		currentData.data.palette = selectedColors;

		setSelectedColors(selectedColors)
		setCurrentOnboardingData(currentData);
	}

	function buildPalettes () {
		let paletteRenderedList = [];
		for (const colorStyle in colorPalettes) {
			paletteRenderedList.push(
				<div key={colorStyle} className={`color-palette ${colorStyle == selectedColors?.slug ? 'color-palette-selected' : ''} `}
					onClick={(e) => handleClick(colorStyle)}>
					<div className='color-palette__colors'>
						<div className='color-palette__colors--tertiary'
							style={{ backgroundColor: `${colorPalettes[colorStyle]?.tertiary}` }}/>
						<div className='color-palette__colors--secondary'
							style={{ backgroundColor: `${colorPalettes[colorStyle]?.secondary}` }}/>
						<div className='color-palette__colors--primary'
							style={{ backgroundColor: `${colorPalettes[colorStyle]?.primary}` }} />
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

		let primaryColorTemp = customColors && customColors?.primary != '' ? customColors?.primary : selectedColorsLocal?.primary ?? '#fff';
		let secondaryColorTemp = customColors && customColors?.secondary != '' ? customColors?.secondary : selectedColorsLocal?.secondary ?? '#fff';
		let tertiaryColorTemp = customColors && customColors?.tertiary != '' ? customColors?.tertiary : selectedColorsLocal?.tertiary ?? '#fff';

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
							style={{ backgroundColor: `${primaryColorTemp}` }}>
							{customColors?.primary ? <>&#10003;</> : null}
						</div>
						<div className='custom-palette__below-row-text'>Primary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('secondary')}>
						<div className={`custom-palette__below-row-icon ${customColors?.secondary && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${secondaryColorTemp}` }}>
							{customColors?.secondary ? <>&#10003;</> : null}
							</div>
						<div className='custom-palette__below-row-text'>Secondary</div>
					</div>
					<div className='custom-palette__below-row'
						onClick={(e) => selectCustomColor('tertiary')}>
						<div className={`custom-palette__below-row-icon ${customColors?.tertiary && 'custom-palette__below-row-icon_selected_border'}`}
							style={{ backgroundColor: `${tertiaryColorTemp}` }}>
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
		<GlobalStyleProvider>
			<div className='theme-colors--drawer'>
				<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
				{/* {selectedColors?.slug && 
					<div className='theme-colors--drawer--reset' onClick={resetColors}>
						<div>Reset Button</div>
					</div>
				} */}
				{ colorPalettes && buildPalettes() }
				{ colorPalettes && buildCustomPalette() }
			</div>
		</GlobalStyleProvider>
	);
};

export default DesignColors;
