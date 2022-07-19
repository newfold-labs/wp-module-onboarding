import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';

const StepGetStarted = () => {
	const location = useLocation();

	const { setIsSidebarOpened } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
	}, [] );

	useEffect( () => {}, [ location ] );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard />
		</CommonLayout>
	);
};

export default StepGetStarted;