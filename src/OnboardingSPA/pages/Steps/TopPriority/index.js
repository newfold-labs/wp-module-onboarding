import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

const StepTopPriority = () => {
	const isLargeViewport = useViewportMatch('medium');

	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
	}, []);

	return (
		<CommonLayout isCentered>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepTopPriority;