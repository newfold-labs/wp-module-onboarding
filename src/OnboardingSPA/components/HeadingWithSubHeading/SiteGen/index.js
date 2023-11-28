/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 */

import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

const HeadingWithSubHeading = ( { title, subtitle } ) => {
	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	} );

	return (
		<div className="nfd-onboarding-step__heading">
			<h2 className="nfd-onboarding-step__heading__title">{ title }</h2>
			{ subtitle && (
				<h3 className="nfd-onboarding-step__heading__subtitle">
					{ subtitle }
					<div
						style={ {
							display: 'inline-flex',
							width: '20px',
							height: '20px',
							marginBottom: '-2px',
							marginRight: '2px',
							backgroundImage: 'var(--nfd-onboarding-icon)',
							backgroundSize: 'contain',
						} }
					></div>
					{ brandName }
				</h3>
			) }
		</div>
	);
};

export default HeadingWithSubHeading;
