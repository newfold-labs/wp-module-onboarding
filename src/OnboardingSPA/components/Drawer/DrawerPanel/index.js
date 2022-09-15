import {
	DRAWER_NAV_VIEWS,
	VIEW_DESIGN_COLORS,
	VIEW_DESIGN_HEADER_MENU,
	VIEW_DESIGN_THEMES,
	VIEW_DESIGN_THEME_STYLES_MENU,
    VIEW_DESIGN_THEME_STYLES_PREVIEW,
	VIEW_DESIGN_TYPOGRAPHY,
	VIEW_NAV_DESIGN,
	VIEW_NAV_PAGE,
	VIEW_NAV_PRIMARY,
	VIEW_NAV_GET_STARTED,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
} from '../../../../constants';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import DesignColors from './DesignColors';
import DesignHeaderMenu from './DesignHeaderMenu';
import DesignThemeStylesMenu from './DesignThemeStylesMenu';
import DesignThemeStylesPreview from './DesignThemeStylesPreview';
import DesignThemes from './DesignThemes';
import DesignTypography from './DesignTypography';
import { ESCAPE } from '@wordpress/keycodes';
import NavDesign from './NavDesign';
import NavGetStarted from './NavGetStarted';
import NavPage from './NavPage';
import NavPrimary from './NavPrimary';
import NavStoreInfo from './Ecommerce/NavStoreInfo';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import classNames from 'classnames';
import { store as nfdOnboardingStore } from '../../../store';

const DrawerPanel = ( { isOpen } ) => {
	const [ isNavView, setIsNavView ] = useState( true ); // menu-primary is default view
	const { isDrawerOpen, drawerView } = useSelect( ( select ) => {
		const { isDrawerOpened, getDrawerView } = select( nfdOnboardingStore );

		return {
			isDrawerOpen: isDrawerOpened(),
			drawerView: getDrawerView(),
		};
	}, [] );

	const { setIsDrawerOpened, setDrawerActiveView } =
		useDispatch( nfdOnboardingStore );

	const closeOnEscape = ( event ) => {
		if ( event.keyCode === ESCAPE && ! event.defaultPrevented ) {
			event.preventDefault();
			setIsDrawerOpened( false );
		}
	};

	useEffect( () => {
		if ( DRAWER_NAV_VIEWS.includes( drawerView ) ) {
			setIsNavView( true );
		} else {
			setIsNavView( false );
		}
	}, [ drawerView ] );

	const WithDesignBack = ( { children } ) => {
		return (
			<div className="is-drawer-fade">
				<Button
					className="nfd-onboarding-drawer__panel-back"
					variant="tertiary"
					icon={ chevronLeft }
					onClick={ () => setDrawerActiveView( VIEW_NAV_DESIGN ) }
				>
					{ __( 'Design', 'wp-module-onboarding' ) }
				</Button>
				{ children }
			</div>
		);
	};

	return (
		<div
			className={ classNames( `nfd-onboarding-drawer__panel`, {
				'is-open': isDrawerOpen,
			} ) }
			onKeyDown={ closeOnEscape }
		>
			<div className="nfd-onboarding-drawer__panel-inner">
				<div className="nfd-onboarding-drawer__panel-site-title-container">
					<div className="nfd-onboarding-drawer__panel-site-title">
						{ __( 'WordPress Onboarding', 'wp-module-onboarding' ) }
					</div>
				</div>
				<div className="nfd-onboarding-drawer__panel-scroll-container">
					<div className="nfd-onboarding-drawer__panel-inside">
						{ VIEW_NAV_PRIMARY === drawerView && <NavPrimary /> }
						{ VIEW_NAV_DESIGN === drawerView && <NavDesign /> }
						{ VIEW_NAV_GET_STARTED === drawerView && (
							<NavGetStarted />
						) }
						{ VIEW_NAV_ECOMMERCE_STORE_INFO === drawerView && (
							<NavStoreInfo />
						) }
						{ VIEW_NAV_PAGE === drawerView && <NavPage /> }
						{ VIEW_DESIGN_THEMES === drawerView && (
							<WithDesignBack>
								<DesignThemes />
							</WithDesignBack>
						) }
						{ VIEW_DESIGN_THEME_STYLES_MENU === drawerView && (
							<WithDesignBack>
								<DesignThemeStylesMenu />
							</WithDesignBack>
						) }
                        { VIEW_DESIGN_THEME_STYLES_PREVIEW === drawerView && (
							<WithDesignBack>
								<DesignThemeStylesPreview />
							</WithDesignBack>
						) }
						{ VIEW_DESIGN_COLORS === drawerView && (
							<WithDesignBack>
								<DesignColors />
							</WithDesignBack>
						) }
						{ VIEW_DESIGN_TYPOGRAPHY === drawerView && (
							<WithDesignBack>
								<DesignTypography />
							</WithDesignBack>
						) }
						{ VIEW_DESIGN_HEADER_MENU === drawerView && (
							<WithDesignBack>
								<DesignHeaderMenu />
							</WithDesignBack>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default DrawerPanel;
