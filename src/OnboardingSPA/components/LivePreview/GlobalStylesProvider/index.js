import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles, setGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import {
	API_REQUEST,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
} from '../../../../constants';

/**
 * Global Style Parent Component
 * The Fetching of Global Style Object from either store or API is
 * common to a lot many places and this component does the trick import { useState, useEffect } from '@wordpress/element';for us.
 *
 * @return Global Style Parent
 */

const GlobalStylesProvider = ( { children } ) => {
	const [ isLoaded, setIsLoaded ] = useState( false );

	const { currentData, storedPreviewSettings, themeStatus } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings:
					select( nfdOnboardingStore ).getPreviewSettings(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			};
		},
		[]
	);

	const { updateThemeStatus, updatePreviewSettings, enqueueRequest } =
		useDispatch( nfdOnboardingStore );

	const getStylesAndPatterns = async () => {
		let selectedGlobalStyle;
		if ( storedPreviewSettings?.title && storedPreviewSettings?.settings )
			selectedGlobalStyle = storedPreviewSettings;
		else {
			const globalStyles = await getGlobalStyles();
			if ( globalStyles?.error ) {
				return updateThemeStatus( THEME_STATUS_INIT );
			}
			if ( currentData.data.theme.variation ) {
				selectedGlobalStyle = globalStyles.body.filter(
					( globalStyle ) =>
						globalStyle.title === currentData.data.theme.variation
				)[ 0 ];
			} else if ( globalStyles.body[ 0 ]?.id === 0 ) {
				selectedGlobalStyle = globalStyles.body[ 0 ];
			}
			updatePreviewSettings(
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useGlobalStylesOutput(
					selectedGlobalStyle,
					storedPreviewSettings
				)
			);
		}

		if ( selectedGlobalStyle ) {
			enqueueRequest( API_REQUEST.SET_GLOBAL_STYLES, () =>
				setGlobalStyles( {
					...selectedGlobalStyle,
					title: currentData.data.theme.variation,
					version: 2,
				} )
			);
		}

		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && THEME_STATUS_ACTIVE === themeStatus )
			getStylesAndPatterns();
	}, [ isLoaded, themeStatus ] );

	return children;
};

export default GlobalStylesProvider;
