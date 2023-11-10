// withThemeToggler.js
import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider'; // Adjust the import path as needed
import classNames from 'classnames';

const themeToggleHOC = (WrappedComponent, darkClass, lightClass) => {
  return (props) => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark'; // Determine if it's dark mode
    // Construct the className with the appropriate theme class
    const className = classNames(
      props.className, // Preserves any class names already provided
      {
        [darkClass]: isDarkMode,
        [lightClass]: !isDarkMode
      }
    );
    
    // Pass the new className and any other props to the wrapped component
    return <WrappedComponent {...props} className={className} />;
  };
};

export default themeToggleHOC;
