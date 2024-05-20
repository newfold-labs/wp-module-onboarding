import { useState, useEffect, createContext } from '@wordpress/element';
import { THEME_DARK, THEME_LIGHT } from '../../../constants';

const ThemeContext = createContext();

function getPreferredColorScheme() {
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
			console.log( 'Color matches', event );
			setTheme( event.matches ? THEME_DARK : THEME_LIGHT );
		};

		colorSchemeMediaQuery.addEventListener( 'change', handleChange );

		return () => {
			colorSchemeMediaQuery.removeEventListener( 'change', handleChange );
		};
	}, [] );

	const toggleTheme = () => {
		setTheme( ( prevTheme ) =>
			prevTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK
		);
	};

	return (
		<ThemeContext.Provider value={ { theme, toggleTheme } }>
			{ children }
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
