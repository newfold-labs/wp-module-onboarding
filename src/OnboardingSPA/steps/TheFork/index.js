// WordPress
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Classes and functions
import getContents from './contents';

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
	trackOnboardingEvent,
} from '../../utils/analytics/hiive';
import { store as nfdOnboardingStore } from '../../store';
import { DEFAULT_FLOW } from '../../data/flows/constants';
import { ACTION_SITEGEN_FORK_OPTION_SELECTED } from '../../utils/analytics/hiive/constants';
import { setFlow } from '../../utils/api/flow';

const TheFork = () => {
	const [ experimentVersion, setExperimentVersion ] = useState();
	const { currentData, migrationUrl } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
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
		handleExperimentVersion();
	} );

	const handleExperimentVersion = async () => {
		// theForkExperimentVersion
		if ( currentData.sitegen.theForkExperimentVersion !== 0 ) {
			// Use an existing experiment version if it exists
			setExperimentVersion(
				currentData.sitegen.theForkExperimentVersion
			);
		} else {
			// Generate a random experiment version from 1 to 4
			const randomExperimentVersion = Math.floor( Math.random() * 5 );
			setExperimentVersion( randomExperimentVersion );

			// Sync that to the store and DB for same version on refresh
			currentData.sitegen.theForkExperimentVersion =
				randomExperimentVersion;
			setCurrentOnboardingData( currentData );
			await setFlow( currentData );
		}
	};

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
				experimentVersion={ experimentVersion }
				questionnaire={ content.questionnaire }
				oldFlow={ oldFlow }
				options={ content.options }
			/>
			<br />
			<br />
			{ migrationUrl && (
				<a
					className="nfd-onboarding-step--site-gen__fork__importsite"
					href={ migrationUrl }
					target={ '_blank' }
					rel={ 'noreferrer' }
					onClick={ () =>
						trackOnboardingEvent(
							new OnboardingEvent(
								ACTION_SITEGEN_FORK_OPTION_SELECTED,
								'MIGRATE'
							)
						)
					}
				>
					{ content.importtext }
				</a>
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
