import { Button, Tooltip } from '@wordpress/components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import ExitToWordPress from '../../ExitToWordPress';

import { Icon } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import classNames from 'classnames';
import Animate from '../../Animate';

const NavPrimary = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { topSteps } = useSelect( ( select ) => {
		return {
			topSteps: select( nfdOnboardingStore ).getTopSteps(),
		};
	}, [] );

	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	const isFirstStep = topSteps[ 0 ].path === location.pathname;
	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			{ ( isFirstStep && (
				<Button
					className="nfd-onboarding-drawer__panel-back"
					variant="tertiary"
					onClick={ () => navigate( '/page/what-to-expect' ) }
				>
					What to Expect
				</Button>
			) ) || (
				<ExitToWordPress
					buttonClassName="nfd-onboarding-drawer__panel-back"
					buttonVariant="tertiary"
					origin="drawer-panel"
				/>
			) }
			<div className="nfd-onboarding-drawer__panel-menu">
				<ul className="nfd-onboarding-drawer__panel-routes">
					{ topSteps.map( ( step ) => {
						return (
							<Tooltip key={ step.path } text={ step.heading }>
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
