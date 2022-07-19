import { kebabCase } from 'lodash';
import { useEffect, Fragment } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames';
import { kebabCase } from 'lodash';
import { useEffect } from '@wordpress/element';
import { useLocation, useNavigate } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';
import { SlotFillProvider } from '@wordpress/components';

import { store as nfdOnboardingStore } from '../../store';
import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';

/**
 * Primary app that renders the <InterfaceSkeleton />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @return WPComponent
 */
const App = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLargeViewport = useViewportMatch( 'medium' );
	const pathname = kebabCase( location.pathname );

	const { isDrawerOpen, newfoldBrand, onboardingFlow } = useSelect(
		( select ) => {
			return {
				isDrawerOpen: select( nfdOnboardingStore ).isDrawerOpened(),
				newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
				onboardingFlow: select( nfdOnboardingStore ).getOnbardingFlow(),
			};
		},
		[]
	);

	const { setActiveStep, setActiveFlow } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );

			if ( location.pathname.includes( onboardingFlow ) )
				setActiveStep( location.pathname );
			else {
				const [ first, ...rest ] = location.pathname
					.substring( 1 )
					.split( '/' );
				setActiveStep( `/${ onboardingFlow }/${ rest.join( '/' ) }` );
				navigate( `/${ onboardingFlow }/${ rest.join( '/' ) }` );
			}
		}
	}, [ location.pathname, onboardingFlow ] );

	return (
		<Fragment>
			<FullscreenMode isActive={ true } />\
			<SlotFillProvider>
				<InterfaceSkeleton
					className={ classNames(
						'nfd-onboarding-skeleton',
						`brand-${ newfoldBrand }`,
						`path-${ pathname }`,
						{ 'is-drawer-open': isDrawerOpen },
						{ 'is-large-viewport': isLargeViewport },
						{ 'is-small-viewport': ! isLargeViewport }
					) }
					header={ <Header /> }
					drawer={ <Drawer /> }
					content={ <Content /> }
					sidebar={ <Sidebar /> }
				/>
			</SlotFillProvider>
		</Fragment>
	);
};

export default App;
