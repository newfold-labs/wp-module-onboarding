// Wordpress
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { chevronRight, external } from '@wordpress/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import CardHeader from '../../../components/CardHeader';
import NavCardButton from '../../../components/Button/NavCardButton';
import Tab from '../../../components/Tab';
import TabPanelHover from '../../../components/TabPanelHover';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import {
	VIEW_NAV_GET_STARTED,
	SIDEBAR_LEARN_MORE,
	HEADER_SITEBUILD,
} from '../../../../constants';
import getContents from './contents';
import ButtonWhite from '../../../components/Button/ButtonWhite';
import {
	injectMigrationStep,
	removeFromAllSteps,
} from '../../../data/flows/utils';
import { stepWelcome } from './step';
import { stepSiteGenMigration } from '../../../steps/SiteGen/Migration/step';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_SITEGEN_FORK_OPTION_SELECTED } from '../../../utils/analytics/hiive/constants';

const StepWelcome = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { brandName, migrationUrl, allSteps, canMigrateSite } = useSelect(
		( select ) => {
			return {
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
			};
		},
		[ location.pathname ]
	);
	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setHeaderActiveView,
		setIsHeaderEnabled,
		updateAllSteps,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsHeaderNavigationEnabled( true );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setHeaderActiveView( HEADER_SITEBUILD );
		setIsHeaderEnabled( true );
	}, [] );

	useEffect( () => {
		const updates = removeFromAllSteps( allSteps, [
			stepSiteGenMigration,
		] );
		updateAllSteps( updates.allSteps );
	}, [] );

	const handleMigration = () => {
		if ( canMigrateSite ) {
			const updates = injectMigrationStep( allSteps, stepWelcome );
			updateAllSteps( updates.allSteps );
			navigate( stepSiteGenMigration.path );
		} else {
			window.open( migrationUrl, '_blank' );
		}
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_SITEGEN_FORK_OPTION_SELECTED,
				'MIGRATE'
			)
		);
	};

	const content = getContents( brandName );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="welcome-card">
					<CardHeader
						heading={ content.heading }
						subHeading={ content.subheading }
					></CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={ content.tabs.map( ( tab ) => {
							return {
								name: tab.name,
								title: tab.title,
								content: (
									<Tab
										title={ tab.subtitle }
										text={ tab.text }
										imgType={ tab.imgType }
										animationName={ tab.animationName }
										className="tab-data"
									/>
								),
							};
						} ) }
					>
						{ ( tab ) => <div>{ tab.content }</div> }
					</TabPanelHover>
					<div className="nfd-onboarding-overview__buttons">
						{ ( migrationUrl || canMigrateSite ) && (
							<ButtonWhite
								className="nfd-onboarding-overview__buttons--white"
								text={ content.migrateButtonText }
								icon={ external }
								onClick={ () => {
									handleMigration( migrationUrl );
								} }
							/>
						) }
						<NavCardButton
							className="nfd-onboarding-overview__buttons--background"
							text={ content.startButtonText }
							icon={ chevronRight }
						></NavCardButton>
					</div>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
