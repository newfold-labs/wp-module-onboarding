import { Fill, Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { settings } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../../store';
import { SIDEBAR_MENU_SLOTFILL_PREFIX } from '../../../../../constants';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

const CustomizeMenu = () => {
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
			sideBarView === 'Customize' ? ! isSidebarOpened : isSidebarOpened;
		setSidebarActiveView( 'Customize' );
		setIsSidebarOpened( isSidebarOpenedNew );
	};
	const buttonStyle = {
		backgroundColor: 'var(--nfd-onboarding-navigation-back-background)',
		color: 'var(--nfd-onboarding-primary)',
		borderRadius: '8px',
		height: '36px',
	};
	return (
		<>
			{ sideBarView && currentStep?.sidebars?.Customize && (
				<Fill name={ `${ SIDEBAR_MENU_SLOTFILL_PREFIX }/Customize` }>
					<Button
						style={ buttonStyle }
						className={ classNames(
							'nfd-onboarding-sidebar-learn-more__menu-button',
							{
								'is-pressed':
									isSidebarOpened &&
									sideBarView === 'Customize',
							}
						) }
						disabled={ ! currentStep }
						onClick={ toggleSidebar }
						icon={ settings }
					>
						{ __( 'Customize', 'wp-module-onboarding' ) }
					</Button>
				</Fill>
			) }
		</>
	);
};

export default CustomizeMenu;
