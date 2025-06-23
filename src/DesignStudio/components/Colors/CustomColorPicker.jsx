/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	__experimentalHStack as HStack,
	Tooltip,
	Button,
	ColorPicker,
	Popover,
} from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useColorSettings from '../../hooks/useColorSettings';

// Helper to find a color by its slug in a palette
const getColorBySlug = ( paletteArray, slug ) => {
	const colorObj = paletteArray?.find( ( c ) => c.slug === slug );
	return colorObj?.color;
};

// Default colors that match WordPress core defaults
const defaultColors = {
	base: '#ffffff', // White background
	contrast: '#000000', // Black text
	primary: '#1a4548', // Dark teal
	secondary: '#3e7276', // Light teal
};

export const customColorOptions = [
	{ slug: 'base', label: __( 'Base', 'nfd-onboarding' ) },
	{ slug: 'contrast', label: __( 'Contrast', 'nfd-onboarding' ) },
	{ slug: 'primary', label: __( 'Primary', 'nfd-onboarding' ) },
	{ slug: 'secondary', label: __( 'Secondary', 'nfd-onboarding' ) },
];

export default function CustomColorPicker() {
	const [ activeColorSlug, setActiveColorSlug ] = useState( null );
	const colorSwatchRefs = useRef( {} );
	const { globalStyles, updateCustomColor } = useColorSettings();

	const handleSwatchClick = ( slug ) => {
		setActiveColorSlug( activeColorSlug === slug ? null : slug );
	};

	return (
		<HStack spacing={ 3 } justify="flex-start">
			{ customColorOptions.map( ( opt ) => {
				const currentColor =
					getColorBySlug( globalStyles?.color?.palette, opt.slug ) || defaultColors[ opt.slug ];

				return (
					<div key={ opt.slug } className="nfd-design-studio-color-option">
						<Tooltip text={ opt.label }>
							<div>
								<Button
									ref={ ( el ) => ( colorSwatchRefs.current[ opt.slug ] = el ) }
									className="nfd-design-studio-color-swatch"
									style={ {
										backgroundColor: currentColor,
									} }
									onClick={ () => handleSwatchClick( opt.slug ) }
									aria-label={ opt.label }
									aria-expanded={ activeColorSlug === opt.slug }
								/>
							</div>
						</Tooltip>
						{ activeColorSlug === opt.slug && (
							<Popover
								anchor={ colorSwatchRefs.current[ opt.slug ] }
								onClose={ () => setActiveColorSlug( null ) }
								position="bottom"
								noArrow={ false }
								offset={ 8 }
								className="nfd-design-studio-color-popover"
							>
								<div className="nfd-design-studio-color-picker-container">
									<ColorPicker
										color={ currentColor }
										onChangeComplete={ ( color ) => updateCustomColor( opt.slug, color.hex ) }
										enableAlpha={ false }
									/>
								</div>
							</Popover>
						) }
					</div>
				);
			} ) }
		</HStack>
	);
}
