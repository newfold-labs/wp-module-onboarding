import { useState, createContext } from '@wordpress/element';
import { THEME_DARK, THEME_LIGHT } from '../../../constants';

const ThemeContext = createContext();

const ThemeProvider = ( { children } ) => {
	const [ theme, setTheme ] = useState( 'dark' );
	// eslint-disable-next-line no-console
	console.log( 'tests' );

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
