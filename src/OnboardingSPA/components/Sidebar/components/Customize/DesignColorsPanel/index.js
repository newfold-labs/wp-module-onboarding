import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import ColorPickerButton from '../../../../ColorPickerButton';
import { design, colorPalettes } from '../data';
import ColorPaletteIcon from './ColorPaletteIcon';
import CustomColorPalette from './CustomColorPalette';
import './stylesheet.scss';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useGlobalStylesOutput } from '../../../../../utils/global-styles/use-global-styles-output';

const DesignColorsPanel = ( {
	baseClassName = 'nfd-onboarding-sidebar-customize--design-colors-panel',
	heading,
} ) => {
	const palettePrimaryColors = Object.entries( design.color_palette ).map(
		( [ , color ] ) => ( {
			name: 'Custom',
			color,
		} )
	);

	const defaultColors = {
		primary: design.color_palette.primary,
		secondary: design.color_palette.secondary,
		tertiary: design.color_palette.tertiary,
	};
	const palette1 = {
		primary: colorPalettes[ 1 ].primary,
		secondary: colorPalettes[ 1 ].secondary,
		tertiary: colorPalettes[ 1 ].tertiary,
	};
	const palette2 = {
		primary: colorPalettes[ 2 ].primary,
		secondary: colorPalettes[ 2 ].secondary,
		tertiary: colorPalettes[ 2 ].tertiary,
	};
	const palette3 = {
		primary: colorPalettes[ 3 ].primary,
		secondary: colorPalettes[ 3 ].secondary,
		tertiary: colorPalettes[ 3 ].tertiary,
	};

	const [ colors ] = useState( [
		defaultColors,
		palette1,
		palette2,
		palette3,
	] );

	const [ selectedColor, setSelectedColor ] = useState( palette1 );
	const [ showCustomColors, setShowCustomColors ] = useState( false );
	const [ selectedPalette, setSelectedPalette ] = useState( 1 );
	const [ colorPickerCalledBy, setColorPickerCalledBy ] = useState( '' );
	const [ showColorPicker, setShowColorPicker ] = useState( false );

	const paletteSecondaryColors = Object.entries( colorPalettes[ 1 ] )
		.map( ( [ name, color ] ) => {
			if ( name !== 'name' ) {
				return {
					name: 'Custom',
					color,
				};
			}
			return null;
		} )
		.filter( Boolean );

	const handleApplyCustomColors = () => {
		colors[ selectedPalette ] = selectedColor;
		setShowCustomColors( false );
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

	const { storedPreviewSettings } = useSelect( ( select ) => {
		return {
			storedPreviewSettings:
				select( nfdOnboardingStore ).getAiPreviewSettings(),
		};
	}, [] );

	const { updateAiPreviewSettings } = useDispatch( nfdOnboardingStore );

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
		const selectedGlobalStyle = { ...storedPreviewSettings };
		if ( selectedGlobalStyle?.settings?.color?.palette ) {
			colorPalettes[ selectedPalette ].primary = selectedColor.primary;
			colorPalettes[ selectedPalette ].secondary =
				selectedColor.secondary;
			colorPalettes[ selectedPalette ].tertiary = selectedColor.tertiary;
			selectedGlobalStyle.settings.color.palette = convertColorSchema(
				colorPalettes[ selectedPalette ]
			);
			updateAiPreviewSettings(
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);
		}
	};

	useEffect( () => {
		handleUpdatePreviewSettings();
	}, [ selectedColor, selectedPalette ] );

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
							{ colors.map( ( elem, idx ) => (
								<ColorPaletteIcon
									key={ idx }
									idx={ idx }
									label={ idx === 0 ? 'Default' : '' }
									selectedPalette={ selectedPalette }
									setSelectedPalette={ setSelectedPalette }
									setSelectedColor={ setSelectedColor }
									colors={ colors }
								/>
							) ) }
						</div>
					</div>
				</div>
			</PanelRow>
			<PanelRow>
				{ showCustomColors ? (
					<div
						className={ `${ baseClassName }__custom__colors__container` }
					>
						<h5 className={ `${ baseClassName }__heading` }>
							CUSTOM COLORS
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
											colorType
												.charAt( 0 )
												.toUpperCase() +
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
								onClick={ () => setShowCustomColors( false ) }
								className={ 'cancel' }
							>
								Cancel
							</Button>
							<Button
								onClick={ handleApplyCustomColors }
								variant="primary"
							>
								Apply
							</Button>
						</div>

						{ showColorPicker && (
							<CustomColorPalette
								onChange={ handleColorPicker }
								palettePrimaryColors={ palettePrimaryColors }
								paletteSecondaryColors={
									paletteSecondaryColors
								}
							/>
						) }
					</div>
				) : (
					<div
						className={ `${ baseClassName }__custom__colors__button__container` }
					>
						<Button onClick={ () => setShowCustomColors( true ) }>
							Pick your own colors
						</Button>
					</div>
				) }
			</PanelRow>
		</PanelBody>
	);
};

export default DesignColorsPanel;
