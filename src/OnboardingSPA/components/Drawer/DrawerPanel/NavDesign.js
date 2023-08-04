import { Icon, chevronRightSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { NavLink, useLocation } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';
import Animate from '../../Animate';
import DrawerPanelHeader from './Header';

const NavDesign = () => {
	const { designSteps } = useSelect( ( select ) => {
		return {
			designSteps: select( nfdOnboardingStore ).getDesignSteps(),
		};
	}, [] );
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	const location = useLocation();

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			<DrawerPanelHeader
				heading = { __('Design', 'wp-module-onboarding') }
				subheading = { __("Create dynamic, powerful designs that can be easily edited and fine-tuned in the block editor whenever you desire.", 'wp-module-onboarding') }
				handleClick={ () => setDrawerActiveView( VIEW_NAV_PRIMARY ) }
			 />
			<div className="nfd-onboarding-drawer__panel-menu">
				<ul className="nfd-onboarding-drawer__panel-routes">
					{ designSteps.map( ( step ) => {
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
													step?.designDrawerActiveLinkIncludes
												),
										}
									) }
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

export default NavDesign;
