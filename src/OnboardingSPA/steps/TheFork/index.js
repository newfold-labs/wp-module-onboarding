// WordPress
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Classes and functions
import getContents from './contents';
import { setFlow } from '../../utils/api/flow';
import { init as initializePlugins } from '../../utils/api/plugins';

// Components
import StartOptions from '../../components/StartOptions';
import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading/SiteGen/index';

// Misc
import {
	FOOTER_SITEGEN,
	HEADER_SITEGEN,
	pluginDashboardPage,
} from '../../../constants';
import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../utils/analytics/hiive';
import {
	ACTION_SITEGEN_FORK_AI_EXPERIMENT,
	ACTION_SITEGEN_FORK_OPTION_SELECTED,
	CATEGORY_EXPERIMENT,
	ACTION_ONBOARDING_RESTARTED,
} from '../../utils/analytics/hiive/constants';
import { store as nfdOnboardingStore } from '../../store';
import { DEFAULT_FLOW } from '../../data/flows/constants';

const TheFork = () => {
	const [ experimentVersion, setExperimentVersion ] = useState();
	const { currentData, migrationUrl, canMigrateSite, pluginInstallHash } =
		useSelect( ( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				routes: select( nfdOnboardingStore ).getRoutes(),
				pluginInstallHash:
					select( nfdOnboardingStore ).getPluginInstallHash(),
			};
		} );
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setFooterActiveView( FOOTER_SITEGEN );
		initializePlugins( pluginInstallHash );
		handleExperimentVersion();
	} );

	const handleExperimentVersion = async () => {
		// setting the experiment version to 2 so that DIY onboarding is always hidden
		const theForkExperimentVersion = 2;
		setExperimentVersion( theForkExperimentVersion );
		if ( ! currentData.sitegen.theForkExperimentVersion ) {
			// Sync that to the store and DB for same version on refresh
			currentData.sitegen.theForkExperimentVersion = theForkExperimentVersion;
			setCurrentOnboardingData( currentData );
			await setFlow( currentData );

			// Send an event for the experiment version shown to the user.
			sendOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_FORK_AI_EXPERIMENT,
					'hidden', // this event shows that the DIY onboarding was not shown
					null,
					null,
					CATEGORY_EXPERIMENT
				)
			);
		}
	};

	useEffect( () => {
		const url = new URL( window.location );
		const restartParam = url.searchParams.get( 'restart' );

		if ( restartParam ) {
			// Remove the query parameter from the URL so it doesn't send events on refresh
			url.searchParams.delete( 'restart' );

			// Use the history API to update the URL without reloading the page
			window.history.pushState( {}, '', url.toString() );
			sendOnboardingEvent(
				new OnboardingEvent( ACTION_ONBOARDING_RESTARTED, restartParam )
			);
		}
	}, [] );

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: DEFAULT_FLOW;

	const handleForkExit = () => {
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_SITEGEN_FORK_OPTION_SELECTED,
				'TUTORIAL'
			)
		);

		window.location.replace( pluginDashboardPage );
	};

	const content = getContents( canMigrateSite, migrationUrl );

	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__fork"
		>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
			<StartOptions
				questionnaire={ content.questionnaire }
				oldFlow={ oldFlow }
				largeOption={ content.largerOption }
				smallOptions={ content.smallerOptions }
				experimentVersion={ experimentVersion }
			/>
			{ experimentVersion === 1 && (
				<span
					role="button"
					tabIndex={ 0 }
					className="nfd-onboarding-step--site-gen__fork__exit"
					onClick={ () => handleForkExit() }
					onKeyDown={ () => handleForkExit() }
				>
					{ content.exitToWordPress }
				</span>
			) }
		</CommonLayout>
	);
};

export default TheFork;
