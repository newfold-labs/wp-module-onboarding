import CommonLayout from '../../../components/Layouts/Common';
import { store as nfdOnboardingStore } from '../../../store';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@wordpress/data';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { VIEW_NAV_GET_STARTED, VIEW_NAV_PRIMARY } from '../../../../constants';

const StepGetStarted = () => {
	const location = useLocation();

	useEffect(() => {}, [location]);

	const { setDrawerActiveView, setIsDrawerOpened } =
		useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(false);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard/>
		</CommonLayout>
	);
};

export default StepGetStarted;
