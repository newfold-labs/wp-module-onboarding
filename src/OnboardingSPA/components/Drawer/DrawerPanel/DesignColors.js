import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Popover, ColorPicker } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

import Animate from '../../Animate';
import { trackHiiveEvent } from '../../../utils/analytics';
import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeColors } from '../../../utils/api/themes';
import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignColors = () => {
	// Used for scrolling into custom colors section
	const customColorsResetRef = useRef( null );

	/**
	 * Predefined color palettes with color mappings
	 * eg: calm: {header-background: '#1A4733', secondary-foreground: '#FFF', …}
	 */
	const [ colorPalettes, setColorPalettes ] = useState();
	/**
	 * Custom mapping for selected colors from backend
	 * eg: base => ["header-foreground", "header-titles", "secondary-foreground"]
	 */
	const [ customColorsMap, setCustomColorsMap ] = useState();
	/**
	 * Colors array similar to one in Global Styles
	 * eg: [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
	 */
	const [ selectedColors, setSelectedColors ] = useState();
	/**
	 * Mapped value for every color type for faster updates
	 * eg: {base: "#ffffff", contrast: "#404040", ... }
	 * Note: This exists for Predefined and Custom colors as well
	 */
	const [ selectedColorsLocal, setSelectedColorsLocal ] = useState();

	// Custom Colors Section
	/**
	 * Custom color mapping selected by the user
	 * eg: {base: '#da2929', contrast: '#404040',.. }
	 */
	const [ customColors, setCustomColors ] = useState();
	/**
	 * Determines which custom color was toggled to select a color
	 * e.g. base, primary, secondary..
	 */
	const [ colorPickerCalledBy, setColorPickerCalledBy ] = useState( '' );
	/**
	 * Determines if color picker should be shown
	 * Boolean able to toggle value i.e. true/false
	 */
	const [ showColorPicker, setShowColorPicker ] = useState( false );
	/**
	 * Determines if custom colors accordion state
	 * Boolean able to toggle value i.e. true/false
	 */
	const [ isAccordionClosed, setIsAccordionClosed ] = useState( true );

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

	useEffect( () => {
		if ( THEME_STATUS_ACTIVE === themeStatus ) {
			getColorStylesAndPatterns();
			if ( currentData?.data?.colorStyle === 'custom' ) {
				setIsAccordionClosed( false );
				customColorsResetRef?.current?.scrollIntoView( {
					behavior: 'smooth',
					block: 'end',
				} );
			}
		}
	}, [ themeStatus ] );

	/**
	 * Fetches the color palette for the Drawer and sets the state
	 * Contains: 'tailored' and 'custom-picker-grouping'
	 */
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
	};

	/**
	 * Helper Function for state in global styles to local mapping
	 *
	 * @param {Array} selectedColorPalette - Array of Map structure similar to the one in Global Styles
	 *                                     e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
	 *                                     return -> {base: "#ffffff", contrast: "#404040", ... }
	 */
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

	/**
	 * Converts the user selected value into a suitable valid global styles array value
	 *
	 * @param {Object} selectedColorsLocalTemp - Color type mapped to the color
	 *                                         e.g. {base: "#ffffff", contrast: "#404040", ... }
	 * @param {string} colorStyle              - Selected Color Palette slug
	 *                                         e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
	 */
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
			//  Save selected palette color to Store
			currentData.data.colorStyle = colorStyle;
			setCurrentOnboardingData( currentData );
			return colorsArray;
		}
	}

	/**
	 * When the user clicks a predefined palette or reset then
	 * The custom colors should be reset to the original colors.
	 */
	function clearCustomColors() {
		for ( const custom in customColors ) {
			customColors[ custom ] = '';
		}
		// Resetting the color palette to default and unsetting the selected predefined color palette, if any.
		setCustomColors( customColors );
	}

	/**
	 * When the user clicks on reset it fetches the
	 * orginal colors and replaces them in the preview
	 */
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

	/**
	 * Reset Button to reset selected colors
	 */
	async function resetColors() {
		setToDefaultPalette();
		currentData.data.colorStyle = '';
		setCurrentOnboardingData( currentData );
	}

	/**
	 * Converts the user selected value into a suitable valid global styles array value
	 *
	 * @param {string} colorStyle        - Selected Color Palette slug
	 * @param {Object} colorPalettesTemp - Color Palette from Backend with colors for every palette
	 * @param {Object} globalStylesTemp  - Global Styles from the store
	 * @return {Object} selectedGlobalStyle - Updated Global Styles with new color changes
	 */
	async function saveThemeColorPalette(
		colorStyle,
		colorPalettesTemp = colorPalettes,
		globalStylesTemp = storedPreviewSettings
	) {
		const isCustomStyle = colorStyle === 'custom';
		const selectedGlobalStyle = globalStylesTemp;
		const selectedThemeColorPalette =
			selectedGlobalStyle?.settings?.color?.palette;
		if ( colorPalettesTemp && colorStyle && selectedThemeColorPalette ) {
			for ( let idx = 0; idx < selectedThemeColorPalette.length; idx++ ) {
				// Iterate through every element in array
				// i.e. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...] and update the appropriate color that has been changed
				const slug = selectedThemeColorPalette[ idx ]?.slug;
				if (
					! isCustomStyle &&
					colorPalettesTemp?.[ colorStyle ]?.[ slug ]
				) {
					// If not custom color then look for the predefined palette and get the color from the selected palette
					selectedThemeColorPalette[ idx ].color =
						colorPalettesTemp[ colorStyle ][ slug ];
				}
			}

			// Update Global Styles to reflect the same
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

	// Pre-defined Colors Section

	/**
	 * Select a color from predefined palette and sync it.
	 *
	 * @param {string} colorStyle - Selected Color Palette slug
	 */
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

	/**
	 * Build the predefined Color Palette Component
	 *
	 * @return {WPComponent} Predefined Color Palette Component
	 */
	function buildPredefinedPalette() {
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

	// Custom Colors Section

	/**
	 * Checks id custom colors has a value
	 * used to toggle the visiblity of Reset button
	 *
	 * @return {boolean} isCustomColorActive
	 */
	function isCustomColorActive() {
		for ( const custom in customColors ) {
			if ( customColors[ custom ] !== '' ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Find the index of the color type being changed in the array
	 * Array to check -> [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
	 *
	 * @param {string} slugName - Slug Name for color i.e. base, secondary, header-title,...
	 * @return {number} res - Index of the key "slug" mapped ({color: '#ffffff', name: 'Base', slug: 'base'}, ...) in the array
	 */
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

	/**
	 * Custom Color can be mapped to more than one slug
	 * eg: base is mapped to ["header-foreground", "header-titles", "secondary-foreground"]
	 * So for every change in base all the subsequent colors must also be changed concurrently
	 */
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
					// Assign the color to the color that toggled color picker
					selectedThemeColorPalette[ idx ].color =
						customColors[ slug ];
				}
			}
			if ( customColorsMap ) {
				const colorVariant = customColorsMap[ colorPickerCalledBy ];
				if ( colorVariant ) {
					// Find if the Color had a mapping to other colors and update them with the same color too
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

			// Update the global styles to show the same.
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

	/**
	 * Change the color for the active color picker
	 * this changes the color when the user clicks on a new color.
	 *
	 * @param {string} color - The Color hex user has selected
	 */
	const changeCustomPickerColor = async ( color ) => {
		const selectedColorsLocalCopy = { ...selectedColorsLocal };
		selectedColorsLocalCopy[ colorPickerCalledBy ] = color;

		if ( customColorsMap ) {
			const colorVariant = customColorsMap[ colorPickerCalledBy ];
			if ( colorVariant ) {
				// If the selected color has a mapping to other colors the update the other colors respectively
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

	/**
	 * Toggles the color picker for every color
	 * and sets by which color was the Picker toggled.
	 * Note: This does not change the color
	 *
	 * @param {string} colorType - Color Slug e.g. base, secondary,...
	 */
	const selectCustomColor = ( colorType ) => {
		setShowColorPicker( ! showColorPicker );

		if ( ! showColorPicker ) {
			setColorPickerCalledBy( colorType );
		} else {
			setColorPickerCalledBy( '' );
		}
	};

	/**
	 * Build the Custom Colors Component
	 *
	 * @return {WPComponent} Custom Colors Component
	 */
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
							{ __( 'Background', 'wp-module-onboarding' ) }
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
							{ __( 'Primary', 'wp-module-onboarding' ) }
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
							{ __( 'Secondary', 'wp-module-onboarding' ) }
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
							{ __( 'Tertiary', 'wp-module-onboarding' ) }
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
							role="button"
							tabIndex={ 0 }
							className="custom-palette__picker-close-icon"
							onClick={ () => setShowColorPicker( false ) }
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
			{ colorPalettes && buildPredefinedPalette() }
			{ colorPalettes && buildCustomPalette() }
		</div>
	);
};

export default DesignColors;
