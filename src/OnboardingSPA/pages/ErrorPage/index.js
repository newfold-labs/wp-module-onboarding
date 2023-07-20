import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PAGE } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';
import { useViewportMatch } from '@wordpress/compose';
import getContents from './contents';

const ErrorPage = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setIsDrawerOpened,
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PAGE );
	}, [] );

	const content = getContents();

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
		</CommonLayout>
	);
};

export default ErrorPage;
