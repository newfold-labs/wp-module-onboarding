import CommonLayout from '../../../Common/Layouts/Common';
import HeadingWithSubHeading from './headingwithsubheading';
import getContents from './contents';

const StepSiteGenGetStarted = () => {
	const content = getContents();

	return (
		<CommonLayout>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
		</CommonLayout>
	);
};

export default StepSiteGenGetStarted;
