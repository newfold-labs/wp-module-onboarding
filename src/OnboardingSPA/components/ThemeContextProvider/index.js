import { useState, useEffect, createContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../store';
import { THEME_DARK, THEME_LIGHT } from '../../../constants';

const ThemeContext = createContext();

function usePreferredColorScheme() {
	const { sitegenThemeMode } = useSelect( ( select ) => {
		return {
			sitegenThemeMode:
				select( nfdOnboardingStore ).getSitegenThemeMode(),
		};
	} );

	if ( sitegenThemeMode ) {
		return sitegenThemeMode;
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
	const preferredColorScheme = usePreferredColorScheme();
	const [ theme, setTheme ] = useState( preferredColorScheme );

	const { setSitegenThemeMode } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		const colorSchemeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);

		const handleChange = ( event ) => {
			const newTheme = event.matches ? THEME_DARK : THEME_LIGHT;
			setTheme( newTheme );
			setSitegenThemeMode( newTheme );
		};

		colorSchemeMediaQuery.addEventListener( 'change', handleChange );

		return () => {
			colorSchemeMediaQuery.removeEventListener( 'change', handleChange );
		};
	}, [ setSitegenThemeMode ] );

	useEffect( () => {
		// This effect will only run once, after the initial render.
		setSitegenThemeMode( preferredColorScheme );
	}, [ preferredColorScheme, setSitegenThemeMode ] );

	const toggleTheme = () => {
		setTheme( ( prevTheme ) => {
			const newTheme =
				prevTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
			setSitegenThemeMode( newTheme );
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
