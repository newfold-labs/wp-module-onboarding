import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect, useRef } from '@wordpress/element';
import classNames from 'classnames';

import { store as nfdOnboardingStore } from '../../../store';
import { getThemeFonts } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_TYPOGRAPHY_SELECTED } from '../../../utils/analytics/hiive/constants';

const DesignTypography = () => {
	const drawerFontOptions = useRef();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ selectedFont, setSelectedFont ] = useState();
	const [ fontPalettes, setFontPalettes ] = useState();

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

	const getFontStylesAndPatterns = async () => {
		const fonts = await getThemeFonts();
		if ( fonts?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setFontPalettes( fonts?.body );

		const stylesCustom = storedPreviewSettings?.settings?.styles[ 0 ]?.css;
		if ( stylesCustom ) {
			// Loads in all CSS variables related to fontFamily
			const regex = /--wp--preset--font-family.*;/;
			drawerFontOptions.current.setAttribute(
				'style',
				stylesCustom.match( regex )
			);
		}
		setIsLoaded( true );
	};

	useEffect( () => {
		if (
			currentData?.data?.fontStyle !== '' &&
			fontPalettes !== undefined
		) {
			setSelectedFont( currentData?.data?.fontStyle );
			handleClick( currentData?.data?.fontStyle );
		}
	}, [ fontPalettes, storedPreviewSettings ] );

	useEffect( () => {
		if ( ! isLoaded && THEME_STATUS_ACTIVE === themeStatus ) {
			getFontStylesAndPatterns();
		}
	}, [ isLoaded, themeStatus ] );

	const handleClick = async ( fontStyle, context = 'click' ) => {
		if ( selectedFont === fontStyle ) {
			return true;
		}
		setSelectedFont( fontStyle );

		// Changes the Global Styles to Recompute css properties
		const globalStylesCopy = storedPreviewSettings;
		const fontPalettesCopy = fontPalettes;

		if (
			globalStylesCopy?.styles?.typography?.fontFamily &&
			globalStylesCopy?.styles?.blocks[ 'core/heading' ]?.typography
				?.fontFamily
		) {
			globalStylesCopy.styles.typography.fontFamily =
				fontPalettesCopy[ fontStyle ]?.styles?.typography?.fontFamily;
			globalStylesCopy.styles.blocks[
				'core/heading'
			].typography.fontFamily =
				fontPalettesCopy[ fontStyle ]?.styles.blocks[
					'core/heading'
				].typography.fontFamily;
		}

		if (
			globalStylesCopy.styles?.blocks[ 'core/site-title' ]?.typography
				?.fontFamily
		) {
			globalStylesCopy.styles.blocks[
				'core/site-title'
			].typography.fontFamily =
				fontPalettesCopy[ fontStyle ]?.styles.blocks[
					'core/heading'
				].typography.fontFamily;
		}

		if (
			globalStylesCopy.styles?.blocks[ 'core/site-tagline' ]?.typography
				?.fontFamily
		) {
			globalStylesCopy.styles.blocks[
				'core/site-tagline'
			].typography.fontFamily =
				fontPalettesCopy[ fontStyle ]?.styles.blocks[
					'core/heading'
				].typography.fontFamily;
		}

		// Saves the data to the Store
		currentData.data.fontStyle = fontStyle;

		updatePreviewSettings(
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( globalStylesCopy, storedPreviewSettings )
		);
		setCurrentOnboardingData( currentData );
		if ( 'click' === context ) {
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_TYPOGRAPHY_SELECTED, fontStyle )
			);
		}
	};

	function buildPalettes() {
		return Object.keys( fontPalettes ).map( ( fontStyle, idx ) => {
			const splitLabel = fontPalettes[ fontStyle ]?.label.split( '&', 2 );
			if ( splitLabel.length === 0 ) {
				return null;
			}
			return (
				<div
					key={ fontStyle }
					role="button"
					tabIndex={ idx + 1 }
					className={ classNames(
						'font-palette drawer-palette--button',
						{
							'font-palette-selected drawer-palette--button--selected':
								selectedFont === fontStyle,
						}
					) }
					onClick={ () => handleClick( fontStyle ) }
					onKeyDown={ () => handleClick( fontStyle ) }
				>
					<div
						className="font-palette__icon drawer-palette--button__text"
						style={ {
							fontFamily:
								fontPalettes[ fontStyle ]?.styles?.typography
									?.fontFamily,
						} }
					>
						Aa
					</div>
					<div className="font-palette__name drawer-palette--button__text">
						<span
							style={ {
								fontFamily:
									fontPalettes[ fontStyle ]?.styles.blocks[
										'core/heading'
									].typography.fontFamily,
							} }
						>
							{ splitLabel[ 0 ] }
						</span>
						{ splitLabel[ 1 ] ? '&' : '' }
						<span
							style={ {
								fontFamily:
									fontPalettes[ fontStyle ]?.styles
										?.typography?.fontFamily,
							} }
						>
							{ splitLabel[ 1 ] ?? '' }
						</span>
					</div>
				</div>
			);
		} );
	}

	return (
		<div ref={ drawerFontOptions } className="theme-fonts--drawer">
			<h2>{ __( 'Font Palettes', 'wp-module-onboarding' ) }</h2>
			{ fontPalettes && buildPalettes() }
		</div>
	);
};
export default DesignTypography;
