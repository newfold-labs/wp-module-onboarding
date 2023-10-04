import { useSelect, useDispatch } from '@wordpress/data';

import getContents from './contents';
import { CheckboxItem } from '../CheckboxTemplate';
import { store as nfdOnboardingStore } from '../../store';

const ComingSoon = () => {
	const content = getContents();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	async function handleComingSoon( name, selection ) {
		currentData.data.comingSoon = selection;
		setCurrentOnboardingData( currentData );
	}

	return (
		<div className="coming-soon--wrapper">
			<CheckboxItem
				name="coming_soon"
				title={ content.title }
				subtitle={ content.subtitle }
				icon={ '--site-features-comingsoon' }
				desc={ content.desc }
				callback={ handleComingSoon }
				fullWidth={ true }
				isSelectedDefault={ currentData?.data?.comingSoon }
			/>
		</div>
	);
};

export default ComingSoon;
