import CommonLayout from '../../../components/Layouts/Common';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import StartSetup from '../../../components/StartSetup';

const StepGetStarted = () => {
	const location = useLocation();

	useEffect(() => {}, [location]);

	return (
		<CommonLayout isBgPrimary isCentered>
			<StartSetup/>
		</CommonLayout>
	);
};

export default StepGetStarted;
