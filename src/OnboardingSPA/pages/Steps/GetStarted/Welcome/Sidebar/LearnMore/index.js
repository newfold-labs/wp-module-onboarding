import { useSelect } from '@wordpress/data';
import { lazy } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../../../../store';
import getContents from './contents';

const IllustrationPanel = lazy( () =>
	import(
		'../../../../../../components/Sidebar/components/LearnMore/IllustrationPanel'
	)
);
const InfoPanel = lazy( () =>
	import(
		'../../../../../../components/Sidebar/components/LearnMore/InfoPanel'
	)
);
const HelpPanel = lazy( () =>
	import(
		'../../../../../../components/Sidebar/components/LearnMore/HelpPanel'
	)
);
const ButtonBlue = lazy( () =>
	import( '../../../../../../components/Button/ButtonBlue' )
);
const ButtonWhite = lazy( () =>
	import( '../../../../../../components/Button/ButtonWhite' )
);
const SupportLink = lazy( () =>
	import(
		'../../../../../../components/Sidebar/components/LearnMore/SupportLink'
	)
);
const StepIntroPanel = lazy( () =>
	import(
		'../../../../../../components/Sidebar/components/LearnMore/StepIntroPanel'
	)
);

const LearnMore = () => {
	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	} );

	const content = getContents( brandName );

	return (
		<div className="nfd-onboarding-sidebar-learn-more__get-started-welcome">
			<StepIntroPanel
				heading={ content.heading }
				subheading={ content.subheading }
				icon={ content.icon }
			/>
			<IllustrationPanel cssIcon={ content.illustration.icon } />
			<InfoPanel
				headingWithDescriptions={ content.headingWithDescriptions }
			/>
			<HelpPanel>
				<ButtonBlue text={ content.experts.text } />
				<ButtonWhite text={ content.fullService.text } />
				<SupportLink text={ content.support.text } />
			</HelpPanel>
		</div>
	);
};

export default LearnMore;
