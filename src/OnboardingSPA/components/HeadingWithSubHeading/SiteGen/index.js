/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 * @param {Object} root0.brandName
 */
const HeadingWithSubHeading = ( { title, subtitle, brandName } ) => {
	return (
		<div className="nfd-onboarding-step--site-gen__fork__heading">
			<h2 className="nfd-onboarding-step--site-gen__fork__heading__title">
				{ title }
			</h2>
			{ subtitle && (
				<h3 className="nfd-onboarding-step--site-gen__fork__heading__subtitle">
					{ subtitle }
					{ brandName }
				</h3>
			) }
		</div>
	);
};

export default HeadingWithSubHeading;
