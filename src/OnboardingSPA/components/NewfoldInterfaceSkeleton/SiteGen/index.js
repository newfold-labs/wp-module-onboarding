// WordPress
import { useEffect, useRef, useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';

// Third-party
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

// Classes and functions
import { setFlow } from '../../../utils/api/flow';
import themeToggleHOC from '../themeToggleHOC';
import {
	generateSiteGenMeta,
	getHomepages,
	getSiteGenIdentifiers,
} from '../../../utils/api/siteGen';
import { initialize as initializeSettings } from '../../../utils/api/settings';
import { init as initializePlugins } from '../../../utils/api/plugins';
import { init as initializeThemes } from '../../../utils/api/themes';
import { trigger as cronTrigger } from '../../../utils/api/cronTrigger';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

// Components
import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import NewfoldInterfaceSkeleton from '../index';
import { ThemeProvider } from '../../ThemeContextProvider';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import {
	MAX_RETRIES_SITE_GEN,
	SKIP_FLOW_ERROR_CODE_OFFLINE,
	SKIP_FLOW_ERROR_CODE_DATABASE,
	SKIP_FLOW_ERROR_CODE_20,
} from '../../../../constants';
import {
	ACTION_ONBOARDING_CHAPTER_COMPLETE,
	ACTION_ONBOARDING_CHAPTER_STARTED,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';
import { stepTheFork } from '../../../steps/TheFork/step';

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	const [ failedSiteMetaAPIs, setFailedSiteMetaAPIs ] = useState( [] );
	const [ isGeneratingSiteMeta, setIsGeneratingSiteMeta ] = useState( false );

	const {
		currentData,
		initialize,
		pluginInstallHash,
		siteGenErrorStatus,
		interactionDisabled,
		newfoldBrand,
		currentStep,
		lastChapter,
	} = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			initialize: select( nfdOnboardingStore ).getInitialize(),
			pluginInstallHash:
				select( nfdOnboardingStore ).getPluginInstallHash(),
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
			interactionDisabled:
				select( nfdOnboardingStore ).getInteractionDisabled(),
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			lastChapter: select( nfdOnboardingStore ).getCurrentChapter(),
		};
	} );

	const {
		setCurrentOnboardingData,
		updateSiteGenErrorStatus,
		setActiveChapter,
		setIsGeneratingHomepages,
	} = useDispatch( nfdOnboardingStore );

	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	const { editEntityRecord } = useDispatch( coreStore );

	const location = useLocation();
	const prevSiteGenErrorStatus = useRef();

	useEffect( () => {
		initializeThemes();
		initializeSettings();
		getEditedEntityRecord( 'root', 'site' );
	}, [] );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	useEffect( () => {
		trackChapters();
	}, [ currentStep ] );

	useEffect( () => {
		if ( initialize ) {
			initializePlugins( pluginInstallHash );
			setInterval( cronTrigger, 45000 );
		}
	}, [ initialize ] );

	useEffect( () => {
		syncStoreToDB();
		generateSiteGenData();
		handlePreviousStepTracking();
	}, [ location.pathname ] );

	useEffect( () => {
		if (
			prevSiteGenErrorStatus.current === true &&
			siteGenErrorStatus === false
		) {
			generateSiteGenData();
		}
		prevSiteGenErrorStatus.current = siteGenErrorStatus;
	}, [ siteGenErrorStatus ] );

	async function syncStoreToDB() {
		// The First Fork Step doesn't have any Store changes
		if ( currentData && location?.pathname !== stepTheFork.path ) {
			//Set the Flow Data and sync store and DB
			const result = await setFlow( currentData );
			if ( result.body !== null ) {
				return true;
			}

		}
	}

	async function performSiteGenMetaGeneration(
		siteInfo,
		identifier,
		skipCache,
		retryCount = 1
	) {
		const data = await generateSiteGenMeta(
			siteInfo,
			identifier,
			skipCache
		);

		if ( data.error ) {
			// Check if it failed then retry again
			if ( retryCount < MAX_RETRIES_SITE_GEN ) {
				return performSiteGenMetaGeneration(
					siteInfo,
					identifier,
					skipCache,
					retryCount + 1
				);
			}

			// If the retry also did not work show the error state
			setFailedSiteMetaAPIs( ( prevState ) => {
				// If the error doesn't exist add it to the Failed List
				if ( ! prevState.includes( identifier ) ) {
					return [ ...prevState, identifier ];
				}

				return prevState;
			} );

			if ( siteGenErrorStatus === false ) {
				updateSiteGenErrorStatus( true );
				setIsGeneratingSiteMeta( false );
			}

			if ( window.nfdOnboarding.siteGenTimerInterval ) {
				clearInterval( window.nfdOnboarding.siteGenTimerInterval );
			}

			return;
		}

		// Sets the Site Title and Taglin in Live Preview
		if ( identifier === 'site_config' ) {
			editEntityRecord( 'root', 'site', undefined, {
				title: data.body.site_title,
				description: data.body.tagline,
			} );
		}

		// A Identifier request was successfully made with valid response
		currentData.sitegen.siteGenMetaStatus.currentStatus += 1;

		if (
			currentData.sitegen.siteGenMetaStatus.currentStatus ===
			currentData.sitegen.siteGenMetaStatus.totalCount
		) {
			// Once all requests are completed use cache to get data
			currentData.sitegen.skipCache = false;
			setIsGeneratingSiteMeta( false );
			// Increase count after site meta calls to ensure systematic call of homepages
			// Get the homepages and set that in flow
			setIsGeneratingHomepages( true );
			const response = await getHomepages(
				currentData.sitegen.siteDetails.prompt
			);

			if ( response.error ) {
				updateSiteGenErrorStatus( true );
				setIsGeneratingHomepages( false );
				setCurrentOnboardingData( currentData );
				return;
			}

			currentData.sitegen.homepages.data = response.body;
			setIsGeneratingHomepages( false );
		}
		// Sync the current request changed to State
		setCurrentOnboardingData( currentData );
	}

	async function generateSiteGenData() {
		// Start the API Requests when the loader is shown.
		if (
			true === siteGenErrorStatus ||
			true === isGeneratingSiteMeta ||
			( ! location.pathname.includes( 'site-logo' ) &&
				! location.pathname.includes( 'experience' ) )
		) {
			return;
		}

		// If all the requests have been made already skip this
		if (
			currentData.sitegen.siteGenMetaStatus.currentStatus ===
			currentData.sitegen.siteGenMetaStatus.totalCount
		) {
			return;
		}

		// If retries are exhausted don't make requests
		if (
			currentData.sitegen?.siteGenErrorMeta?.retryCount >=
			currentData.sitegen?.siteGenErrorMeta?.maxRetryCount
		) {
			updateSiteGenErrorStatus( true );
			return;
		}

		setIsGeneratingSiteMeta( true );

		if ( ! window.nfdOnboarding?.siteGenTimerInterval ) {
			window.nfdOnboarding.siteGenTime = 0;
			window.nfdOnboarding.siteGenTimerInterval = setInterval( () => {
				window.nfdOnboarding.siteGenTime += 1;
			}, 1000 );
		}

		let identifiers;
		if (
			Array.isArray( failedSiteMetaAPIs ) &&
			failedSiteMetaAPIs.length > 0
		) {
			identifiers = failedSiteMetaAPIs;
			setFailedSiteMetaAPIs( [] );
		} else {
			identifiers = await getSiteGenIdentifiers();
			identifiers = identifiers.body;

			currentData.sitegen.siteGenMetaStatus.currentStatus = 0;
			setCurrentOnboardingData( currentData );
		}

		const siteInfo = {
			site_description: currentData.sitegen?.siteDetails?.prompt,
		};

		const skipCache = currentData.sitegen?.skipCache;
		// Iterate over Identifiers and fire Requests!
		identifiers.forEach( ( identifier ) => {
			performSiteGenMetaGeneration( siteInfo, identifier, skipCache );
		} );
	}

	const handlePreviousStepTracking = () => {
		const previousStep = window.nfdOnboarding?.previousStep;
		if ( typeof previousStep !== 'object' ) {
			window.nfdOnboarding.previousStep = {
				path: location.pathname,
				url: window.location.href,
			};
			return;
		}

		window.nfdOnboarding.previousStep = {
			path: location.pathname,
			url: window.location.href,
		};
	};

	const trackChapters = () => {
		const currentChapter = currentStep?.chapter;

		if ( lastChapter !== currentChapter ) {
			if ( lastChapter ) {
				if ( currentData.data.chapters[ lastChapter ] ) {
					currentData.data.chapters[ lastChapter ].completed = true;
				}
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_COMPLETE,
						lastChapter,
						{
							source: SITEGEN_FLOW,
						}
					)
				);
			}

			if ( currentChapter ) {
				if ( currentData.data.chapters[ currentChapter ] ) {
					currentData.data.chapters[
						currentChapter
					].completed = false;
				}
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_STARTED,
						currentChapter,
						{
							source: SITEGEN_FLOW,
						}
					)
				);
			}

			setActiveChapter( currentChapter );
		}

		if ( currentChapter && currentData.data.chapters[ currentChapter ] ) {
			currentData.data.chapters[ currentChapter ].lastStep =
				currentStep?.path ?? '';
		}
	};

	return (
		<ThemeProvider>
			<ThemedNewfoldInterfaceSkeleton
				id={ 'nfd-onboarding-skeleton--sitegen' }
				className={ classNames(
					'nfd-onboarding-skeleton--sitegen',
					`brand-${ newfoldBrand }`
				) }
				header={ <Header /> }
				content={ <Content /> }
				sidebar={ <Sidebar /> }
				footer={ <Footer /> }
				interactionDisabled={ interactionDisabled }
			/>
		</ThemeProvider>
	);
};

export default SiteGen;
