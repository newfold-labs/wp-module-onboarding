import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { setFlow } from '../../utils/api/flow';
import { getSettings, setSettings } from '../../utils/api/settings';
import { isEmpty, updateWPSettings } from '../../utils/api/ecommerce';
import { store as nfdOnboardingStore } from '../../store';

// eslint-disable-next-line import/no-extraneous-dependencies
import { kebabCase } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { SlotFillProvider } from '@wordpress/components';
import { useEffect, Fragment, useState } from '@wordpress/element';
import { FullscreenMode } from '@wordpress/interface';
import { API_REQUEST } from '../../../constants';
import NewfoldInterfaceSkeleton from '../NewfoldInterfaceSkeleton';

/**
 * Primary app that renders the <NewfoldInterfaceSkeleton />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @return {WPComponent} App Component
 */
const App = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch( 'medium' );
	const pathname = kebabCase( location.pathname );

	const {
		isDrawerOpen,
		newfoldBrand,
		onboardingFlow,
		currentData,
		socialData,
		firstStep,
	} = useSelect( ( select ) => {
		return {
			isDrawerOpen: select( nfdOnboardingStore ).isDrawerOpened(),
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
			onboardingFlow: select( nfdOnboardingStore ).getOnboardingFlow(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			socialData: select( nfdOnboardingStore ).getOnboardingSocialData(),
			firstStep: select( nfdOnboardingStore ).getFirstStep(),
		};
	}, [] );

	const [ isRequestPlaced, setIsRequestPlaced ] = useState( false );
	const [ didVisitBasicInfo, setDidVisitBasicInfo ] = useState( false );
	const [ didVisitEcommerce, setDidVisitEcommerce ] = useState( false );
	const {
		setActiveStep,
		setActiveFlow,
		flushQueue,
		enqueueRequest,
		setOnboardingSocialData,
	} = useDispatch( nfdOnboardingStore );

	async function syncSocialSettings() {
		const initialData = await getSettings();
		const result = await setSettings( socialData );
		setDidVisitBasicInfo( false );
		if ( result?.error !== null ) {
			return initialData?.body;
		}
		return result?.body;
	}

	async function syncStoreDetails() {
		const { address, tax } = currentData.storeDetails;
		let payload = {};
		if ( address !== undefined ) {
			delete address.country;
			delete address.state;
			payload = address;
		}
		if ( tax !== undefined ) {
			// const option = tax.option;
			// const isStoreDetailsFilled = tax.isStoreDetailsFilled;
			delete tax.option;
			delete tax.isStoreDetailsFilled;
			// No Auto-calculate taxes for MMP
			// if (option === "1") {
			// 	if (isStoreDetailsFilled) {
			// 		payload = { ...payload, ...tax };
			// 	}
			// } else {
			// 	payload = { ...payload, ...tax };
			// }
			payload = { ...payload, ...tax };
		}
		if ( ! isEmpty( payload ) ) {
			await updateWPSettings( payload );
		}
		delete currentData.storeDetails.address;
		delete currentData.storeDetails.tax;
		setDidVisitEcommerce( false );
	}

	async function syncStoreToDB() {
		// The First Welcome Step doesn't have any Store changes
		const isFirstStep = location?.pathname === firstStep?.path;
		if ( currentData && ! isFirstStep ) {
			if ( ! isRequestPlaced ) {
				setIsRequestPlaced( true );

				if ( didVisitEcommerce ) {
					await syncStoreDetails();
				}

				// If Social Data is changed then sync it
				if ( didVisitBasicInfo ) {
					const socialDataResp = await syncSocialSettings();

					// If Social Data is changed then Sync that also to the store
					if ( socialDataResp ) {
						setOnboardingSocialData( socialDataResp );
					}
				}
				flushQueue();
				enqueueRequest( API_REQUEST.SET_FLOW, () =>
					setFlow( currentData )
				);
				setIsRequestPlaced( false );
			}
		}
		// Check if the Basic Info page was visited
		if ( location?.pathname.includes( 'basic-info' ) ) {
			setDidVisitBasicInfo( true );
		}
		if ( location?.pathname.includes( 'ecommerce' ) ) {
			setDidVisitEcommerce( true );
		}
	}

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		syncStoreToDB();
		if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname, onboardingFlow ] );

	return (
		<Fragment>
			<FullscreenMode isActive={ true } />
			<SlotFillProvider>
				<NewfoldInterfaceSkeleton
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
