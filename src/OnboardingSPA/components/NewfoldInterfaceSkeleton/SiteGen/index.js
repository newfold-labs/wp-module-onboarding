import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import themeToggleHOC from '../themeToggleHOC';
import NewfoldInterfaceSkeleton from '../index';
import ToggleDarkMode from '../../ToggleDarkMode';
import { ThemeProvider } from '../../ThemeContextProvider';
import { store as nfdOnboardingStore } from '../../../store';
import { setFlow } from '../../../utils/api/flow';

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

	async function syncStoreToDB() {
		if ( currentData ) {
			//Set the Flow Data and sync store and DB
			setFlow( currentData );
		}
	}

	async function generateSiteGenData() {
		// TODO Implement SiteGen Sync
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

		const previousStepPath = previousStep.path;

		if ( previousStepPath.includes( 'site-details' ) ) {
			generateSiteGenData();
		}

		window.nfdOnboarding.previousStep = {
			path: location.pathname,
			url: window.location.href,
		};
	};

	useEffect( () => {
		syncStoreToDB();
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
