import CommonLayout from '../../Layouts/Common';
import HeadingWithSubHeading from '../../HeadingWithSubHeading';
import NeedHelpTag from '../../NeedHelpTag';

const StepLoader = ( { title, subtitle } ) => {
	return (
		<CommonLayout className="step-loader" isVerticallyCentered>
			<HeadingWithSubHeading title={ title } subtitle={ subtitle } />
			<div className="step-loader__logo-container">
				<div className="step-loader__logo"></div>
			</div>
			<NeedHelpTag />
		</CommonLayout>
	);
};

export default StepLoader;
