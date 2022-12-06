import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';

const StepSiteFeatures = () => {
	const { setIsSidebarOpened, setIsHeaderNavigationEnabled } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepSiteFeatures;
