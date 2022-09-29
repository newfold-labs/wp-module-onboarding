import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignColors = () => {

	const [isLoaded, setIsLoaded] = useState(false);
	const [globalStyles, setGlobalStyles] = useState();
	const [selectedColors, setSelectedColors] = useState();

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
		if (!currentData?.data?.palette?.hasOwnProperty('colorStyle')) {
			currentData.data.palette = {
				'colorStyle': '',
				'colors': []
			};
			selectedColors = currentData.data.palette;
			setCurrentOnboardingData(currentData);
		}
		else {
			selectedColors = {
				'colorStyle': currentData.data.palette['colorStyle'],
				'colors': currentData.data.palette['colors']
			};
		} 
		setSelectedColors(selectedColors);
		setIsLoaded(true);
	};

	useEffect(() => {
		if (!isLoaded) getStylesAndPatterns();
	}, [isLoaded]);

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
			'colorStyle': colorStyle,
			'colors': colorPalettes[colorStyle]
		};
		setSelectedColors(selectedColorsTemp);
		currentData.data.palette = selectedColorsTemp;
		setCurrentOnboardingData(currentData);

		let selectedGlobalStyle = globalStyles;
		let selectedThemeColorPalette = selectedGlobalStyle?.settings?.color?.palette?.theme;

		if(selectedThemeColorPalette) {
			for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
				switch (selectedThemeColorPalette[idx]?.slug) {
					case 'primary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][2];
						break;
					case 'secondary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][1];
						break;
					case 'tertiary':
						selectedThemeColorPalette[idx].color = colorPalettes[colorStyle][0];
						break;
					default:
						break;
				}
			}

			selectedGlobalStyle.settings.color.palette.theme = selectedThemeColorPalette;

			setGlobalStyles(selectedGlobalStyle);
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}

	};

	function buildPalettes () {
		let paletteRenderedList = [];
		for (const colorStyle in colorPalettes) {
			paletteRenderedList.push(
				<div className={`color-palette ${colorStyle == selectedColors?.colorStyle ? 'color-palette-selected' : ''} `}
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

	return (
		<div style={{ padding: '0 4px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
			{buildPalettes()}
		</div>
	);
};

export default DesignColors;
