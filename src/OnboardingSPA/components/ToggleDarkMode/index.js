import { useContext } from '@wordpress/element';
import { ThemeContext } from '../ThemeContextProvider';
import classNames from 'classnames';
import { THEME_DARK } from '../../../constants';

const ToggleDarkMode = () => {
	const { theme, toggleTheme } = useContext( ThemeContext );
	const isDarkMode = theme === THEME_DARK;
	const onChange = () => {
		toggleTheme();
	};

	return (
		<div className="nfd-onboarding-toggle__theme">
			<div
				className={ classNames(
					'nfd-onboarding-toggle__theme__button',
					{
						'nfd-onboarding-toggle__theme__button__light':
							! isDarkMode,
						'nfd-onboarding-toggle__theme__button__dark':
							isDarkMode,
					}
				) }
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
