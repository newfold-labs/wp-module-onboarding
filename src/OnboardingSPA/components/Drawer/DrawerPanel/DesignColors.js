import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Popover, ColorPicker } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

import Animate from '../../Animate';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, getThemeColors } from '../../../utils/api/themes';
import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import {
	stateToStore,
	storeToState,
	findIndexInPalette,
} from '../../../pages/Steps/DesignColors/utils';
import ColorPickerButton from '../../ColorPickerButton';
import { ACTION_COLORS_SELECTED } from '../../../utils/analytics/hiive/constants';

import { convertObjectKeysToSnakeCase } from '../../../utils';

const DesignColors = () => {
	// Used for scrolling into custom colors section
	const customColorsResetRef = useRef( null );

	/**
	 * Predefined color palettes with color mappings
	 * eg: calm: {header-background: '#1A4733', secondary-foreground: '#FFF', …}
	 */
	const [ colors, setColors ] = useState();
	/**
	 * Custom mapping for selected colors from backend
	 * eg: base => ["header-foreground", "header-titles", "secondary-foreground"]
	 */
	const [ customColorsMap, setCustomColorsMap ] = useState();
	/**
	 * Mapped value for every color type for faster updates
	 * eg: {base: "#ffffff", contrast: "#404040", ... }
	 * Note: This exists for Predefined and Custom colors as well
	 */
	const [ selectedColors, setSelectedColors ] = useState();

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

	// Timeout after which a custom picker analytics event will be sent.
	const [ colorPickerTimeout, setColorPickerTimeout ] = useState();

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
			setColorStylesAndPatterns();
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
	 * Fetches the colors for the Drawer and sets the state
	 * Contains: 'tailored' and 'custom-picker-grouping'
	 */
	const setColorStylesAndPatterns = async () => {
		const [ globalStyles, colorPaletteResponse ] = await Promise.all( [
			getGlobalStyles(),
			getThemeColors(),
		] );
		if ( colorPaletteResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		if ( globalStyles?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setColors( colorPaletteResponse?.body.tailored );
		setCustomColorsMap(
			colorPaletteResponse?.body[ 'custom-picker-grouping' ]
		);
		let selectedColorsNew;
		if ( ! ( currentData?.data?.colorStyle === '' ) ) {
			selectedColorsNew =
				storedPreviewSettings?.settings?.color?.palette ??
				globalStyles.body[ 0 ]?.settings?.color?.palette;
			if ( currentData?.data?.colorStyle === 'custom' ) {
				setSelectedColors( storeToState( selectedColorsNew ) );
				setCustomColors( storeToState( selectedColorsNew ) );
			}
			setSelectedColors( storeToState( selectedColorsNew ) );
		} else {
			// Adds colors to the custom colors at start if not saved
			resetColors();
		}
	};

	/**
	 * When the user clicks on reset button it fetches the
	 * orginal colors and replaces them in the preview and store
	 */
	async function resetColors() {
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

		setCustomColors();

		const selectedGlobalStylePalette =
			selectedGlobalStyle.settings.color.palette;
		currentData.data.colorStyle = '';
		setCurrentOnboardingData( currentData );
		setSelectedColors( storeToState( selectedGlobalStylePalette ) );
	}

	/**
	 * Converts the user selected value into a suitable valid global styles array value
	 *
	 * @param {string} colorStyle - Selected Color slug
	 * @return {Object} selectedGlobalStyle - Updated Global Styles with new color changes
	 */
	async function saveThemeColorPalette( colorStyle ) {
		const selectedGlobalStyle = storedPreviewSettings;
		let selectedThemeColorPalette =
			storedPreviewSettings?.settings?.color?.palette;
		if ( ! ( colors && colorStyle && selectedThemeColorPalette ) ) {
			return storedPreviewSettings;
		}
		selectedThemeColorPalette = selectedThemeColorPalette.map(
			( color ) => {
				if ( colors?.[ colorStyle ]?.[ color.slug ] ) {
					// If not custom color then look for the predefined colors and get the color from the selected colors
					color.color = colors[ colorStyle ][ color.slug ];
				}
				return color;
			}
		);
		// Update Global Styles to reflect the same
		selectedGlobalStyle.settings.color.palette = selectedThemeColorPalette;
		updatePreviewSettings(
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		return selectedGlobalStyle;
	}

	// Pre-defined Colors Section

	/**
	 * Select a color from predefined colors and sync it.
	 *
	 * @param {string} colorStyle - Selected Color slug
	 */
	const handleClick = ( colorStyle ) => {
		setCustomColors();
		saveThemeColorPalette( colorStyle );
		setSelectedColors( colors[ colorStyle ] );
		stateToStore( colors[ colorStyle ] );
		//  Save selected color to Store
		currentData.data.colorStyle = colorStyle;
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_COLORS_SELECTED, colorStyle, {
				colors: convertObjectKeysToSnakeCase( colors[ colorStyle ] ),
			} )
		);
	};

	/**
	 * Build the predefined Colors Component
	 *
	 * @return {WPComponent} Predefined Colors Component
	 */
	function buildColors() {
		return Object.keys( colors ).map( ( colorStyle, idx ) => {
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
								backgroundColor: `${ colors[ colorStyle ]?.[ 'header-background' ] }`,
							} }
						/>
						<div
							className="color-palette__colors--secondary"
							style={ {
								backgroundColor: `${ colors[ colorStyle ]?.secondary }`,
							} }
						/>
						<div
							className="color-palette__colors--primary"
							style={ {
								backgroundColor: `${ colors[ colorStyle ]?.primary }`,
							} }
						/>
					</div>
					<div className="color-palette__name drawer-palette--button__text">
						{ colorStyle.charAt( 0 ).toUpperCase() +
							colorStyle.slice( 1 ) }
					</div>
				</div>
			);
		} );
	}

	// Custom Colors Section

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
			// If there is a mapping for a color to other colors in custom colors map
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
								findIndexInPalette(
									variant,
									colorPickerCalledBy,
									storedPreviewSettings?.settings?.color
										?.palette
								)
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
	const handleColorPicker = async ( color ) => {
		const selectedColorsLocalCopy = { ...selectedColors };
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
		stateToStore( selectedColorsLocalCopy );
		//  Save selected color to Store
		currentData.data.colorStyle = 'custom';
		setCurrentOnboardingData( currentData );
		setSelectedColors( selectedColorsLocalCopy );
		clearTimeout( colorPickerTimeout );
		setColorPickerTimeout(
			setTimeout( () => {
				trackOnboardingEvent(
					new OnboardingEvent( ACTION_COLORS_SELECTED, 'custom', {
						colors: convertObjectKeysToSnakeCase(
							selectedColorsLocalCopy
						),
					} )
				);
			}, 1000 )
		);
		setCustomColors( selectedColorsLocalCopy );
	};

	/**
	 * Toggles the color picker for every color
	 * and sets by which color was the Picker toggled.
	 * Note: This does not change the color
	 *
	 * @param {string} colorType - Color Slug e.g. base, secondary,...
	 */
	const handleColorPickerButton = ( colorType ) => {
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
	function buildCustomColors() {
		const defaultColor = '#fff';
		const primaryColor =
			customColors && customColors?.primary !== ''
				? customColors.primary
				: selectedColors?.primary ?? defaultColor;
		const secondaryColor =
			customColors && customColors?.secondary !== ''
				? customColors.secondary
				: selectedColors?.secondary ?? defaultColor;
		const tertiaryColor =
			customColors && customColors?.[ 'header-background' ] !== ''
				? customColors[ 'header-background' ]
				: selectedColors?.[ 'header-background' ] ?? defaultColor;

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
						{ __( 'SELECT CUSTOM COLORS', 'wp-module-onboarding' ) }
					</div>
					{ isAccordionClosed ? (
						<div className="custom-palette__top-icon">+</div>
					) : (
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
					<ColorPickerButton
						isColorSelected={ customColors }
						color={ customColors?.base ?? defaultColor }
						slug="base"
						name={ __( 'Background', 'wp-module-onboarding' ) }
						callback={ handleColorPickerButton }
					/>
					<ColorPickerButton
						isColorSelected={ customColors }
						color={ primaryColor }
						slug="primary"
						name={ __( 'Primary', 'wp-module-onboarding' ) }
						callback={ handleColorPickerButton }
					/>
					<ColorPickerButton
						isColorSelected={ customColors }
						color={ secondaryColor }
						slug="secondary"
						name={ __( 'Secondary', 'wp-module-onboarding' ) }
						callback={ handleColorPickerButton }
					/>
					<ColorPickerButton
						isColorSelected={ customColors }
						color={ tertiaryColor }
						slug="tertiary"
						name={ __( 'Tertiary', 'wp-module-onboarding' ) }
						callback={ handleColorPickerButton }
					/>
				</Animate>
				{ customColors && (
					<Animate type={ 'fade-in' } duration="300ms">
						<div
							ref={ customColorsResetRef }
							className="theme-colors--drawer--reset"
							role="button"
							tabIndex={ 0 }
							onClick={ resetColors }
							onKeyDown={ resetColors }
						>
							<div>{ __( 'Reset', 'wp-module-onboarding' ) }</div>
						</div>
					</Animate>
				) }
				{ /* Common to all the custom color component */ }
				{ showColorPicker && (
					<Popover>
						<div
							role="button"
							tabIndex={ 0 }
							className="custom-palette__picker__close-icon"
							onClick={ () => setShowColorPicker( false ) }
							onKeyDown={ () => setShowColorPicker( false ) }
						>
							X
						</div>
						<ColorPicker onChange={ handleColorPicker } />
					</Popover>
				) }
			</div>
		);
	}

	return (
		colors && (
			<div className="theme-colors--drawer">
				<h2>{ __( 'Color Palettes', 'wp-module-onboarding' ) }</h2>
				{ buildColors() }
				{ buildCustomColors() }
			</div>
		)
	);
};

export default DesignColors;
