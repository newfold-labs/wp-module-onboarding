/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { __experimentalHeading as Heading } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useFontPairings } from '../../hooks/useFontPairings';
import ScreenHeader from '../ScreenHeader';
import FontPairings from '../Typography/FontPairings';

export default function ScreenTypography() {
	const { fontPairings, selectedStyle, handleSelectStyle } = useFontPairings();

	// If no font pairings are available yet, show a message
	if ( fontPairings.length === 0 ) {
		return (
			<>
				<ScreenHeader
					title={ __( 'Typography' ) }
					description={ __( 'Select a font style.', 'wp-module-onboarding' ) }
				/>
				<div className="edit-site-global-styles-sidebar__content">
					<div className="nfd-design-studio-sidebar__section">
						<Heading level={ 3 }>{ __( 'Font Pairings', 'wp-module-onboarding' ) }</Heading>
						<p>{ __( 'No font pairings available.', 'wp-module-onboarding' ) }</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<ScreenHeader
				title={ __( 'Typography' ) }
				description={ __(
					"Choose a font pairing that reflects your brand's personality. Each pairing is carefully selected to enhance readability and visual appeal across your site.",
					'wp-module-onboarding'
				) }
			/>

			<div className="edit-site-global-styles-sidebar__content">
				<div className="nfd-design-studio-sidebar__section">
					<Heading level={ 3 }>{ __( 'Font Pairings', 'wp-module-onboarding' ) }</Heading>
					<FontPairings
						fontPairings={ fontPairings }
						selectedStyle={ selectedStyle }
						onSelectStyle={ handleSelectStyle }
					/>
				</div>
			</div>
		</>
	);
}
