/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { __experimentalHeading as Heading, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useColorSettings from '../../hooks/useColorSettings';
import ColorPalette from '../Colors/ColorPalette';
import CustomColorPicker from '../Colors/CustomColorPicker';
import ScreenHeader from '../ScreenHeader';

export default function ScreenColors() {
	const [ isUsingCustomPalette, setIsUsingCustomPalette ] = useState( false );
	const { settings, globalStyles, updatePalette, updateCustomColor } = useColorSettings();

	const handlePaletteChange = ( paletteArray ) => {
		updatePalette( paletteArray );
		setIsUsingCustomPalette( false );
	};

	return (
		<>
			<ScreenHeader
				title={ __( 'Colors', 'nfd-onboarding' ) }
				description={ __( 'Select a palette or customize individual colors.', 'nfd-onboarding' ) }
			/>
			<div className="nfd-design-studio-sidebar__content">
				<div className="nfd-design-studio-sidebar__section">
					<Heading level={ 3 }>{ __( 'Palette', 'nfd-onboarding' ) }</Heading>
					<ColorPalette onChange={ handlePaletteChange } globalStyles={ globalStyles } />
				</div>
				<div className="nfd-design-studio-sidebar__section">
					<ToggleControl
						label={ __( 'Pick custom colors', 'nfd-onboarding' ) }
						checked={ isUsingCustomPalette }
						onChange={ ( isChecked ) => {
							setIsUsingCustomPalette( isChecked );
						} }
						className="nfd-design-studio-custom-palette-toggle"
						__nextHasNoMarginBottom={ true }
					/>
					{ isUsingCustomPalette && (
						<CustomColorPicker settings={ settings } onColorChange={ updateCustomColor } />
					) }
				</div>
			</div>
		</>
	);
}
