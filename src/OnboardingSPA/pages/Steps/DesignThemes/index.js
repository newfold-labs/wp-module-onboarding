import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { SIDEBAR_LEARN_MORE, VIEW_DESIGN_THEMES } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepDesignThemes = () => {
	const { setDrawerActiveView, setIsDrawerOpened, setSidebarActiveView, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_DESIGN_THEMES );
		setIsHeaderNavigationEnabled( true );
	}, [] );
	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepDesignThemes;
