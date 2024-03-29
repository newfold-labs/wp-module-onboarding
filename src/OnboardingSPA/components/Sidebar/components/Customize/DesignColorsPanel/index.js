// eslint-disable-next-line import/no-extraneous-dependencies
import { forwardRef, useImperativeHandle } from 'react';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import ColorPickerButton from '../../../../ColorPickerButton';
import ColorPaletteIcon from './ColorPaletteIcon';
import CustomColorPalette from './CustomColorPalette';
import './stylesheet.scss';
import { store as nfdOnboardingStore } from '../../../../../store';
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../../../utils/analytics/hiive';
import { ACTION_COLORS_SELECTED } from '../../../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../../../data/flows/constants';

const DesignColorsPanel = forwardRef(
	(
		{
			baseClassName = 'nfd-onboarding-sidebar--customize__design-colors-panel',
			heading,
		},
		ref
	) => {
		const resetToDefaultColors = () => {
			setSelectedPalette( 0 );
			setSelectedColor( colors[ 0 ] );
			setShowCustomColors( false );
		};

		useImperativeHandle( ref, () => ( {
			resetToDefaultColors,
		} ) );

		const { currentData, customizeSidebarData, themeColors } = useSelect(
			( select ) => {
				return {
					currentData:
						select( nfdOnboardingStore ).getCurrentOnboardingData(),
					customizeSidebarData:
						select( nfdOnboardingStore ).getCustomizeSidebarData(),
					themeColors:
						select( nfdOnboardingStore ).getPreviewSettings()
							.settings.colors,
				};
			}
		);

		useEffect( () => {
			const slug = currentData.sitegen?.homepages?.active?.slug;

			let defaultPalette =
				currentData.sitegen.homepages.active.color.defaultPalette;
			if ( defaultPalette ) {
				return;
			}
			defaultPalette = cloneDeep(
				currentData.sitegen.homepages.active.color.palette
			);
			currentData.sitegen.homepages.data[ slug ].color.defaultPalette =
				defaultPalette;
			currentData.sitegen.homepages.active.color.defaultPalette =
				defaultPalette;
			setCurrentOnboardingData( currentData );

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ currentData ] );

		const colorPalettes = customizeSidebarData?.colorPalettes;
		let palettePrimaryColors = themeColors?.map( ( colorObj ) => ( {
			name: colorObj.name,
			color: colorObj.color,
		} ) );

		if ( ! palettePrimaryColors ) {
			palettePrimaryColors = Object.entries( colorPalettes[ 0 ] ).map(
				( [ , color ] ) => ( {
					name: __( 'Custom', 'wp-module-onboarding' ),
					color,
				} )
			);
		}

		const definePalettes = () => {
			const palettes = [];
			const defaultPalette =
				currentData?.sitegen?.homepages?.active?.color
					?.defaultPalette ||
				currentData?.sitegen?.homepages?.active?.color?.palette;

			colorPalettes.forEach( ( palette ) => {
				let isDefault = true;
				[ 'primary', 'base', 'tertiary' ].forEach( ( key ) => {
					const colorInPalette = palette[ key ];
					const colorInDefault = defaultPalette.find(
						( color ) => color.slug === key
					)?.color;
					if ( colorInPalette !== colorInDefault ) {
						isDefault = false;
					}
				} );
				const paletteObj = {
					primary: palette?.primary,
					secondary: palette?.secondary || palette?.base,
					tertiary: palette?.tertiary || palette?.primary,
					isDefault,
				};
				if ( isDefault ) {
					palettes.unshift( paletteObj );
				} else {
					palettes.push( paletteObj );
				}
			} );

			return palettes;
		};
		const palettes = definePalettes();

		const [ colors ] = useState( palettes );
		const [ customColors, setCustomColors ] = useState( null );
		const [ selectedColor, setSelectedColor ] = useState( {} );
		const [ showCustomColors, setShowCustomColors ] = useState( false );
		const [ isEditingCustomColors, setIsEditingCustomColors ] =
			useState( false );
		const [ selectedCustomColors, setSelectedCustomColors ] =
			useState( false );
		const [ selectedPalette, setSelectedPalette ] = useState( null );
		const [ colorPickerCalledBy, setColorPickerCalledBy ] = useState( '' );
		const [ showColorPicker, setShowColorPicker ] = useState( false );

		useEffect( () => {
			const activeColor = currentData.sitegen.homepages.active.color;

			if ( ! customColors ) {
				const customColorsToSet = activeColor.customColors;
				setCustomColors( customColorsToSet || palettes[ 0 ] );
			}

			if ( ! selectedPalette && selectedPalette !== 0 ) {
				const selectedPaletteToSet = activeColor.selectedPalette || 0;
				setSelectedPalette( selectedPaletteToSet );
				if ( selectedPaletteToSet === 'custom' ) {
					setShowCustomColors( true );
					setSelectedCustomColors( true );
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ currentData ] );

		const handleApplyCustomColors = () => {
			setSelectedCustomColors( true );
			setIsEditingCustomColors( false );
			setSelectedPalette( 'custom' );
			setCustomColors( selectedColor );
			const { isDefault, ...colorsForEvent } = selectedColor;
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_COLORS_SELECTED, 'custom', {
					colors: colorsForEvent,
					source: SITEGEN_FLOW,
				} )
			);
		};

		const handleEditCustomColors = () => {
			setSelectedPalette( 'custom' );
			setSelectedColor( customColors );
			setIsEditingCustomColors( true );
		};

		const handleColorPickerButton = ( colorType ) => {
			setShowColorPicker( ! showColorPicker );
			setColorPickerCalledBy( ! showColorPicker ? colorType : '' );
		};

		const handleColorPicker = ( color ) => {
			const updatedColor = { ...selectedColor };
			updatedColor[ colorPickerCalledBy ] = color;
			setSelectedColor( updatedColor );
		};

		const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );
		const convertColorSchema = ( inputObject ) => {
			const outputArray = [];

			for ( const key in inputObject ) {
				if (
					Object.prototype.hasOwnProperty.call( inputObject, key )
				) {
					const slug = key.replace( /_/g, '-' );
					const color = inputObject[ key ];
					const name = key
						.split( '_' )
						.map(
							( word ) =>
								word.charAt( 0 ).toUpperCase() + word.slice( 1 )
						)
						.join( ' ' );

					outputArray.push( {
						slug,
						color,
						name,
					} );
				}
			}
			return outputArray;
		};

		const handleUpdatePreviewSettings = () => {
			const slug = currentData.sitegen?.homepages?.active?.slug;
			if ( ! slug ) {
				return;
			}

			const activeColor = currentData.sitegen.homepages.active.color;

			if ( selectedPalette === 'custom' ) {
				activeColor.customColors = selectedColor;
			}

			activeColor.selectedPalette = selectedPalette;

			const colorPaletteIndex =
				selectedPalette === 'custom' ? 0 : selectedPalette;
			const selectedPaletteColors = colorPalettes[ colorPaletteIndex ];

			selectedPaletteColors.primary = selectedColor.primary;
			selectedPaletteColors.secondary = selectedColor.secondary;
			selectedPaletteColors.base = selectedColor.secondary;
			selectedPaletteColors.tertiary = selectedColor.tertiary;

			activeColor.palette = convertColorSchema( selectedPaletteColors );
			currentData.sitegen.homepages.data[ slug ].color = activeColor;
			setCurrentOnboardingData( currentData );
		};

		useEffect( () => {
			if (
				Object.keys( selectedColor ).length !== 0 &&
				selectedPalette !== null
			) {
				handleUpdatePreviewSettings();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ selectedColor, selectedPalette ] );

		const renderCustomColorsPalette = () => {
			return (
				<div
					className={ `${ baseClassName }__custom-color-palette__container` }
				>
					<div
						className={ `${ baseClassName }__custom-color-palette__container__header` }
					>
						<h5 className={ `${ baseClassName }__heading` }>
							<span>
								{ __(
									'CUSTOM COLORS',
									'wp-module-onboarding'
								) }
							</span>
						</h5>
						<button onClick={ () => handleEditCustomColors() }>
							{ __( 'Edit colors', 'wp-module-onboarding' ) }
						</button>
					</div>

					<div style={ { marginLeft: '5px' } }>
						<ColorPaletteIcon
							key={ 'custom' }
							idx={ 'custom' }
							selectedPalette={ selectedPalette }
							setSelectedPalette={ setSelectedPalette }
							setSelectedColor={ setSelectedColor }
							colors={ { custom: customColors } }
						/>
					</div>
				</div>
			);
		};

		const renderCustomColorPicker = () => {
			return (
				<div
					className={ `${ baseClassName }__custom__colors__container` }
				>
					<h5 className={ `${ baseClassName }__heading` }>
						{ __( 'CUSTOM COLORS', 'wp-module-onboarding' ) }
					</h5>
					<div>
						{ [ 'primary', 'secondary', 'tertiary' ].map(
							( colorType, index ) => (
								<ColorPickerButton
									key={ index }
									isColorSelected={ selectedColor }
									color={ selectedColor[ colorType ] }
									slug={ colorType }
									name={
										colorType.charAt( 0 ).toUpperCase() +
										colorType.slice( 1 )
									}
									callback={ handleColorPickerButton }
								/>
							)
						) }
					</div>
					<div
						className={ `${ baseClassName }__custom__colors__container__buttons` }
					>
						<Button
							onClick={ () => handleCancelCustomColors() }
							className={ 'cancel' }
						>
							{ __( 'Cancel', 'wp-module-onboarding' ) }
						</Button>
						<Button
							onClick={ handleApplyCustomColors }
							variant="primary"
						>
							{ __( 'Apply', 'wp-module-onboarding' ) }
						</Button>
					</div>

					{ showColorPicker && (
						<CustomColorPalette
							onChange={ handleColorPicker }
							palettePrimaryColors={ palettePrimaryColors }
						/>
					) }
				</div>
			);
		};

		const handlePickYourOwnColors = () => {
			setSelectedPalette( 'custom' );
			setSelectedColor( customColors );
			setShowCustomColors( true );
			if ( ! selectedCustomColors ) {
				setIsEditingCustomColors( true );
			}
		};

		const handleCancelCustomColors = () => {
			if ( ! selectedCustomColors ) {
				setShowCustomColors( false );
			} else {
				setIsEditingCustomColors( false );
			}
		};

		return (
			<PanelBody className={ baseClassName } initialOpen={ true }>
				<PanelRow>
					<div className={ `${ baseClassName }__container` }>
						<div
							className={ `${ baseClassName }__container__text` }
						>
							<p
								className={ `${ baseClassName }__container__text__heading` }
							>
								<strong>{ heading }</strong>
							</p>
							<div
								className={ `${ baseClassName }__container__color__palette__icon` }
							>
								{ colors.map( ( elem, idx ) => (
									<ColorPaletteIcon
										key={ idx }
										idx={ idx }
										label={
											idx === 0
												? __(
														'Default',
														'wp-module-onboarding'
												  )
												: ''
										}
										selectedPalette={ selectedPalette }
										setSelectedPalette={
											setSelectedPalette
										}
										setSelectedColor={ setSelectedColor }
										colors={ colors }
										setShowCustomColors={
											setShowCustomColors
										}
									/>
								) ) }
							</div>
						</div>
					</div>
				</PanelRow>
				<PanelRow>
					{ ! showCustomColors && (
						<div
							className={ `${ baseClassName }__custom__colors__button__container` }
						>
							<Button onClick={ () => handlePickYourOwnColors() }>
								{ __(
									'Pick your own colors',
									'wp-module-onboarding'
								) }
							</Button>
						</div>
					) }
					{ showCustomColors &&
						isEditingCustomColors &&
						renderCustomColorPicker() }
					{ showCustomColors &&
						! isEditingCustomColors &&
						renderCustomColorsPalette() }
				</PanelRow>
			</PanelBody>
		);
	}
);

export default DesignColorsPanel;
