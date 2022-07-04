/**
 * Interface Cards with standard design.
 *
 * @returns
 */
const HeadingWithSubHeading = ({ title, subtitle, isColoredSubheading }) => {
	return (
		<div className="nfd-main-heading">
			<h2 className="nfd-main-heading__title">{title}</h2>
			<h3 className={isColoredSubheading == "false" ? "nfd-main-heading__subtitle" : "nfd-main-heading__subtitle-color"}>{subtitle}</h3>
		</div>
	);
};

export default HeadingWithSubHeading;
