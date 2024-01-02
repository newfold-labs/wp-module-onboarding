import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import ColorPickerButton from '../../../../ColorPickerButton';
import ColorPaletteIcon from './ColorPaletteIcon';
import CustomColorPalette from './CustomColorPalette';
import './stylesheet.scss';
import { store as nfdOnboardingStore } from '../../../../../store';
import { __ } from '@wordpress/i18n';

const DesignColorsPanel = ( {
	baseClassName = 'nfd-onboarding-sidebar-customize--design-colors-panel',
	heading,
} ) => {
	const { customizeSidebarData } = useSelect( ( select ) => {
		return {
			customizeSidebarData:
				select( nfdOnboardingStore ).getCustomizeSidebarData(),
		};
	}, [] );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const design = customizeSidebarData?.design;
	const colorPalettes = customizeSidebarData?.colorPalettes;
	const palettePrimaryColors = Object.entries( design?.color_palette ).map(
		( [ , color ] ) => ( {
			name: __( 'Custom', 'wp-module-onboarding' ),
			color,
		} )
	);

	const defaultColors = {
		primary: design?.color_palette.primary,
		secondary: design?.color_palette.secondary,
		tertiary: design?.color_palette.tertiary,
	};

	const palettes = [];

	colorPalettes.slice(1, 5).forEach((palette) => {
		palettes.push({
			primary: palette?.primary,
			secondary: palette?.secondary,
			tertiary: palette?.tertiary,
		});
	});

	const [colors] = useState([defaultColors, ...palettes]);
	const [selectedColor, setSelectedColor] = useState(palettes[0]);
	const [ showCustomColors, setShowCustomColors ] = useState( false );
	const [ isEditingCustomColors, setIsEditingCustomColors ] =
		useState( false );
	const [ selectedCustomColors, setSelectedCustomColors ] = useState( false );
	const [ selectedPalette, setSelectedPalette ] = useState( 1 );
	const [ colorPickerCalledBy, setColorPickerCalledBy ] = useState( '' );
	const [ showColorPicker, setShowColorPicker ] = useState( false );

	const paletteSecondaryColors = Object.entries( colorPalettes[ 1 ] )
		.map( ( [ name, color ] ) => {
			if ( name !== 'name' ) {
				return {
					name: __( 'Custom', 'wp-module-onboarding' ),
					color,
				};
			}
			return null;
		} )
		.filter( Boolean );

	const handleApplyCustomColors = () => {
		setSelectedCustomColors( true );
		setIsEditingCustomColors( false );
		setSelectedPalette( 4 );
		colors[ selectedPalette ] = selectedColor;
	};

	const handleEditCustomColors = () => {
		setSelectedPalette( 4 );
		setSelectedColor( colors[ 4 ] );
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
			if ( Object.prototype.hasOwnProperty.call( inputObject, key ) ) {
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
		colorPalettes[ selectedPalette ].primary = selectedColor.primary;
		colorPalettes[ selectedPalette ].secondary = selectedColor.secondary;
		colorPalettes[ selectedPalette ].tertiary = selectedColor.tertiary;
		const slug = currentData.sitegen.homepages.active.slug;
		currentData.sitegen.homepages.data[ slug ].color.palette =
			convertColorSchema( colorPalettes[ selectedPalette ] );
		currentData.sitegen.homepages.active.color.palette = convertColorSchema(
			colorPalettes[ selectedPalette ]
		);
		setCurrentOnboardingData( currentData );
	};

	useEffect( () => {
		handleUpdatePreviewSettings();
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
						<span>{__( 'CUSTOM COLORS', 'wp-module-onboarding' )}</span>
					</h5>
					<button onClick={ () => handleEditCustomColors() }>
						{__( 'Edit colors', 'wp-module-onboarding' )}
					</button>
				</div>

				<div style={ { marginLeft: '5px' } }>
					<ColorPaletteIcon
						key={ 4 }
						idx={ 4 }
						selectedPalette={ selectedPalette }
						setSelectedPalette={ setSelectedPalette }
						setSelectedColor={ setSelectedColor }
						colors={ colors }
					/>
				</div>
			</div>
		);
	};

	const renderCustomColorPicker = () => {
		return (
			<div className={ `${ baseClassName }__custom__colors__container` }>
				<h5 className={ `${ baseClassName }__heading` }>
					{__( 'CUSTOM COLORS', 'wp-module-onboarding' )}
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
						{__( 'Cancel', 'wp-module-onboarding' )}
					</Button>
					<Button
						onClick={ handleApplyCustomColors }
						variant="primary"
					>
						{__( 'Apply', 'wp-module-onboarding' )}
					</Button>
				</div>

				{ showColorPicker && (
					<CustomColorPalette
						onChange={ handleColorPicker }
						palettePrimaryColors={ palettePrimaryColors }
						paletteSecondaryColors={ paletteSecondaryColors }
					/>
				) }
			</div>
		);
	};

	const handlePickYourOwnColors = () => {
		setSelectedPalette( 4 );
		setSelectedColor( colors[ 4 ] );
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
					<div className={ `${ baseClassName }__container__text` }>
						<p
							className={ `${ baseClassName }__container__text__heading` }
						>
							<strong>{ heading }</strong>
						</p>
						<div
							className={ `${ baseClassName }__container__color__palette__icon` }
						>
							{ colors.slice( 0, 4 ).map( ( elem, idx ) => (
								<ColorPaletteIcon
									key={ idx }
									idx={ idx }
									label={ idx === 0 ? __( 'Default', 'wp-module-onboarding' ) : '' }
									selectedPalette={ selectedPalette }
									setSelectedPalette={ setSelectedPalette }
									setSelectedColor={ setSelectedColor }
									colors={ colors }
									setShowCustomColors={ setShowCustomColors }
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
							{__( 'Pick your own colors', 'wp-module-onboarding' )}
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
};

export default DesignColorsPanel;
