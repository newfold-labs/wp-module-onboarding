import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './basicInfoForm';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import getContents from './contents';

const StepBasicInfo = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setIsDrawerOpened,
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const content = getContents();

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
		setIsHeaderNavigationEnabled( true );
	}, [] );
	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
			<BasicInfoForm />
		</CommonLayout>
	);
};

export default StepBasicInfo;
