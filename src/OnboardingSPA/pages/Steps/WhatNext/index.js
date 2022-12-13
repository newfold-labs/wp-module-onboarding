import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { SIDEBAR_LEARN_MORE } from '../../../../constants';

const StepWhatNext = () => {
	const { setIsDrawerOpened, setSidebarActiveView, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsDrawerOpened( false );
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	return (
		<CommonLayout isCentered isBgPrimary>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepWhatNext;
