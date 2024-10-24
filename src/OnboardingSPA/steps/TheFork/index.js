// WordPress
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Classes and functions
import getContents from './contents';
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
import { ACTION_SITEGEN_FORK_OPTION_SELECTED } from '../../utils/analytics/hiive/constants';
import { store as nfdOnboardingStore } from '../../store';
import { DEFAULT_FLOW } from '../../data/flows/constants';

const TheFork = () => {
	const { migrationUrl, canMigrateSite, pluginInstallHash } =
		useSelect( ( select ) => {
			return {
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
	} );

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
			/>
			<span
				role="button"
				tabIndex={ 0 }
				className="nfd-onboarding-step--site-gen__fork__exit"
				onClick={ () => handleForkExit() }
				onKeyDown={ () => handleForkExit() }
			>
				{ content.exitToWordPress }
			</span>
		</CommonLayout>
	);
};

export default TheFork;
