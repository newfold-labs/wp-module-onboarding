import { Icon, chevronLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { NavLink } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import Animate from '../../../Animate';
import { commerce as commerceChapter } from '../../../../chapters/commerce';

const NavStoreInfo = () => {
	const storeInfoSteps = commerceChapter.steps;
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			<Button
				className="nfd-onboarding-drawer__panel-back"
				variant="tertiary"
				icon={ chevronLeft }
				onClick={ () => setDrawerActiveView( VIEW_NAV_PRIMARY ) }
			>
				{ __( 'Onboarding Menu', 'wp-module-onboarding' ) }
			</Button>
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
										setDrawerActiveView( step.drawerView )
									}
								>
									<Icon icon={ step.icon } />
									<span>{ step.title }</span>
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
