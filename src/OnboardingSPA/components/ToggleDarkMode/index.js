import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';

const ToggleDarkMode = () => {
	const { toggleTheme } = useContext( ThemeContext );
	const onChange = () => {
		toggleTheme();
	};

	return (
		<div className="nfd-onboarding-toggle__darkmode">
			<div
				className="nfd-onboarding-toggle__darkmode__button"
				onClick={ () => onChange() }
				role="button"
				onKeyDown={ ( event ) => {
					if ( event.key === 'Enter' ) {
						onChange();
					}
				} }
				tabIndex="0"
			></div>
		</div>
	);
};

export default ToggleDarkMode;
