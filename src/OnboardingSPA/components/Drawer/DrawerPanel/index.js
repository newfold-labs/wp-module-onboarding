import {
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
	VIEW_DESIGN_HOMEPAGE_MENU,
} from '../../../../constants';
import { useDispatch, useSelect } from '@wordpress/data';

import DesignColors from './DesignColors';
import DesignHeaderMenu from './DesignHeaderMenu';
import DesignHomepageMenu from './DesignHomepageMenu';
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
import classNames from 'classnames';
import { store as nfdOnboardingStore } from '../../../store';
import WithDesignAnimation from './WithDesignAnimation';

const DrawerPanel = () => {
	const { isDrawerOpen, drawerView, siteTitle } = useSelect( ( select ) => {
		const { isDrawerOpened, getDrawerView, getSiteTitle } =
			select( nfdOnboardingStore );

		return {
			isDrawerOpen: isDrawerOpened(),
			drawerView: getDrawerView(),
			siteTitle: getSiteTitle(),
		};
	}, [] );

	const { setIsDrawerOpened } = useDispatch( nfdOnboardingStore );

	const closeOnEscape = ( event ) => {
		if ( event.keyCode === ESCAPE && ! event.defaultPrevented ) {
			event.preventDefault();
			setIsDrawerOpened( false );
		}
	};

	return (
		<div
			className={ classNames( `nfd-onboarding-drawer__panel`, {
				'is-open': isDrawerOpen,
			} ) }
			role="button"
			tabIndex={ -1 }
			onKeyDown={ closeOnEscape }
		>
			<div className="nfd-onboarding-drawer__panel-inner">
				<div className="nfd-onboarding-drawer__panel-site-title-container">
					<div className="nfd-onboarding-drawer__panel-site-title">
						{ siteTitle }
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
							<WithDesignAnimation>
								<DesignThemes />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_THEME_STYLES_MENU === drawerView && (
							<WithDesignAnimation>
								<DesignThemeStylesMenu />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_THEME_STYLES_PREVIEW === drawerView && (
							<WithDesignAnimation>
								<DesignThemeStylesPreview />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_COLORS === drawerView && (
							<WithDesignAnimation>
								<DesignColors />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_TYPOGRAPHY === drawerView && (
							<WithDesignAnimation>
								<DesignTypography />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_HEADER_MENU === drawerView && (
							<WithDesignAnimation>
								<DesignHeaderMenu />
							</WithDesignAnimation>
						) }
						{ VIEW_DESIGN_HOMEPAGE_MENU === drawerView && (
							<WithDesignAnimation>
								<DesignHomepageMenu />
							</WithDesignAnimation>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default DrawerPanel;
