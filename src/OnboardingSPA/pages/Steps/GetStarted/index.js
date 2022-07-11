import CommonLayout from '../../../components/Layouts/Common';
import { store as nfdOnboardingStore } from '../../../store';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@wordpress/data';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';

const StepGetStarted = () => {
	const location = useLocation();

     const { setDrawerActiveView, setIsDrawerOpened } =
     useDispatch(nfdOnboardingStore);

     useEffect(() => {
          setIsDrawerOpened(true);
          setDrawerActiveView('nav-get-started');
     }, []);

	useEffect(() => {}, [location]);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard/>
		</CommonLayout>
	);
};

export default StepGetStarted;
