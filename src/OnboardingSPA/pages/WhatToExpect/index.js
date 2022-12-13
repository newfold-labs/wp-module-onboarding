import CommonLayout from '../../components/Layouts/Common';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PAGE } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const PageWhatToExpect = () => {
	const { setIsDrawerOpened, setDrawerActiveView, setSidebarActiveView } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_NAV_PAGE );
	}, [] );

	return <CommonLayout isCentered>What To Expect</CommonLayout>;
};

export default PageWhatToExpect;
