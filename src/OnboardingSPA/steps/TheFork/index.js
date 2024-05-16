// WordPress
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';

// Classes and functions
import getContents from './contents';
import { injectMigrationStep } from '../../data/flows/utils';

// Components
import StartOptions from '../../components/StartOptions';
import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading/SiteGen/index';
import { stepSiteGenMigration } from '../../steps/SiteGen/Migration/step';
import { stepTheFork } from './step';

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
	const { migrationUrl, canMigrateSite, allSteps } = useSelect(
		( select ) => {
			return {
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				routes: select( nfdOnboardingStore ).getRoutes(),
			};
		}
	);
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
		updateAllSteps,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setFooterActiveView( FOOTER_SITEGEN );
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
	const content = getContents();
	const navigate = useNavigate();

	const handleMigration = () => {
		if ( canMigrateSite ) {
			const updates = injectMigrationStep( allSteps, stepTheFork );
			updateAllSteps( updates.allSteps );
			navigate( stepSiteGenMigration.path );
		} else {
			window.open( migrationUrl, '_blank' );
		}
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_SITEGEN_FORK_OPTION_SELECTED,
				'MIGRATE'
			)
		);
	};

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
				options={ content.options }
			/>
			<br />
			<br />
			{ ( canMigrateSite || migrationUrl ) && (
				<div
					className="nfd-onboarding-step--site-gen__fork__importsite"
					onClick={ () => {
						handleMigration();
					} }
					onKeyUp={ ( event ) => {
						if ( event.key === 'Enter' ) {
							handleMigration();
						}
					} }
					tabIndex={ 0 }
					role="button"
					aria-label="Trigger site migration"
				>
					{ content.importtext }
				</div>
			) }
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
