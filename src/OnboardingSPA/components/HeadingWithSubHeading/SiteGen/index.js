/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 */

const HeadingWithSubHeading = ( { title, subtitle } ) => {
	return (
		<div className="nfd-onboarding-step__heading">
			<h2 className="nfd-onboarding-step__heading__title">{ title }</h2>
			{ subtitle && (
				<div className="nfd-onboarding-step__heading__subtitle">
					{ subtitle }
					<div className="nfd-onboarding-step__heading__icon"></div>
				</div>
			) }
		</div>
	);
};

export default HeadingWithSubHeading;
