import { lazy } from '@wordpress/element';

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
	const content = getContents();

	return (
		<div className="nfd-onboarding-sidebar-learn-more__get-started-wp-experience">
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
				<ButtonWhite text={ content.fullService.text } />
				<SupportLink text={ content.support.text } />
			</HelpPanel>
		</div>
	);
};

export default LearnMore;
