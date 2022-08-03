import { __ } from '@wordpress/i18n';

/**
 * Interface Cards with standard design.
 *
 * @returns
 */
const HeadingWithSubHeading = ({ title, subtitle }) => {

	return (
		<div className="nfd-main-heading">
			<h2 className="nfd-main-heading__title">{__(
				title,
				"wp-module-onboarding"
			)}</h2>
			<h3 className="nfd-main-heading__subtitle">{__(
				subtitle,
				"wp-module-onboarding"
			)}</h3>
		</div>
	);
};

export default HeadingWithSubHeading;
