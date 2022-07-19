import { __ } from '@wordpress/i18n';

/**
 * Interface Cards with standard design.
 *
 * @returns
 */
const HeadingWithSubHeading = ({ title, subtitle, isColoredSubheading }) => {

	const isColored = isColoredSubheading ?? "false";
	return (
		<div className="nfd-main-heading">
			<h2 className="nfd-main-heading__title">{__(
				title,
				"wp-module-onboarding"
			)}</h2>
			<h3 className={ isColored == "false" ? "nfd-main-heading__subtitle" : "nfd-main-headin__subtitle-color"}>{__(
				subtitle,
				"wp-module-onboarding"
			)}</h3>
		</div>
	);
};

export default HeadingWithSubHeading;
