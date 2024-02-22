import { useEffect, useRef } from '@wordpress/element';
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

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	const { newfoldBrand } = useSelect( ( select ) => {
		return {
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
		};
	}, [] );

	// Update Title and Tagline on the site.
	const { editEntityRecord } = useDispatch( coreStore );
	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );
	const location = useLocation();

	const {
		currentData,
		initialize,
		pluginInstallHash,
		siteGenErrorStatus,
		interactionDisabled,
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
		};
	} );

	const { setCurrentOnboardingData, updateSiteGenErrorStatus } =
		useDispatch( nfdOnboardingStore );

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
				currentData.sitegen.siteGenMetaStatus.currentStatus += 1;
				if (
					currentData.sitegen.siteGenMetaStatus.currentStatus ===
					currentData.sitegen.siteGenMetaStatus.totalCount
				) {
					currentData.sitegen.skipCache = false;
				}
				setCurrentOnboardingData( currentData );

				if ( identifier === 'site_config' ) {
					editEntityRecord( 'root', 'site', undefined, {
						title: data.site_title,
						description: data.tagline,
					} );
				}
			}
		} catch ( err ) {
			if ( retryCount < MAX_RETRIES_SITE_GEN ) {
				return performSiteGenMetaGeneration(
					siteInfo,
					identifier,
					skipCache,
					retryCount + 1
				);
			}
			updateSiteGenErrorStatus( true );
		}
	}

	async function generateSiteGenData() {
		// Start the API Requests when the loader is shown.
		if (
			! (
				location.pathname.includes( 'experience' ) ||
				location.pathname.includes( 'building' )
			)
		) {
			return;
		}
		let identifiers = await getSiteGenIdentifiers();
		identifiers = identifiers.body;

		const midIndex = Math.floor( identifiers.length / 2 );
		if ( location.pathname.includes( 'experience' ) ) {
			identifiers = identifiers.slice( 0, midIndex );
			currentData.sitegen.siteGenMetaStatus.currentStatus = 0;
		} else if ( location.pathname.includes( 'building' ) ) {
			identifiers = identifiers.slice( midIndex );
			currentData.sitegen.siteGenMetaStatus.currentStatus = midIndex;
		}
		setCurrentOnboardingData( currentData );
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
