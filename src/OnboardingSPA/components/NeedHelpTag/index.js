import { store as nfdOnboardingStore } from '../../store';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Need Help Label and URL rendering component for most of the onboarding steps
 * Pass any Label and URL redirect which we want as is to display on the UI
 *
 * @param content
 * @return NeedHelpTag
 */

const NeedHelpTag = ( {
	question = __( 'Need Help?', 'wp-module-onboarding' ),
	urlLabel = __( 'Hire our Experts', 'wp-module-onboarding' ),
} ) => {
	const hireExpertsUrl = select( nfdOnboardingStore ).getHireExpertsUrl();

	return (
		hireExpertsUrl && (
			<div className="nfd-card-need-help-tag">
				{ question }
				<a href={ hireExpertsUrl } target={ '_blank' } rel="noreferrer">
					{ urlLabel }
				</a>
			</div>
		)
	);
};

export default NeedHelpTag;
