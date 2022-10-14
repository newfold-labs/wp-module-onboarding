import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeFonts } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { FontFamilyEdit } from './font-family';
import { G } from '@wordpress/components';

const DesignTypography = () => {

	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedFont, setSelectedFont] = useState();
	const [globalStyles, setGlobalStyles] = useState();
	const [fontPalettes, setFontPalettes] = useState();
	const [isAccordionClosed, setIsAccordionClosed] = useState(true);

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

	const getFontStylesAndPatterns = async () => {
		const fontPalettes = await getThemeFonts();
		const globalStyles = await getGlobalStyles();
		setFontPalettes(fontPalettes?.body);

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

		if(currentData?.data?.typography?.slug !== ''){
			handleClick(currentData?.data?.typography?.slug, selectedGlobalStyle, fontPalettes?.body);
		}else{
			updatePreviewSettings(
				useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
			);
		}
		setIsLoaded(true);
	};

	useEffect(() => {
		if (!isLoaded) getFontStylesAndPatterns();
	}, [isLoaded]);
	
	const handleClick = async (fontStyle, selectedGlobalStyle = globalStyles, fontPalettesCopy = fontPalettes) => {
		setSelectedFont(fontStyle);

		let globalStylesCopy = selectedGlobalStyle;
		globalStylesCopy.styles.typography.fontFamily = fontPalettesCopy[fontStyle]?.styles?.typography?.fontFamily;
		globalStylesCopy.styles.blocks['core/heading'].typography.fontFamily = 
			fontPalettesCopy[fontStyle]?.styles.blocks['core/heading'].typography.fontFamily;
		
		setGlobalStyles(globalStylesCopy);
		currentData.data.typography.slug = fontStyle;
		currentData.data.typography.data = fontPalettesCopy[fontStyle];
		setCurrentOnboardingData(currentData);

		updatePreviewSettings(
			useGlobalStylesOutput(globalStylesCopy, storedPreviewSettings)
		);
	};

	function buildPalettes() {
		let paletteRenderedList = [];
		for (const fontStyle in fontPalettes) {
			paletteRenderedList.push(
				<div className={`font-palette ${selectedFont == fontStyle ? 'font-palette-selected' : ''} `}
					onClick={(e) => handleClick(fontStyle)}>
					<div className='font-palette__icon'> Aa </div>
					<div className='font-palette__name'>
						{fontPalettes[fontStyle]?.label}
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	function buildCustomPalette() {
		return (
			<div className='custom-palette'>
				<div className='custom-palette__top'
					onClick={(e) => setIsAccordionClosed(!isAccordionClosed)}>
					<div className='custom-palette__top-text'>SELECT CUSTOM FONTS</div>
					{isAccordionClosed && <div className='custom-palette__top-icon'>+</div>}
					{!isAccordionClosed && <div className='custom-palette__top-icon'>-</div>}
				</div>
			</div>
		);
	}

	return (
		<div style={{ padding: '0 4px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
			{/* <FontFamilyEdit
				fontFamily={'monospace'}>
			</FontFamilyEdit> */}
			{buildPalettes()}
			{buildCustomPalette()}
		</div>
	);
};
export default DesignTypography;
