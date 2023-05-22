import StepLoader from '..';
import getContents from './contents';
import { useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../../store';

const EcommerceStepLoader = () => {
	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	}, [] );
	const contents = getContents( brandName );
	return (
		<StepLoader title={ contents.title } subtitle={ contents.subtitle } />
	);
};

export default EcommerceStepLoader;
