import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { Popover, ColorPicker } from '@wordpress/components';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeColors } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { GlobalStylesProvider } from '../../LivePreview';
import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
} from '../../../../constants';
import Animate from '../../Animate';

const DesignColors = () => {
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ customColorsMap, setCustomColorsMap ] = useState();
	const [ selectedColors, setSelectedColors ] = useState();
	const [ showColorPicker, setShowColorPicker ] = useState( false );
	const [ isAccordionClosed, setIsAccordionClosed ] = useState( true );
	const [ selectedColorsLocal, setSelectedColorsLocal ] = useState();

	const [ customColors, setCustomColors ] = useState();
	const [ colorPalettes, setColorPalettes ] = useState();
	const [ colorPickerCalledBy, setColorPickerCalledBy ] = useState( '' );

	const { storedPreviewSettings, currentData, themeStatus } = useSelect(
		( select ) => {
			return {
				storedPreviewSettings:
					select( nfdOnboardingStore ).getPreviewSettings(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			};
		},
		[]
	);

	const {
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	function stateToLocal( selectedColors ) {
		if ( selectedColors ) {
			const selectedColorsLocalTemp = {};
			selectedColors?.color?.forEach( ( color ) => {
				selectedColorsLocalTemp[ color.slug ] = color.color;
			} );

			setSelectedColorsLocal( selectedColorsLocalTemp );
			return selectedColorsLocalTemp;
		}
	}

	function LocalToState( selectedColorsLocalTemp, colorStyle ) {
		if ( selectedColorsLocalTemp && colorStyle ) {
			selectedColors.slug = colorStyle;
			selectedColors.name =
				colorStyle?.charAt( 0 ).toUpperCase() + colorStyle?.slice( 1 );

			const colorsArray = [];
			for ( const colorName in selectedColorsLocalTemp ) {
				colorsArray.push( {
					slug: colorName,
					name:
						colorName?.charAt( 0 ).toUpperCase() +
						colorName?.slice( 1 ),
					color: selectedColorsLocalTemp[ colorName ],
				} );
			}

			selectedColors.color = colorsArray;
			setSelectedColors( selectedColors );
			currentData.data.palette = selectedColors;
			setCurrentOnboardingData( currentData );
			return selectedColors;
		}
	}

	async function saveThemeColorPalette(
		colorStyle,
		colorPalettesTemp = colorPalettes,
		selectedColorsLocalTemp = selectedColors,
		globalStylesTemp = storedPreviewSettings
	) {
		const isCustomStyle = colorStyle === 'custom';
		const selectedGlobalStyle = globalStylesTemp;
		const selectedThemeColorPalette =
			selectedGlobalStyle?.settings?.color?.palette;
		if ( colorPalettesTemp && colorStyle && selectedThemeColorPalette ) {
			for ( let idx = 0; idx < selectedThemeColorPalette.length; idx++ ) {
				switch ( selectedThemeColorPalette[ idx ]?.slug ) {
					case 'primary':
					case 'secondary':
					case 'tertiary':
					case 'base':
					case 'contrast':
					/* YITH WONDER */
					case 'header-background':
					case 'header-foreground':
					case 'header-titles':
					case 'secondary-background':
					case 'secondary-foreground':
						const slug = selectedThemeColorPalette[ idx ]?.slug;
						if (
							isCustomStyle &&
							selectedColorsLocalTemp?.[ slug ] != ''
						)
							selectedThemeColorPalette[ idx ].color =
								selectedColorsLocalTemp[ slug ];
						/**
						 * Add Exception for Background.
						 * (perhaps scope to yith-wonder in future)
						 */ else if (
							colorPalettesTemp?.[ colorStyle ]?.[ slug ] &&
							'base' === slug
						) {
							selectedThemeColorPalette[ idx ].color = '#FFFFFF';
						} else if (
							! isCustomStyle &&
							colorPalettesTemp?.[ colorStyle ]?.[ slug ]
						) {
							selectedThemeColorPalette[ idx ].color =
								colorPalettesTemp[ colorStyle ][ slug ];
						}
						break;
				}
			}

			selectedGlobalStyle.settings.color.palette =
				selectedThemeColorPalette;
			updatePreviewSettings(
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);

			return selectedGlobalStyle;
		}
	}

	function findInCustomColors(slugName, colorPickerCalledBy) {
		const selectedGlobalStyle = storedPreviewSettings;
		const selectedThemeColorPalette =
			selectedGlobalStyle?.settings?.color?.palette;
		const res = selectedThemeColorPalette.findIndex(({ slug }) => slug === slugName );
		if(res ===  -1)
			return selectedThemeColorPalette.findIndex(({ slug }) => slug === colorPickerCalledBy);
		return res;
	}

	async function saveCustomColors() {
		const selectedGlobalStyle = storedPreviewSettings;
		const selectedThemeColorPalette =
			selectedGlobalStyle?.settings?.color?.palette;

		if ( selectedThemeColorPalette ) {
			for ( let idx = 0; idx < selectedThemeColorPalette.length; idx++ ) {
				const slug = selectedThemeColorPalette[idx]?.slug;
				if (
					colorPickerCalledBy === slug && customColors &&
					customColors[slug] !== undefined
				)
					selectedThemeColorPalette[idx].color =
						customColors[slug];
			}
			if(customColorsMap)
			{
				const colorVariant = customColorsMap[colorPickerCalledBy];
				if ( colorVariant ) {
					colorVariant.forEach(( variant ) => {
						if (
							customColors &&
							customColors[colorPickerCalledBy] !== undefined
						) {
							selectedThemeColorPalette[findInCustomColors(variant, colorPickerCalledBy)].color =
								customColors[colorPickerCalledBy];
						}
					})
				}
			}

			selectedGlobalStyle.settings.color.palette =
				selectedThemeColorPalette;
			updatePreviewSettings(
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);
		}
	}

	const getColorStylesAndPatterns = async () => {
		const colorPalettes = await getThemeColors();
		if ( colorPalettes?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setColorPalettes(colorPalettes?.body['color-palettes']);
		setCustomColorsMap(colorPalettes?.body['custom-colors']);
		let selectedColors;
		let selectedColorsLocal;
		if ( ! currentData?.data?.palette?.slug === '' ) {
			selectedColors = currentData.data.palette;
			selectedColorsLocal = stateToLocal( selectedColors );
			setCustomColors( selectedColorsLocal );
			setCurrentOnboardingData( currentData );
		} else {
			selectedColors = currentData.data.palette;
			selectedColorsLocal = stateToLocal( selectedColors );

			if ( selectedColors.slug === 'custom' ) {
				setCustomColors( selectedColorsLocal );
			}
		}
		setSelectedColors( selectedColors );
		saveThemeColorPalette(
			currentData?.data?.palette.slug,
			colorPalettes?.body,
			selectedColorsLocal,
			storedPreviewSettings
		);
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && THEME_STATUS_ACTIVE === themeStatus )
			getColorStylesAndPatterns();
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( colorStyle ) => {
		const customColorsTemp = customColors;
		for ( const custom in customColorsTemp )
			customColorsTemp[ custom ] = '';

		setCustomColors( customColorsTemp );
		saveThemeColorPalette( colorStyle );
		setSelectedColorsLocal( colorPalettes[ colorStyle ] );
		LocalToState( colorPalettes[ colorStyle ], colorStyle );
	};

	const changeCustomPickerColor = async ( color ) => {
		const selectedColorsLocalCopy = { ...selectedColorsLocal };
		selectedColorsLocalCopy[ colorPickerCalledBy ] = color;

		saveCustomColors();
		LocalToState( selectedColorsLocalCopy, 'custom' );
		setSelectedColorsLocal( selectedColorsLocalCopy );
		setCustomColors( selectedColorsLocalCopy );
	};

	const selectCustomColor = ( colorType ) => {
		setShowColorPicker( ! showColorPicker );

		if ( ! showColorPicker ) setColorPickerCalledBy( colorType );
		else setColorPickerCalledBy( '' );
	};

	async function resetColors() {
		const globalStyles = await getGlobalStyles(true);
		let selectedGlobalStyle;
		if ( currentData?.data?.theme?.variation ) {
			selectedGlobalStyle = globalStyles.body.filter(
				( globalStyle ) =>
					globalStyle.title === currentData.data.theme.variation
			)[ 0 ];
		} else if ( globalStyles.body[ 0 ]?.id === 0 ) {
			selectedGlobalStyle = globalStyles.body[ 0 ];
		}
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		selectedColors.slug = '';
		selectedColors.name = '';
		for ( const colorVal in selectedColors?.color )
			selectedColors.color[ colorVal ].color = '';
		setCustomColors( stateToLocal( selectedColors ) );
		currentData.data.palette = selectedColors;

		setSelectedColors( selectedColors );
		setCurrentOnboardingData( currentData );
	}

	function buildPalettes() {
		const paletteRenderedList = [];
		for ( const colorStyle in colorPalettes ) {
			paletteRenderedList.push(
				<div
					key={ colorStyle }
					className={ `color-palette drawer-palette--button ${
						colorStyle == selectedColors?.slug
							? 'color-palette-selected drawer-palette--button--selected'
							: ''
					} ` }
					onClick={ ( e ) => handleClick( colorStyle ) }
				>
					<div className="color-palette__colors">
						<div
							className="color-palette__colors--tertiary"
							style={ {
								backgroundColor: `${ colorPalettes[ colorStyle ]?.tertiary }`,
							} }
						/>
						<div
							className="color-palette__colors--secondary"
							style={ {
								backgroundColor: `${ colorPalettes[ colorStyle ]?.secondary }`,
							} }
						/>
						<div
							className="color-palette__colors--primary"
							style={ {
								backgroundColor: `${ colorPalettes[ colorStyle ]?.primary }`,
							} }
						/>
					</div>
					<div className="color-palette__name drawer-palette--button__text">
						{ colorStyle?.charAt( 0 ).toUpperCase() +
							colorStyle?.slice( 1 ) }
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	function isCustomColorActive() {
		for (const custom in customColors)
			if(customColors[custom] != '')
				return true;

		return false;
	}

	function buildCustomPalette() {
		const defaultColor = '#fff';
		const primaryColorTemp =
			customColors && customColors?.primary != ''
				? customColors?.primary
				: selectedColorsLocal?.primary ?? defaultColor;
		const secondaryColorTemp =
			customColors && customColors?.secondary != ''
				? customColors?.secondary
				: selectedColorsLocal?.secondary ?? defaultColor;
		const tertiaryColorTemp =
			customColors && customColors?.tertiary != ''
				? customColors?.tertiary
				: selectedColorsLocal?.tertiary ?? defaultColor;

		return (
			<div className="custom-palette">
				<div
					className="custom-palette__top"
					onClick={ ( e ) =>
						setIsAccordionClosed( ! isAccordionClosed )
					}
				>
					<div className="custom-palette__top-text">
						SELECT CUSTOM COLORS
					</div>
					{ isAccordionClosed && (
						<div className="custom-palette__top-icon">+</div>
					) }
					{ ! isAccordionClosed && (
						<div className="custom-palette__top-icon">-</div>
					) }
				</div>
				<Animate
					type={ 'fade-in' }
					duration="300ms"
					timingFunction="ease-in-out"
					className={ `custom-palette__below ${
						isAccordionClosed
							? 'custom-palette_acc_closed'
							: 'custom-palette_acc_opened'
					}` }
				>
					<div
						className="custom-palette__below-row"
						onClick={ ( e ) => selectCustomColor( 'base' ) }
					>
						<div
							className={ `custom-palette__below-row-icon ${
								customColors?.base &&
								'custom-palette__below-row-icon_selected_border'
							}` }
							style={ {
								backgroundColor: `${
									customColors?.base ?? defaultColor
								}`,
							} }
						>
							{ customColors?.base ? <div>&#10003;</div> : null }
						</div>
						<div className="custom-palette__below-row-text">
							Background
						</div>
					</div>
					<div
						className="custom-palette__below-row"
						onClick={ ( e ) => selectCustomColor( 'primary' ) }
					>
						<div
							className={ `custom-palette__below-row-icon ${
								customColors?.primary &&
								'custom-palette__below-row-icon_selected_border'
							}` }
							style={ {
								backgroundColor: `${ primaryColorTemp }`,
							} }
						>
							{ customColors?.primary ? <>&#10003;</> : null }
						</div>
						<div className="custom-palette__below-row-text">
							Primary
						</div>
					</div>
					<div
						className="custom-palette__below-row"
						onClick={ ( e ) => selectCustomColor( 'secondary' ) }
					>
						<div
							className={ `custom-palette__below-row-icon ${
								customColors?.secondary &&
								'custom-palette__below-row-icon_selected_border'
							}` }
							style={ {
								backgroundColor: `${ secondaryColorTemp }`,
							} }
						>
							{ customColors?.secondary ? <>&#10003;</> : null }
						</div>
						<div className="custom-palette__below-row-text">
							Secondary
						</div>
					</div>
					<div
						className="custom-palette__below-row"
						onClick={ ( e ) => selectCustomColor( 'tertiary' ) }
					>
						<div
							className={ `custom-palette__below-row-icon ${
								customColors?.tertiary &&
								'custom-palette__below-row-icon_selected_border'
							}` }
							style={ {
								backgroundColor: `${ tertiaryColorTemp }`,
							} }
						>
							{ customColors?.tertiary ? <>&#10003;</> : null }
						</div>
						<div className="custom-palette__below-row-text">
							Tertiary
						</div>
					</div>
				</Animate>
				{ isCustomColorActive() && (
					<Animate type={'fade-in'} duration="300ms">
						<div className='theme-colors--drawer--reset' onClick={resetColors}>
							<div>Reset</div>
						</div>
					</Animate>
				) }
				{ showColorPicker && (
					<Popover>
						<div
							className="custom-palette__picker-close-icon"
							onClick={ () => setShowColorPicker( false ) }
						>
							X
						</div>
						<ColorPicker
							onChange={ changeCustomPickerColor }
							defaultValue="#874141"
						/>
					</Popover>
				) }
			</div>
		);
	}

	return (
		<GlobalStylesProvider>
			<div className="theme-colors--drawer">
				<h2>{ __( 'Color Palettes', 'wp-module-onboarding' ) }</h2>
				{ colorPalettes && buildPalettes() }
				{ colorPalettes && buildCustomPalette() }
			</div>
		</GlobalStylesProvider>
	);
};

export default DesignColors;
