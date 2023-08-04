import { Icon, chevronLeft, chevronRightSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { NavLink } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import Animate from '../../../Animate';
import DrawerPanelHeader from '../Header';

const NavStoreInfo = () => {
	const { storeInfoSteps } = useSelect( ( select ) => {
		return {
			storeInfoSteps: select( nfdOnboardingStore ).getStoreInfoSteps(),
		};
	}, [] );
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
									<DrawerPanelHeader
				heading = { __('Store Info', 'wp-module-onboarding') }
				subheading = { __('Our commerce steps streamline store setup by collecting essential details like address and product info. Start selling seamlessly, ensuring your online business thrives from the get-go.', 'wp-module-onboarding') }
				handleClick = { () => setDrawerActiveView( VIEW_NAV_PRIMARY ) }
			 />
			<div className="nfd-onboarding-drawer__panel-menu">
				<ul className="nfd-onboarding-drawer__panel-routes">
					{ storeInfoSteps.map( ( step ) => {
						return (
							<li
								key={ step.path }
								className="nfd-onboarding-drawer__panel-menu-item"
							>
								<NavLink
									to={ step.path }
									className="nfd-onboarding-drawer__panel-menu-link"
									state={ { origin: 'drawer-nav' } }
									onClick={ () =>
										setDrawerActiveView( step.VIEW )
									}
								>
									<Icon icon={ step.Icon } />
									<span>{ step.title }</span>
									{step?.hasSubMenu && <Icon className='nfd-onboarding-drawer__panel-menu-link__submenu-icon' icon={chevronRightSmall} />}
								</NavLink>
							</li>
						);
					} ) }
				</ul>
			</div>
		</Animate>
	);
};

export default NavStoreInfo;
