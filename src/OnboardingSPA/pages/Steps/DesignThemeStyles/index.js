import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { VIEW_DESIGN_THEME_STYLES } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepDesignThemeStyle = () => {
	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES );
	}, [] );
	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepDesignThemeStyle;
