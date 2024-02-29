import { useEffect, useRef, useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';

import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import themeToggleHOC from '../themeToggleHOC';
import NewfoldInterfaceSkeleton from '../index';
import { ThemeProvider } from '../../ThemeContextProvider';
import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';
import { setFlow } from '../../../utils/api/flow';
import {
	generateSiteGenMeta,
	getSiteGenIdentifiers,
} from '../../../utils/api/siteGen';
import Footer from '../../Footer';
import { initialize as initializeSettings } from '../../../utils/api/settings';
import { init as initializePlugins } from '../../../utils/api/plugins';
import { init as initializeThemes } from '../../../utils/api/themes';
import { trigger as cronTrigger } from '../../../utils/api/cronTrigger';
import {
	MAX_RETRIES_SITE_GEN,
	SKIP_FLOW_ERROR_CODE_DATABASE,
	SKIP_FLOW_ERROR_CODE_20,
} from '../../../../constants';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import {
	ACTION_ONBOARDING_CHAPTER_COMPLETE,
	ACTION_ONBOARDING_CHAPTER_STARTED,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	const [ failedApi, setFailedApi ] = useState( [] );
	const location = useLocation();

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
	} = useDispatch( nfdOnboardingStore );

	// Update Title and Tagline on the site.
	const { editEntityRecord } = useDispatch( coreStore );
	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	const prevSiteGenErrorStatus = useRef();

	async function syncStoreToDB() {
		if ( currentData ) {
			//Set the Flow Data and sync store and DB
			const result = await setFlow( currentData );
			if ( result?.error !== null ) {
				switch ( result?.error.code ) {
					case SKIP_FLOW_ERROR_CODE_DATABASE:
						break;
					case SKIP_FLOW_ERROR_CODE_20:
						break;
					default:
						updateSiteGenErrorStatus( true );
						break;
				}
			}
		}
	}

	async function performSiteGenMetaGeneration(
		siteInfo,
		identifier,
		skipCache,
		retryCount = 1
	) {
		try {
			const data = await generateSiteGenMeta(
				siteInfo,
				identifier,
				skipCache
			);
			if ( data !== null ) {
				// A Identifier request was sucessfuly made with valid response
				currentData.sitegen.siteGenMetaStatus.currentStatus += 1;
				if (
					currentData.sitegen.siteGenMetaStatus.currentStatus ===
					currentData.sitegen.siteGenMetaStatus.totalCount
				) {
					// Once all requests are completed use cache to get data
					currentData.sitegen.skipCache = false;
				}
				// Sync the current request changed to State
				setCurrentOnboardingData( currentData );

				// Sets the Site Title and Taglin in Live Preview
				if ( identifier === 'site_config' ) {
					editEntityRecord( 'root', 'site', undefined, {
						title: data.site_title,
						description: data.tagline,
					} );
				}
			}
		} catch ( err ) {
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
			setFailedApi( ( prevState ) => {
				// If the error doesn't exist add it to the Failed List
				if ( ! prevState.includes( identifier ) ) {
					return [ ...prevState, identifier ];
				}
				return prevState;
			} );
			// Activate the Error Page
			currentData.sitegen.siteGenErrorStatus = true;
			setCurrentOnboardingData( currentData );
		}
	}

	async function generateSiteGenData() {
		// Start the API Requests when the loader is shown.
		if ( ! location.pathname.includes( 'site-logo' ) ) {
			return;
		}

		if ( ! window.nfdOnboarding?.siteGenTimerInterval ) {
			window.nfdOnboarding.siteGenTime = 0;
			window.nfdOnboarding.siteGenTimerInterval = setInterval( () => {
				window.nfdOnboarding.siteGenTime += 1;
			}, 1000 );
		}

		let identifiers;
		if ( Array.isArray( failedApi ) && failedApi.length > 0 ) {
			identifiers = failedApi;
			setFailedApi( [] );
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
			syncStoreToDB();
		}
		prevSiteGenErrorStatus.current = siteGenErrorStatus;
	}, [ siteGenErrorStatus ] );

	useEffect( () => {
		initializeThemes();
		initializeSettings();
		getEditedEntityRecord( 'root', 'site' );
		updateSiteGenErrorStatus( false );
	}, [] );

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
