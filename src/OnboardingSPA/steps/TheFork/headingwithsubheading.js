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
		<div className="nfd-onboarding-step--site-gen__fork__heading">
			<h2 className="nfd-onboarding-step--site-gen__fork__heading__title">{ title }</h2>
			{ subtitle && (
				<h3 className="nfd-onboarding-step--site-gen__fork__heading__subtitle">{ subtitle }</h3>
			) }
			{ children }
		</div>
	);
};

export default HeadingWithSubHeading;
