import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const StepWhatNext = () => {
	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(false);
	}, []);

	return (
		<CommonLayout isCentered isBgPrimary>
			<StepOverview />
		</CommonLayout>
	);
};

export default StepWhatNext;
