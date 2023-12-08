import { useSelect } from '@wordpress/data';
import { lazy } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../../../store';
import getContents from './contents';

const InfoPanel = lazy( () =>
	import(
		'../../../../../components/Sidebar/components/Customize/DesignFontsPanel'
	)
);
const StepIntroPanel = lazy( () =>
	import(
		'../../../../../components/Sidebar/components/Customize/DesignColorsPanel'
	)
);

const Customize = () => {
	// eslint-disable-next-line no-unused-vars
	const { techSupportLink, fullServiceCreativeTeamLink, brandConfig } =
		useSelect( ( select ) => {
			return {
				techSupportLink:
					select( nfdOnboardingStore ).getTechSupportUrl(),
				fullServiceCreativeTeamLink:
					select(
						nfdOnboardingStore
					).getfullServiceCreativeTeamUrl(),
				brandConfig:
					select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			};
		} );

	const content = getContents( techSupportLink, fullServiceCreativeTeamLink );
	return (
		<div className="nfd-onboarding-sidebar-learn-more__design-colors">
			<StepIntroPanel
				heading={ content.introduction.heading }
				subheading={ content.introduction.subheading }
				icon={ content.introduction.icon }
			/>
			<InfoPanel
				headingWithDescriptions={
					content.information.headingWithDescriptions
				}
			/>
		</div>
	);
};

export default Customize;
