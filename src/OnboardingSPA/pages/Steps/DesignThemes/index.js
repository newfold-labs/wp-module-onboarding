import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { VIEW_DESIGN_THEMES } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepDesignThemes = () => {
	const { flushQueue, setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect((select) => {
		return {
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
		};
	}, []);

	useEffect( () => {
		flushQueue(currentData);
		setIsSidebarOpened( false );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_DESIGN_THEMES );
	}, [] );
	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepDesignThemes;
