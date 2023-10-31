import { Tooltip } from '@wordpress/components';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';
import Animate from '../../../../Shared/Animate';

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
			<div className="nfd-onboarding-drawer__panel-menu">
				<ul className="nfd-onboarding-drawer__panel-routes">
					{ topSteps.map( ( step ) => {
						return (
							<Tooltip
								key={ step.path }
								text={ step.data?.tooltipText }
							>
								<li className="nfd-onboarding-drawer__panel-menu-item">
									<NavLink
										to={
											location.pathname === step.path ||
											location.pathname.includes(
												step?.data
													?.primaryDrawerActiveLinkIncludes
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
														step?.data
															?.primaryDrawerActiveLinkIncludes
													),
											}
										) }
										state={ { origin: 'drawer-nav' } }
										onClick={ () =>
											step?.drawerView &&
											setDrawerActiveView(
												step.drawerView
											)
										}
									>
										<Icon icon={ step.icon } />
										<span>{ step.title }</span>
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
