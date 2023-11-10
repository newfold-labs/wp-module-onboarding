import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import classNames from 'classnames';

const themeToggleHOC = ( WrappedComponent, darkClass, lightClass ) => {
	return ( props ) => {
		const { theme } = useContext( ThemeContext );
		const isDarkMode = theme === 'dark';
		const className = classNames( props.className, {
			[ darkClass ]: isDarkMode,
			[ lightClass ]: ! isDarkMode,
		} );

		return <WrappedComponent { ...props } className={ className } />;
	};
};

export default themeToggleHOC;
