import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { VIEW_NAV_GET_STARTED } from '../../../../constants';

const StepGetStarted = () => {
	const location = useLocation();

	const { setIsSidebarOpened } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
	}, [] );

	useEffect( () => {}, [ location ] );

	const { setDrawerActiveView, setIsDrawerOpened } =
		useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(false);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard />
		</CommonLayout>
	);
};

export default StepGetStarted;
