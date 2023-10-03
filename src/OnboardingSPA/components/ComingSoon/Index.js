// import { useState } from '@wordpress/element';
// import { useSelect, useDispatch } from '@wordpress/data';

import { CheckboxItem } from '../../components/CheckboxTemplate';
// import { store as nfdOnboardingStore } from '../../store';

const ComingSoon = () => {
	// const [ comingSoon, setComingSoon ] = useState();

	// const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	// const { currentData } = useSelect( ( select ) => {
	// 	return {
	// 		currentData:
	// 			select( nfdOnboardingStore ).getCurrentOnboardingData(),
	// 	};
	// }, [] );

	async function handleComingSoon() {}

	return (
		<div className="coming-soon--wrapper">
			<CheckboxItem
				name="coming_soon"
				title="Coming Soon"
				subtitle="Keep your {site} private until you click launch"
				icon="--site-features-security"
				desc="Keep your {site} private until you click launch"
				callback={ handleComingSoon }
				fullWidth={ true }
				isSelectedDefault={ false }
			/>
		</div>
	);
};

export default ComingSoon;
