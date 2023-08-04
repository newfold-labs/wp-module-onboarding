import { Tooltip, Button } from '@wordpress/components';
import { NavLink, useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { Icon, chevronLeft, chevronRightSmall } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import classNames from 'classnames';
import Animate from '../../Animate';
import DrawerPanelHeader from './Header';

const NavPrimary = () => {
	const location = useLocation();
	const { topSteps } = useSelect( ( select ) => {
		return {
			topSteps: select( nfdOnboardingStore ).getTopSteps(),
		};
	}, [] );

	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );
	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
						<DrawerPanelHeader
				heading = { __('WordPress Onboarding', 'wp-module-onboarding') }
				subheading = { __('Accelarate your website building journey. Seamlessly go from idea to reality with powerful tools and guided steps.', 'wp-module-onboarding') }
			 />
			<div className="nfd-onboarding-drawer__panel-menu">
				<ul className="nfd-onboarding-drawer__panel-routes">
					{ topSteps.map( ( step ) => {
						return (
							<Tooltip
								key={ step.path }
								text={ step.tooltipText }
							>
								<li className="nfd-onboarding-drawer__panel-menu-item">
									<NavLink
										to={
											location.pathname === step.path ||
											location.pathname.includes(
												step?.primaryDrawerActiveLinkIncludes
											)
												? location.pathname
												: step.path
										}
										className={ classNames(
											'nfd-onboarding-drawer__panel-menu-link',
											{
												active:
													location.pathname ===
														step.path ||
													location.pathname.includes(
														step?.primaryDrawerActiveLinkIncludes
													),
											}
										) }
										state={ { origin: 'drawer-nav' } }
										onClick={ () =>
											step?.VIEW &&
											setDrawerActiveView( step.VIEW )
										}
									>
										<Icon icon={ step.Icon } />
										<span>{ step.title }</span>
										{step?.hasSubMenu && <Icon className='nfd-onboarding-drawer__panel-menu-link__submenu-icon' icon={chevronRightSmall} />}
									</NavLink>
								</li>
							</Tooltip>
						);
					} ) }
				</ul>
			</div>
		</Animate>
	);
};

export default NavPrimary;
