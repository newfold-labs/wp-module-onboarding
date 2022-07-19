import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

const StepSitePages = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( ! isLargeViewport ) {
			setIsDrawerOpened( false );
		}
		setIsSidebarOpened( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );
	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepSitePages;
