import { Fragment, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';

const IndexRoute = () => {
	const navigate = useNavigate();

	/* [TODO]: Navigate to first step */
	useEffect(() => {
		navigate('/step/get-started', {
			replace: true,
			state: { origin: 'index-redirect' },
		});
	});

	return <Fragment />;
};

export default IndexRoute;
