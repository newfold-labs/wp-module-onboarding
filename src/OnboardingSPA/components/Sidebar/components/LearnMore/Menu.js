import { Fill, Button } from '@wordpress/components';
import { info } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../../store';
import {
	SIDEBAR_LEARN_MORE,
	SIDEBAR_MENU_SLOTFILL_PREFIX,
} from '../../../../../constants';
import classNames from 'classnames';

const LearnMoreMenu = () => {
	const { isSidebarOpened, sideBarView, currentStep } = useSelect(
		( select ) => {
			return {
				isSidebarOpened: select( nfdOnboardingStore ).isSidebarOpened(),
				sideBarView: select( nfdOnboardingStore ).getSidebarView(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			};
		}
	);

	const { setIsSidebarOpened, setSidebarActiveView } =
		useDispatch( nfdOnboardingStore );
	const toggleSidebar = () => {
		const isSidebarOpenedNew =
			sideBarView === SIDEBAR_LEARN_MORE
				? ! isSidebarOpened
				: isSidebarOpened;
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsSidebarOpened( isSidebarOpenedNew );
	};

	return (
		<>
			{ sideBarView && currentStep?.sidebars?.LearnMore && (
				<Fill
					name={ `${ SIDEBAR_MENU_SLOTFILL_PREFIX }/${ SIDEBAR_LEARN_MORE }` }
				>
					<Button
						className={ classNames(
							'nfd-onboarding-sidebar-learn-more__menu-button',
							{
								'is-pressed':
									isSidebarOpened &&
									sideBarView === SIDEBAR_LEARN_MORE,
							}
						) }
						disabled={ ! currentStep }
						onClick={ toggleSidebar }
						icon={ info }
					></Button>
				</Fill>
			) }
		</>
	);
};

export default LearnMoreMenu;
