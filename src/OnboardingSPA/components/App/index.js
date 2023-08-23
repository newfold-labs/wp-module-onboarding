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
import { API_REQUEST } from '../../../constants';
import NewfoldInterfaceSkeleton from '../NewfoldInterfaceSkeleton';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../utils/analytics/hiive';
import { injectInAllSteps } from '../../data/routes/allStepsHandler';
import {
	ACTION_LOGO_ADDED,
	ACTION_ONBOARDING_CHAPTER_COMPLETE,
	ACTION_ONBOARDING_CHAPTER_STARTED,
	ACTION_ONBOARDING_STARTED,
	ACTION_SITE_TITLE_SET,
	ACTION_SOCIAL_ADDED,
	ACTION_STARTER_PAGES_SELECTED,
	ACTION_TAGLINE_SET,
	CATEGORY,
} from '../../utils/analytics/hiive/constants';
import { socialMediaStoreToState } from '../SocialMediaForm/utils';

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
		currentChapter,
		currentStep,
	} = useSelect(
		( select ) => {
			return {
				isDrawerOpen: select( nfdOnboardingStore ).isDrawerOpened(),
				newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
				onboardingFlow:
					select( nfdOnboardingStore ).getOnboardingFlow(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				socialData:
					select( nfdOnboardingStore ).getOnboardingSocialData(),
				firstStep: select( nfdOnboardingStore ).getFirstStep(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				currentChapter:
					select( nfdOnboardingStore ).getCurrentChapter(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			};
		},
		[ location.pathname ]
	);

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
		setActiveChapter,
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
		const { address } = currentData.storeDetails;
		let payload = {};
		if ( address !== undefined ) {
			delete address.country;
			delete address.state;
			payload = address;
		}
		// if ( tax !== undefined ) {
		// 	delete tax.option;
		// 	delete tax.isStoreDetailsFilled;
		// 	payload = { ...payload, ...tax };
		// }
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

	function handleConditionalDesignStepsRoutes() {
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
		const previousStep = window.nfdOnboarding?.previousStep;
		if ( typeof previousStep !== 'object' ) {
			window.nfdOnboarding.previousStep = {
				path: location.pathname,
				url: window.location.href,
			};
			HiiveAnalytics.dispatchEvents( CATEGORY );
			return;
		}

		const previousStepPath = previousStep.path;
		const previousStepURL = previousStep.url;

		if ( previousStepPath.includes( 'basic-info' ) ) {
			const siteTitle = currentData.data.blogName;
			const siteDescription = currentData.data.blogDescription;
			const siteLogo = currentData.data.siteLogo.url;
			if ( siteTitle ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_SITE_TITLE_SET,
						siteTitle,
						{},
						previousStepURL
					)
				);
			}

			if ( siteDescription ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_TAGLINE_SET,
						siteDescription,
						{},
						previousStepURL
					)
				);
			}

			if ( siteLogo ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_LOGO_ADDED,
						undefined,
						{},
						previousStepURL
					)
				);
			}

			const platforms = Object.keys(
				socialMediaStoreToState( socialData )
			).join( ',' );
			if ( platforms ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_SOCIAL_ADDED,
						platforms,
						{},
						previousStepURL
					)
				);
			}
		}

		if ( previousStepPath.includes( 'site-pages' ) ) {
			const sitePages = currentData.data.sitePages?.other;
			if ( ! sitePages || false === sitePages ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_STARTER_PAGES_SELECTED,
						[],
						{
							count: 0,
						},
						previousStepURL
					)
				);
			} else {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_STARTER_PAGES_SELECTED,
						sitePages.map( ( sitePage ) => sitePage.title ),
						{
							count: sitePages.length,
						},
						previousStepURL
					)
				);
			}
		}

		window.nfdOnboarding.previousStep = {
			path: location.pathname,
			url: window.location.href,
		};

		HiiveAnalytics.dispatchEvents( CATEGORY );
	};

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		syncStoreToDB();
		handlePreviousStepTracking();
		handleConditionalDesignStepsRoutes();
		if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname, onboardingFlow ] );

	useEffect( () => {
		if ( location.pathname === firstStep.path ) {
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_ONBOARDING_STARTED )
			);
		}

		if ( currentChapter !== currentStep?.chapter ) {
			if ( currentChapter ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_COMPLETE,
						currentChapter
					)
				);
			}

			if ( currentStep?.chapter ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_STARTED,
						currentStep.chapter
					)
				);
			}

			setActiveChapter( currentStep?.chapter );
		}
	}, [ currentStep ] );

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
