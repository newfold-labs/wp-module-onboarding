/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useColorSettings from '../hooks/useColorSettings';
import { useTypographyUpdate } from '../hooks/useTypographyUpdate';

// Helper function to get color by slug from palette
const getColorBySlug = ( palette, slug ) => {
	const colorObj = palette?.find( ( c ) => c.slug === slug );
	return colorObj?.color || null;
};

// Helper function to get font family from global styles
const getFontFamilyValue = ( fontFamily ) => {
	if ( ! fontFamily ) {
		return 'inherit';
	}

	// If it's a CSS variable, convert it to the actual font family
	if ( typeof fontFamily === 'string' && fontFamily.startsWith( 'var:preset|font-family|' ) ) {
		const slug = fontFamily.replace( 'var:preset|font-family|', '' );
		return slug === 'system' ? 'system-ui, sans-serif' : 'inherit';
	}

	return fontFamily;
};

/**
 * Style preview card component
 */
export default function StylePreviewCard() {
	const { settings } = useColorSettings();
	const { globalStyles } = useTypographyUpdate();

	// Get color palette
	const themePalette = settings?.color?.palette?.theme || [];

	// Get colors by slug
	const baseColor = getColorBySlug( themePalette, 'base' ) || '#ffffff';
	const contrastColor = getColorBySlug( themePalette, 'contrast' ) || '#000000';
	const primaryColor = getColorBySlug( themePalette, 'accent_2' ) || '#1a4548';
	const secondaryColor = getColorBySlug( themePalette, 'accent_5' ) || '#3e7276';

	// Get typography settings
	const headingFontFamily = getFontFamilyValue(
		globalStyles?.typography?.elements?.heading?.typography?.fontFamily
	);
	const bodyFontFamily = getFontFamilyValue( globalStyles?.typography?.fontFamilies );

	const previewStyle = {
		backgroundColor: baseColor,
		color: contrastColor,
	};

	const textStyle = {
		fontFamily: headingFontFamily || 'serif',
		color: contrastColor,
	};

	const smallTextStyle = {
		fontFamily: bodyFontFamily || 'sans-serif',
		color: contrastColor,
	};

	return (
		<div className="nfd-design-studio-style-preview" style={ previewStyle }>
			<div className="nfd-design-studio-style-preview-text">
				<h2 style={ textStyle }>
					A<span style={ smallTextStyle }>a</span>
				</h2>
			</div>
			<div className="nfd-design-studio-style-preview-dots">
				<div
					className="nfd-design-studio-style-preview-dot"
					style={ { backgroundColor: primaryColor } }
					aria-label={ __( 'Primary color', 'wp-module-onboarding' ) }
				/>
				<div
					className="nfd-design-studio-style-preview-dot"
					style={ { backgroundColor: secondaryColor } }
					aria-label={ __( 'Secondary color', 'wp-module-onboarding' ) }
				/>
			</div>
		</div>
	);
}
