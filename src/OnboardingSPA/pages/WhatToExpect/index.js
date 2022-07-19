import CommonLayout from '../../components/Layouts/Common';
import { VIEW_NAV_PAGE } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const PageWhatToExpect = () => {
	const { setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_NAV_PAGE );
	}, [] );

	return <CommonLayout isCentered>What To Expect</CommonLayout>;
};

export default PageWhatToExpect;
