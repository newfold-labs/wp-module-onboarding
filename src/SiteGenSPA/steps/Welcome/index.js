import CommonLayout from '../../../OnboardingSPA/components/Layouts/Common';
import HeadingWithSubHeading from './headingwithsubheading';
import StartOptions from './startoptions';
import ImportSite from './importsite';
import getContents from './contents';

const StepSiteGenGetStartedWelcome = () => {
	const content = getContents();

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
			<StartOptions
				questionnaire={ content.questionnaire }
				options={ content.options }
			/>
			<ImportSite
				importtext={ content.importtext }
				importlink={ content.importlink }
			/>
		</CommonLayout>
	);
};

export default StepSiteGenGetStartedWelcome;
