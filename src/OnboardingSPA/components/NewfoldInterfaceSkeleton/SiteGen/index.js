import { useEffect, useState } from '@wordpress/element';
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
import { MAX_RETRIES_SITE_GEN } from '../../../../constants';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

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

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );
	const location = useLocation();

	const { currentData, initialize, pluginInstallHash, siteGenErrorStatus } =
		useSelect( ( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				initialize: select( nfdOnboardingStore ).getInitialize(),
				pluginInstallHash:
					select( nfdOnboardingStore ).getPluginInstallHash(),
				siteGenErrorStatus:
					select( nfdOnboardingStore ).getSiteGenErrorStatus(),
			};
		} );

	const { setCurrentOnboardingData, updateSiteGenErrorStatus } =
		useDispatch( nfdOnboardingStore );

	async function syncStoreToDB() {
		if ( currentData ) {
			//Set the Flow Data and sync store and DB
			setFlow( currentData );
		}
	}

	async function performSiteGenMetaGeneration(
		siteInfo,
		identifier,
		skipCache,
		retryCount = 1
	) {
		try {
			if ( ! siteGenErrorStatus ) {
				const data = await generateSiteGenMeta(
					siteInfo,
					identifier,
					skipCache
				);
				if ( data.body !== null ) {
					currentData.sitegen.siteGenMetaStatus.currentStatus += 1;
					setCurrentOnboardingData( currentData );
				} else if ( retryCount < MAX_RETRIES_SITE_GEN ) {
					performSiteGenMetaGeneration(
						siteInfo,
						identifier,
						skipCache,
						retryCount + 1
					);
				}
			}
		} catch ( err ) {
			currentData.sitegen.siteGenErrorStatus = true;
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
		if (! siteGenErrorStatus ) {
			generateSiteGenData();
		}
	}, [ siteGenErrorStatus ] );

	useEffect( () => {
		initializeThemes();
		initializeSettings();
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
			></ThemedNewfoldInterfaceSkeleton>
		</ThemeProvider>
	);
};

export default SiteGen;
