import { store as nfdOnboardingStore } from '../../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { chevronRight, external } from '@wordpress/icons';

import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import CardHeader from '../../../components/CardHeader';
import NavCardButton from '../../../components/Button/NavCardButton';
import Tab from '../../../components/Tab';
import TabPanelHover from '../../../components/TabPanelHover';
import {
	VIEW_NAV_GET_STARTED,
	SIDEBAR_LEARN_MORE,
	HEADER_SITEBUILD,
} from '../../../../constants';
import getContents from './contents';
import ButtonWhite from '../../../components/Button/ButtonWhite';
import {
	injectMigrationStep,
	addToRoutes,
	removeFromRoutes,
	removeFromAllSteps,
} from '../../../data/flows/utils';
import { stepWelcome } from './step';
import { stepSiteGenMigration } from '../../../steps/SiteGen/Migration/step';

const StepWelcome = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		brandName,
		migrationUrl,
		allSteps,
		canMigrateSite,
		currentStep,
		routes,
	} = useSelect(
		( select ) => {
			return {
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				routes: select( nfdOnboardingStore ).getRoutes(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
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
		updateRoutes,
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
		const updateRoute = removeFromRoutes( routes, [
			stepSiteGenMigration,
		] );
		updateRoutes( updateRoute.routes );
		const updates = removeFromAllSteps( allSteps, [
			stepSiteGenMigration,
		] );
		updateAllSteps( updates.allSteps );
	}, [] );

	const handleMigration = () => {
		if ( canMigrateSite ) {
			const updates = injectMigrationStep( allSteps, stepWelcome );
			updateAllSteps( updates.allSteps );
			const addedRoute = addToRoutes(
				routes,
				stepSiteGenMigration,
				currentStep
			);
			updateRoutes( addedRoute.routes );
			navigate( stepSiteGenMigration.path );
		} else if ( migrationUrl ) {
			window.open( migrationUrl, '_blank' );
		} else {
			return false;
		}
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
