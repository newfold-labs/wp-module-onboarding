import { chevronLeft } from '@wordpress/icons';

import { Button } from '@wordpress/components';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import Animate from '../../Animate';
import DrawerPanelHeader from './Header';

const NavPage = () => {
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
						<DrawerPanelHeader
				heading = { __('Design', 'wp-module-onboarding') }
				subheading = { __('', 'wp-module-onboarding') }
				handleClick={ () => setDrawerActiveView( VIEW_NAV_DESIGN ) }
			 />
		</Animate>
	);
};

export default NavPage;
