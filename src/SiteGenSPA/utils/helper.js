import { useContext } from '@wordpress/element';
import { ThemeContext } from '../components/ThemeContextProvider';

export const addThemeSuffix = ( className ) => {
	/* eslint-disable react-hooks/rules-of-hooks */
	const { theme } = useContext( ThemeContext );
	const themeState = 'nfd-sitegen-light-mode' === theme ? true : false;
	return themeState ? className : `${ className } ${ className }--dark`;
};
