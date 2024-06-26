import { useState, useEffect, createContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../store';
import { setFlow } from '../../utils/api/flow';
import { THEME_DARK, THEME_LIGHT } from '../../../constants';

const ThemeContext = createContext();

function usePreferredColorScheme( currentData ) {
	if ( currentData.sitegenThemeMode ) {
		return currentData.sitegenThemeMode;
	}

	if (
		window.matchMedia &&
		window.matchMedia( '(prefers-color-scheme: dark)' ).matches
	) {
		return THEME_DARK;
	}

	return THEME_LIGHT;
}

const ThemeProvider = ( { children } ) => {
	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const preferredColorScheme = usePreferredColorScheme( currentData );
	const [ theme, setTheme ] = useState( preferredColorScheme );
	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		const colorSchemeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);

		const handleChange = ( event ) => {
			const newTheme = event.matches ? THEME_DARK : THEME_LIGHT;
			setTheme( newTheme );
			currentData.sitegenThemeMode = newTheme;
			setCurrentOnboardingData( currentData );
			setFlow( currentData );
		};

		colorSchemeMediaQuery.addEventListener( 'change', handleChange );

		return () => {
			colorSchemeMediaQuery.removeEventListener( 'change', handleChange );
		};
	}, [] );

	const toggleTheme = () => {
		setTheme( ( prevTheme ) => {
			const newTheme =
				prevTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
			currentData.sitegenThemeMode = newTheme;
			setCurrentOnboardingData( currentData );
			setFlow( currentData );
			return newTheme;
		} );
	};

	return (
		<ThemeContext.Provider value={ { theme, toggleTheme } }>
			{ children }
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
