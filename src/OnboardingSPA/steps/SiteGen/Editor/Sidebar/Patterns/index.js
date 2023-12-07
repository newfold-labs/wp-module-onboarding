import { useDispatch } from '@wordpress/data';

import { useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../../../store';
import { SIDEBAR_SITEGEN_EDITOR_PATTERNS } from '../../../../../../constants';

const Patterns = () => {
	const { setSidebarActiveView } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_SITEGEN_EDITOR_PATTERNS );
	}, [] );
	return <div>Hello World</div>;
};

export default Patterns;
