import classNames from 'classnames';
import { useContext } from '@wordpress/element';
import { THEME_LIGHT } from '../../../../constants';
import { ThemeContext } from '../../ThemeContextProvider';

/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 */

const HeadingWithSubHeading = ( { title, subtitle } ) => {
	const themeContext = useContext( ThemeContext );
	const theme = themeContext?.theme || false;

	return (
		<div className="nfd-onboarding-step__heading">
			<h2 className="nfd-onboarding-step__heading__title">{ title }</h2>
			{ subtitle && (
				<div className="nfd-onboarding-step__heading__subtitle">
					{ subtitle }
					<div
						className={ classNames(
							'nfd-onboarding-step__heading__icon',
							theme === THEME_LIGHT
								? 'nfd-onboarding-step__heading__icon--light'
								: null
						) }
					></div>
				</div>
			) }
		</div>
	);
};

export default HeadingWithSubHeading;
