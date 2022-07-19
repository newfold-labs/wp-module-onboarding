import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { VIEW_DESIGN_HEADER_MENU } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepDesignHeaderMenu = () => {
	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_DESIGN_HEADER_MENU );
	}, [] );
	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepDesignHeaderMenu;
