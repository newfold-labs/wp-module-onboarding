import { ToggleControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import getContents from './contents';

const ToggleDarkMode = () => {
	const { theme, toggleTheme } = useContext( ThemeContext );
	const isChecked = theme === 'dark';
	const content = getContents();
	const onChange = () => {
		console.log("theme", theme);
		toggleTheme();
	};

	return (
		<div className="nfd-onboarding-toggle__darkmode">
			<ToggleControl
				label={ content.label }
				checked={ isChecked }
				onChange={ onChange }
			/>
		</div>
	);
};

export default ToggleDarkMode;
