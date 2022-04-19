import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

const StepGetStarted = () => {
	const location = useLocation();

	useEffect(() => {}, [location]);

	return (
		<CommonLayout isBgPrimary isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepGetStarted;
