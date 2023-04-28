import { __ } from '@wordpress/i18n';

/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 * @param {Object} root0.children
 */
const HeadingWithSubHeading = ( { title, subtitle, children } ) => {
	return (
		<div className="nfd-main-heading">
			<h2 className="nfd-main-heading__title">
				{ /* eslint-disable-next-line @wordpress/i18n-no-variables */ }
				{ __( title, 'wp-module-onboarding' ) }
			</h2>
			{ subtitle && (
				<h3 className="nfd-main-heading__subtitle">
					{ /* eslint-disable-next-line @wordpress/i18n-no-variables */ }
					{ __( subtitle, 'wp-module-onboarding' ) }
				</h3>
			) }
			{ children }
		</div>
	);
};

export default HeadingWithSubHeading;
