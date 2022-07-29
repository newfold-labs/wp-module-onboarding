import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './basicInfoForm';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

const StepBasicInfo = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const { setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );
	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title="Introduce us to this website" subtitle="So we can introduce it to the web"/>
			<BasicInfoForm/>
		</CommonLayout>
	);
};

export default StepBasicInfo;
