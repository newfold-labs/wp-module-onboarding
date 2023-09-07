import { Fragment, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';

const IndexPage = () => {
	const navigate = useNavigate();
	const { firstStep } = useSelect((select) => {
		return {
			firstStep: select(nfdOnboardingStore).getFirstStep(),
		};
	}, []);

	useEffect(() => {
		navigate(firstStep.path, {
			replace: true,
			state: { origin: 'index-redirect' },
		});
	});

	return <Fragment />;
};

export default IndexPage;
