import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './BasicInfoForm';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepBasicInfo = () => {
	const { setDrawerActiveView, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
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
