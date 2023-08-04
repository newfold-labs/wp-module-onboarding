import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { VIEW_NAV_DESIGN } from '../../../../constants';
import Animate from '../../Animate';
import DrawerPanelHeader from './Header';

const WithDesignBack = ( { children } ) => {
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );
	() => setDrawerActiveView( VIEW_NAV_DESIGN )
	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			{ children }
		</Animate>
	);
};

export default WithDesignBack;
