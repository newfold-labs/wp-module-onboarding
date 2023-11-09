import CommonLayout from '../../Layouts/Common';
import HeadingWithSubHeading from '../../HeadingWithSubHeading';
import NeedHelpTag from '../../NeedHelpTag';

const StepErrorState = ( { title, subtitle, error } ) => {
	return (
		<CommonLayout className="step-error-state" isVerticallyCentered>
			<HeadingWithSubHeading title={ title } subtitle={ subtitle } />
			<div className="step-error-state__logo"></div>
			<h3 className="step-error-state__error">{ error }</h3>
			<NeedHelpTag />
		</CommonLayout>
	);
};

export default StepErrorState;
