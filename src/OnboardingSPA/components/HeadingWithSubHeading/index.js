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
			<h2 className="nfd-main-heading__title">{ title }</h2>
			{ subtitle && (
				<h3 className="nfd-main-heading__subtitle">{ subtitle }</h3>
			) }
			{ children }
		</div>
	);
};

export default HeadingWithSubHeading;
