import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './basicInfoForm';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { FLOW_SYNC, SETTINGS_SYNC } from '../../../utils/api-queuer/constants'; 

const StepBasicInfo = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const { enqueueRequest, flushQueue, setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } =
		useDispatch( nfdOnboardingStore );

	const { currentStep, flowData } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				flowData: select(nfdOnboardingStore).getOnboardingFlowData()
			};
		},
		[]
	);

	useEffect( () => {
		flushQueue(flowData);
		enqueueRequest(FLOW_SYNC);
		enqueueRequest(SETTINGS_SYNC);
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );
	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title={currentStep?.heading} subtitle={currentStep?.subheading} />
			<BasicInfoForm/>
		</CommonLayout>
	);
};

export default StepBasicInfo;
