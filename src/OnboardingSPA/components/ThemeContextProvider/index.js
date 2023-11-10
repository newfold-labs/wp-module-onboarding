import { useState, createContext } from '@wordpress/element';

// Create the context directly in the same file
const ThemeContext = createContext();

const ThemeProvider = ( { children } ) => {
	const [ theme, setTheme ] = useState( 'dark' ); // Default theme is light

	const toggleTheme = () => {
		setTheme( ( prevTheme ) =>
			prevTheme === 'dark'
				? 'light'
				: 'dark'
		);
	};

	return (
		<ThemeContext.Provider value={ { theme, toggleTheme } }>
			{ children }
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
