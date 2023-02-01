import { Icon, chevronLeft } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { NavLink } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import Animate from '../../Animate';

const NavGetStarted = () => {
	const { getStartedSteps } = useSelect( ( select ) => {
		return {
			getStartedSteps: select( nfdOnboardingStore ).getGetStartedSteps(),
		};
	}, [] );
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
					{ getStartedSteps.map( ( step ) => {
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
								</NavLink>
							</li>
						);
					} ) }
				</ul>
			</div>
		</Animate>
	);
};

export default NavGetStarted;
