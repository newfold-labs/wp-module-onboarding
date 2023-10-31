import { Icon, chevronLeft } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { NavLink, useLocation } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';
import Animate from '../../../../Shared/Animate';

const NavDesign = () => {
	const { designRoutes } = useSelect( ( select ) => {
		return {
			designRoutes: select( nfdOnboardingStore ).getDesignRoutes(),
		};
	}, [] );
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	const location = useLocation();

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
					{ designRoutes.map( ( step ) => {
						return (
							<li
								key={ step.path }
								className="nfd-onboarding-drawer__panel-menu-item"
							>
								<NavLink
									to={ step.path }
									className={ classNames(
										'nfd-onboarding-drawer__panel-menu-link',
										{
											active:
												location.pathname ===
													step.path ||
												location.pathname.includes(
													step?.data
														?.designDrawerActiveLinkIncludes
												),
										}
									) }
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

export default NavDesign;
