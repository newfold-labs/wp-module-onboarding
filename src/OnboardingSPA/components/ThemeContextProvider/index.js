import { useState, useEffect, createContext } from '@wordpress/element';
import { THEME_DARK, THEME_LIGHT } from '../../../constants';

const ThemeContext = createContext();

function getPreferredColorScheme() {
	const storedTheme = window.localStorage.getItem( 'nfd-sitegen-theme-mode' );
	if ( storedTheme ) {
		return storedTheme;
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
	const [ theme, setTheme ] = useState( getPreferredColorScheme );

	useEffect( () => {
		const colorSchemeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);

		const handleChange = ( event ) => {
			const newTheme = event.matches ? THEME_DARK : THEME_LIGHT;
			setTheme( newTheme );
			window.localStorage.setItem( 'nfd-sitegen-theme-mode', newTheme );
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
			window.localStorage.setItem( 'nfd-sitegen-theme-mode', newTheme );
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
