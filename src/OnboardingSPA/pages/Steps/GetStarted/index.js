import CommonLayout from '../../../components/Layouts/Common';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { VIEW_NAV_GET_STARTED } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';

const StepGetStarted = () => {
	const location = useLocation();

	useEffect(() => {}, [location]);

	const { setDrawerActiveView, setIsDrawerOpened } =
		useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard/>
		</CommonLayout>
	);
};

export default StepGetStarted;
