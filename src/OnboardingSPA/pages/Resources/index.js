import CommonLayout from '../../components/Layouts/Common';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PAGE } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const PageResources = () => {
	const { setIsDrawerOpened, setSidebarActiveView } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_NAV_PAGE );
	}, [] );

	return <CommonLayout isPadded>{__( 'Resources Page.', 'wp-module-onboarding' ) }</CommonLayout>;
};

export default PageResources;
