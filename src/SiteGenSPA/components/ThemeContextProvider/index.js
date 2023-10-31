import { useState, createContext } from '@wordpress/element';

// Create the context directly in the same file
const ThemeContext = createContext();

const ThemeProvider = ( { children } ) => {
	const [ theme, setTheme ] = useState( 'nfd-sitegen-dark-mode' ); // Default theme is light

	const toggleTheme = () => {
		setTheme( ( prevTheme ) =>
			prevTheme === 'nfd-sitegen-dark-mode'
				? 'nfd-sitegen-light-mode'
				: 'nfd-sitegen-dark-mode'
		);
	};

	return (
		<ThemeContext.Provider value={ { theme, toggleTheme } }>
			{ children }
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
