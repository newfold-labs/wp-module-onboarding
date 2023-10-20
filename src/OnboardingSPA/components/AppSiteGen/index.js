import Content from '../Content';
import Header from '../HeaderSiteGen';
import ToggleDarkMode from '../ToggleDarkMode';
import AdminBarSiteGen from '../AdminBarSiteGen';
import ProgressBarSiteGen from '../ProgressBarSiteGen';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { store as nfdOnboardingStore } from '../../store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { kebabCase } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { SlotFillProvider } from '@wordpress/components';
import { useEffect, Fragment } from '@wordpress/element';
import { FullscreenMode } from '@wordpress/interface';
import SiteGenInterfaceSkeleton from '../SiteGenInterfaceSkeleton';

const AppSiteGen = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch( 'medium' );
	const pathname = kebabCase( location.pathname );

	const { isDrawerOpen, newfoldBrand, onboardingFlow } = useSelect(
		( select ) => {
			return {
				newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
				onboardingFlow:
					select( nfdOnboardingStore ).getOnboardingFlow(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
			};
		},
		[ location.pathname ]
	);

	const { setActiveStep, setActiveFlow } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname, onboardingFlow ] );

	return (
		<Fragment>
			<FullscreenMode isActive={ true } />
			<SlotFillProvider>
				<SiteGenInterfaceSkeleton
					className={ classNames(
						'nfd-onboarding-skeleton',
						'nfd-sitegen-skeleton',
						`brand-${ newfoldBrand }`,
						`path-${ pathname }`,
						{ 'is-drawer-open': isDrawerOpen },
						{ 'is-large-viewport': isLargeViewport },
						{ 'is-small-viewport': ! isLargeViewport }
					) }
					adminbar={ <AdminBarSiteGen /> }
					progressbar={
						<ProgressBarSiteGen current={ 20 } total={ 100 } />
					}
					header={ <Header /> }
					content={ <Content /> }
					darkModeToggle={ <ToggleDarkMode /> }
				/>
			</SlotFillProvider>
		</Fragment>
	);
};

export default AppSiteGen;
