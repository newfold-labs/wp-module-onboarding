import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Popover, ColorPicker } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import classNames from 'classnames';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeColors } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';
import Animate from '../../Animate';
import { trackHiiveEvent } from '../../../utils/analytics';

const DesignColors = () => {
	const customColorsResetRef = useRef( null );
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

	function stateToLocal( selectedColorPalette ) {
		if ( selectedColorPalette ) {
			const selectedColorsLocalTemp = {};
			selectedColorPalette?.forEach( ( color ) => {
				selectedColorsLocalTemp[ color.slug ] = color.color;
			} );
			setSelectedColorsLocal( selectedColorsLocalTemp );
			return selectedColorsLocalTemp;
		}
	}

	function LocalToState( selectedColorsLocalTemp, colorStyle ) {
		if ( selectedColorsLocalTemp && colorStyle ) {
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
			setSelectedColors( colorsArray );
			currentData.data.colorStyle = colorStyle;
			setCurrentOnboardingData( currentData );
			return colorsArray;
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
				const slug = selectedThemeColorPalette[ idx ]?.slug;
				if (
					isCustomStyle &&
					selectedColorsLocalTemp?.[ slug ] !== '' &&
					selectedColorsLocalTemp?.[ slug ] !== undefined
				) {
					selectedThemeColorPalette[ idx ].color =
						selectedColorsLocalTemp[ slug ];
				} else if (
					// Add Exception for Background. (perhaps scope to yith-wonder in future)
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
			}
			selectedGlobalStyle.settings.color.palette =
				selectedThemeColorPalette;
			updatePreviewSettings(
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);

			return selectedGlobalStyle;
		}
	}

	function findInCustomColors( slugName ) {
		const selectedThemeColorPalette =
			storedPreviewSettings?.settings?.color?.palette;
		const res = selectedThemeColorPalette.findIndex(
			( { slug } ) => slug === slugName
		);
		if ( res === -1 ) {
			return selectedThemeColorPalette.findIndex(
				( { slug } ) => slug === colorPickerCalledBy
			);
		}
		return res;
	}

	async function saveCustomColors() {
		const selectedGlobalStyle = storedPreviewSettings;
		const selectedThemeColorPalette =
			selectedGlobalStyle?.settings?.color?.palette;

		if ( selectedThemeColorPalette ) {
			for ( let idx = 0; idx < selectedThemeColorPalette.length; idx++ ) {
				const slug = selectedThemeColorPalette[ idx ]?.slug;
				if (
					colorPickerCalledBy === slug &&
					customColors &&
					customColors[ slug ] !== undefined
				) {
					selectedThemeColorPalette[ idx ].color =
						customColors[ slug ];
				}
			}
			if ( customColorsMap ) {
				const colorVariant = customColorsMap[ colorPickerCalledBy ];
				if ( colorVariant ) {
					colorVariant.forEach( ( variant ) => {
						if (
							customColors &&
							customColors[ colorPickerCalledBy ] !== undefined
						) {
							selectedThemeColorPalette[
								findInCustomColors( variant )
							].color = customColors[ colorPickerCalledBy ];
						}
					} );
				}
			}

			selectedGlobalStyle.settings.color.palette =
				selectedThemeColorPalette;
			updatePreviewSettings(
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);
		}
	}

	const getColorStylesAndPatterns = async () => {
		const globalStyles = await getGlobalStyles();
		const colorPaletteResponse = await getThemeColors();
		if ( colorPaletteResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		if ( globalStyles?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setColorPalettes( colorPaletteResponse?.body.tailored );
		setCustomColorsMap(
			colorPaletteResponse?.body[ 'custom-picker-grouping' ]
		);
		let selectedColorPalette;
		let selectedColorsLocalTemp;
		if ( ! ( currentData?.data?.colorStyle === '' ) ) {
			selectedColorPalette =
				globalStyles.body[ 0 ]?.settings?.color?.palette;
			selectedColorsLocalTemp = stateToLocal( selectedColorPalette );
			if ( currentData?.data?.colorStyle === 'custom' ) {
				setCustomColors( selectedColorsLocalTemp );
			}
			setSelectedColors( selectedColorPalette );
		} else {
			setToDefaultPalette();
		}
		saveThemeColorPalette(
			currentData?.data?.colorStyle,
			colorPaletteResponse?.body.tailored,
			selectedColorsLocalTemp,
			globalStyles?.body[ 0 ]
		);
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && THEME_STATUS_ACTIVE === themeStatus ) {
			getColorStylesAndPatterns();
		}
		if ( isCustomColorActive() ) {
			setIsAccordionClosed( false );
			customColorsResetRef.current.scrollIntoView( {
				behavior: 'smooth',
				block: 'end',
			} );
		}
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( colorStyle ) => {
		if ( selectedColors?.slug === colorStyle ) {
			return true;
		}

		clearCustomColors();
		saveThemeColorPalette( colorStyle );
		setSelectedColorsLocal( colorPalettes[ colorStyle ] );
		LocalToState( colorPalettes[ colorStyle ], colorStyle );
		trackHiiveEvent( 'color-selection', colorStyle );
	};

	const changeCustomPickerColor = async ( color ) => {
		const selectedColorsLocalCopy = { ...selectedColorsLocal };
		selectedColorsLocalCopy[ colorPickerCalledBy ] = color;

		if ( customColorsMap ) {
			const colorVariant = customColorsMap[ colorPickerCalledBy ];
			if ( colorVariant ) {
				colorVariant.forEach( ( variant ) => {
					selectedColorsLocalCopy[ variant ] = color;
				} );
			}
		}

		saveCustomColors();
		LocalToState( selectedColorsLocalCopy, 'custom' );
		setSelectedColorsLocal( selectedColorsLocalCopy );
		if ( ! isCustomColorActive() ) {
			trackHiiveEvent( 'color-selection', 'custom' );
		}
		setCustomColors( selectedColorsLocalCopy );
	};

	const selectCustomColor = ( colorType ) => {
		setShowColorPicker( ! showColorPicker );

		if ( ! showColorPicker ) {
			setColorPickerCalledBy( colorType );
		} else {
			setColorPickerCalledBy( '' );
		}
	};

	async function setToDefaultPalette() {
		const globalStyles = await getGlobalStyles( true );
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
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);

		clearCustomColors();

		const selectedGlobalStylePalette =
			selectedGlobalStyle.settings.color.palette;
		setSelectedColors( selectedGlobalStylePalette );
		setSelectedColorsLocal( stateToLocal( selectedGlobalStylePalette ) );
		trackHiiveEvent( 'color-selection-reset', selectedGlobalStyle.title );
	}

	function clearCustomColors() {
		for ( const custom in customColors ) {
			customColors[ custom ] = '';
		}

		// Resetting the color palette to default and unsetting the selected predefined color palette, if any.
		setCustomColors( customColors );
	}

	async function resetColors() {
		setToDefaultPalette();

		currentData.data.colorStyle = '';
		setCurrentOnboardingData( currentData );
	}

	function buildPalettes() {
		return Object.keys( colorPalettes ).map( ( colorStyle, idx ) => {
			return (
				<div
					key={ colorStyle }
					className={ classNames(
						'color-palette drawer-palette--button',
						{
							'color-palette-selected drawer-palette--button--selected':
								colorStyle === currentData?.data?.colorStyle,
						}
					) }
					role="button"
					tabIndex={ idx + 1 }
					onClick={ () => handleClick( colorStyle ) }
					onKeyDown={ () => handleClick( colorStyle ) }
				>
					<div className="color-palette__colors">
						<div
							className="color-palette__colors--tertiary"
							style={ {
								backgroundColor: `${ colorPalettes[ colorStyle ]?.[ 'header-background' ] }`,
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
		} );
	}

	function isCustomColorActive() {
		for ( const custom in customColors ) {
			if ( customColors[ custom ] !== '' ) {
				return true;
			}
		}

		return false;
	}

	function buildCustomPalette() {
		const defaultColor = '#fff';
		const primaryColorTemp =
			customColors && customColors?.primary !== ''
				? customColors.primary
				: selectedColorsLocal?.primary ?? defaultColor;
		const secondaryColorTemp =
			customColors && customColors?.secondary !== ''
				? customColors.secondary
				: selectedColorsLocal?.secondary ?? defaultColor;
		const tertiaryColorTemp =
			customColors && customColors?.[ 'header-background' ] !== ''
				? customColors[ 'header-background' ]
				: selectedColorsLocal?.[ 'header-background' ] ?? defaultColor;
		const paletteCount = Object.keys( colorPalettes ).length;

		return (
			<div className="custom-palette">
				<div
					className="custom-palette__top"
					role="button"
					tabIndex={ 0 }
					onClick={ () =>
						setIsAccordionClosed( ! isAccordionClosed )
					}
					onKeyDown={ () =>
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
						onClick={ () => selectCustomColor( 'base' ) }
						onKeyDown={ () => selectCustomColor( 'base' ) }
						role="button"
						tabIndex={ paletteCount + 1 }
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
						onClick={ () => selectCustomColor( 'primary' ) }
						onKeyDown={ () => selectCustomColor( 'primary' ) }
						role="button"
						tabIndex={ paletteCount + 2 }
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
						onClick={ () => selectCustomColor( 'secondary' ) }
						onKeyDown={ () => selectCustomColor( 'secondary' ) }
						role="button"
						tabIndex={ paletteCount + 3 }
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
						onClick={ () => selectCustomColor( 'tertiary' ) }
						onKeyDown={ () => selectCustomColor( 'tertiary' ) }
						role="button"
						tabIndex={ paletteCount + 4 }
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
					<Animate type={ 'fade-in' } duration="300ms">
						<div
							ref={ customColorsResetRef }
							className="theme-colors--drawer--reset"
							role="button"
							tabIndex={ 0 }
							onClick={ resetColors }
							onKeyDown={ resetColors }
						>
							<div>Reset</div>
						</div>
					</Animate>
				) }
				{ showColorPicker && (
					<Popover>
						<div
							className="custom-palette__picker-close-icon"
							onClick={ () => setShowColorPicker( false ) }
							role="button"
							tabIndex={ 0 }
							onKeyDown={ () => setShowColorPicker( false ) }
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
		<div className="theme-colors--drawer">
			<h2>{ __( 'Color Palettes', 'wp-module-onboarding' ) }</h2>
			{ colorPalettes && buildPalettes() }
			{ colorPalettes && buildCustomPalette() }
		</div>
	);
};

export default DesignColors;
