import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { setFlow } from '../../utils/api/flow';
import { conditionalSteps } from '../../data/routes';
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
import { API_REQUEST, HIIVE_ANALYTICS_CATEGORY } from '../../../constants';
import NewfoldInterfaceSkeleton from '../NewfoldInterfaceSkeleton';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { trackHiiveEvent } from '../../utils/analytics';
import { injectInAllSteps } from '../../data/routes/allStepsHandler';

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
		allSteps,
	} = useSelect( ( select ) => {
		return {
			isDrawerOpen: select( nfdOnboardingStore ).isDrawerOpened(),
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
			onboardingFlow: select( nfdOnboardingStore ).getOnboardingFlow(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			socialData: select( nfdOnboardingStore ).getOnboardingSocialData(),
			firstStep: select( nfdOnboardingStore ).getFirstStep(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
		};
	}, [] );

	const [ isRequestPlaced, setIsRequestPlaced ] = useState( false );
	const [ didVisitBasicInfo, setDidVisitBasicInfo ] = useState( false );
	const [ didVisitEcommerce, setDidVisitEcommerce ] = useState( false );
	const {
		setActiveStep,
		setActiveFlow,
		updateAllSteps,
		flushQueue,
		enqueueRequest,
		setOnboardingSocialData,
		setCurrentOnboardingData,
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

	function handleColorsAndTypographyRoutes() {
		if (
			location?.pathname.includes( 'colors' ) ||
			location?.pathname.includes( 'typography' )
		) {
			const updates = injectInAllSteps( allSteps, conditionalSteps );
			updateAllSteps( updates.allSteps );
			if ( ! currentData.data.customDesign ) {
				currentData.data.customDesign = true;
				setCurrentOnboardingData( currentData );
			}
		}
	}

	const handlePreviousStepTracking = () => {
		const previousStep = window.nfdOnboarding?.previousStepID;
		if ( typeof previousStep !== 'string' ) {
			window.nfdOnboarding.previousStepID = location.pathname;
			HiiveAnalytics.dispatchEvents( HIIVE_ANALYTICS_CATEGORY );
			return;
		}

		if ( previousStep.includes( 'products' ) ) {
			trackHiiveEvent( 'products-info', {
				productCount:
					currentData.storeDetails.productInfo.product_count,
				productTypes:
					currentData.storeDetails.productInfo.product_types.join(
						','
					),
			} );
		}

		if ( previousStep.includes( 'site-pages' ) ) {
			if ( currentData.data.sitePages?.other !== false ) {
				currentData.data.sitePages?.other?.forEach( ( sitePage ) => {
					trackHiiveEvent(
						`${ sitePage.slug }-layout`,
						sitePage.slug
					);
				} );
			}
		}

		if ( previousStep.includes( 'site-features' ) ) {
			const siteFeatures = currentData.data?.siteFeatures;
			if ( siteFeatures ) {
				const siteFeaturesArray = Object.keys( siteFeatures ).filter(
					( key ) => {
						return siteFeatures[ key ] !== false;
					}
				);
				trackHiiveEvent(
					'site-features',
					siteFeaturesArray.join( ',' )
				);
			}
		}

		window.nfdOnboarding.previousStepID = location.pathname;
		HiiveAnalytics.dispatchEvents( HIIVE_ANALYTICS_CATEGORY );
	};

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		syncStoreToDB();
		handlePreviousStepTracking();
		handleColorsAndTypographyRoutes();
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
