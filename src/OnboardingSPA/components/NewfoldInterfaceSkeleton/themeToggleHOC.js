import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import classNames from 'classnames';

const themeToggleHOC = (
	WrappedComponent,
	darkClass,
	lightClass,
	shouldApplyTheme = true
) => {
	return ( props ) => {
		const { theme } = useContext( ThemeContext );
		const isDarkMode = theme === 'dark';
		const shouldApply =
			shouldApplyTheme !== undefined ? shouldApplyTheme : true;
		const className = classNames( props.className, {
			[ darkClass ]: isDarkMode && shouldApply,
			[ lightClass ]: ! isDarkMode && shouldApply,
		} );

		return <WrappedComponent { ...props } className={ className } />;
	};
};

export default themeToggleHOC;
