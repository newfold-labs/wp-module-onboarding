import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';

import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import themeToggleHOC from '../themeToggleHOC';
import NewfoldInterfaceSkeleton from '../index';
import ToggleDarkMode from '../../ToggleDarkMode';
import { ThemeProvider } from '../../ThemeContextProvider';
import { store as nfdOnboardingStore } from '../../../store';
import { setFlow } from '../../../utils/api/flow';
import { generateSiteGenMeta } from '../../../utils/api/siteGen';

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	const location = useLocation();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	async function syncStoreToDB() {
		if ( currentData ) {
			//Set the Flow Data and sync store and DB
			setFlow( currentData );
		}
	}

	function generateSiteGenData() {
		// Start the API Requests when the loader is shown.
		if (
			! (
				location.pathname.includes( 'experience' ) ||
				location.pathname.includes( 'building' )
			)
		) {
			return;
		}

		// If the calls are already made then skip doing that again.
		if (
			currentData.sitegen.siteGenMetaStatus.currentStatus >=
			currentData.sitegen.siteGenMetaStatus.totalCount
		) {
			return;
		}

		let identifiers = [
			'siteclassification',
			'targetaudience',
			'contenttones',
			'contentstructure',
			'colorpalette',
			'sitemap',
			'pluginrecommendation',
			'fontpair',
		];

		const midIndex = Math.floor( identifiers.length / 2 );
		if ( location.pathname.includes( 'experience' ) ) {
			identifiers = identifiers.slice( 0, midIndex );
		} else if ( location.pathname.includes( 'building' ) ) {
			identifiers = identifiers.slice( midIndex );
		}

		const siteInfo = {
			site_description: currentData.sitegen?.siteDetails?.prompt,
		};

		// Iterate over Identifiers and fire Requests!
		identifiers.forEach( ( identifier ) => {
			return new Promise( () =>
				generateSiteGenMeta( siteInfo, identifier )
					.then( ( data ) => {
						if ( data.body !== null ) {
							currentData.sitegen.siteGenMetaStatus.currentStatus += 1;
							setCurrentOnboardingData( currentData );
						}
					} )
					/* eslint-disable no-console */
					.catch( ( err ) => console.log( err ) )
			);
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
		syncStoreToDB();
		generateSiteGenData();
		handlePreviousStepTracking();
	}, [ location.pathname ] );

	return (
		<ThemeProvider>
			<ThemedNewfoldInterfaceSkeleton
				className={ 'nfd-onboarding-skeleton--sitegen' }
				header={ <Header /> }
				content={ <Content /> }
				sidebar={ <Sidebar /> }
				footer={ <ToggleDarkMode /> }
			/>
		</ThemeProvider>
	);
};

export default SiteGen;
