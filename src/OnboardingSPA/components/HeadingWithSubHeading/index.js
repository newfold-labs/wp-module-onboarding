/**
 * Interface Cards with standard design.
 *
 * @returns
 */
const HeadingWithSubHeading = ({ title, subtitle, isColoredSubheading }) => {
	return (
		<div>
			<h2 className="heading-title">{title}</h2>
			<h3 className={ isColoredSubheading == "false" ? "heading-subtitle" : "heading-mainsubtitle"}>{subtitle}</h3>
		</div>
	);
};

export default HeadingWithSubHeading;
