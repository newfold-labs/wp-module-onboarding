import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import classNames from 'classnames';
import { THEME_DARK } from '../../../constants';

const themeToggleHOC = (
	WrappedComponent,
	darkClass,
	lightClass,
	isForkStep = true
) => {
	return ( props ) => {
		// console.log(props);
		const { theme } = useContext( ThemeContext );
		const isDarkMode = theme === THEME_DARK;
		const shouldApply = isForkStep !== undefined ? isForkStep : true;
		const className = classNames( props.className, {
			[ darkClass ]: isDarkMode && shouldApply,
			[ lightClass ]: ! isDarkMode && shouldApply,
		} );

		return <WrappedComponent { ...props } className={ className } />;
	};
};

export default themeToggleHOC;
