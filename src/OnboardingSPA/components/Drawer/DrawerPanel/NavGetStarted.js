import { Icon, chevronRightSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { NavLink } from 'react-router-dom';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import Animate from '../../Animate';
import DrawerPanelHeader from './Header';

const NavGetStarted = () => {
	const { getStartedSteps } = useSelect( ( select ) => {
		return {
			getStartedSteps: select( nfdOnboardingStore ).getGetStartedSteps(),
		};
	}, [] );
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			<DrawerPanelHeader
				heading={ __( 'Get Started', 'wp-module-onboarding' ) }
				subheading={ __(
					"Tell us your WordPress experience and site goals. We'll customize the journey ahead to match your expertise and aspirations.",
					'wp-module-onboarding'
				) }
				handleBack={ () => setDrawerActiveView( VIEW_NAV_PRIMARY ) }
			/>
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
									{ step?.hasSubMenu && (
										<Icon
											className="nfd-onboarding-drawer__panel-menu-link__submenu-icon"
											icon={ chevronRightSmall }
										/>
									) }
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
