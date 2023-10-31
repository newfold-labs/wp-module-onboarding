import { ToggleControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import getContents from './contents';

const ToggleDarkMode = () => {
	const { theme, toggleTheme } = useContext( ThemeContext );
	const isChecked = theme === 'nfd-sitegen-dark-mode';
	const content = getContents();
	const onChange = () => {
		toggleTheme();
	};

	return (
		<div className="nfd-sitegen-darkmode-wrapper">
			<ToggleControl
				label={ content.label }
				checked={ isChecked }
				onChange={ onChange }
			/>
		</div>
	);
};

export default ToggleDarkMode;
