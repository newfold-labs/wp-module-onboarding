import CommonLayout from '../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import {
	FOOTER_SITEGEN,
	HEADER_SITEGEN,
	pluginDashboardPage,
} from '../../../constants';

import { DEFAULT_FLOW, SITEGEN_FLOW } from '../../data/flows/constants';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading/SiteGen/index';
import StartOptions from '../../components/StartOptions';
import getContents from './contents';
import SitegenAiStateHandler from '../../components/StateHandlers/SitegenAi';
import { validateFlow } from '../../data/flows/utils';
import { resolveGetDataForFlow } from '../../data/flows';
import { useNavigate } from 'react-router-dom';

const TheFork = () => {
	const { migrationUrl, brandConfig, currentData } = useSelect(
		( select ) => {
			return {
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
				brandConfig:
					select( nfdOnboardingStore ).getNewfoldBrandConfig(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
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
		updateTopSteps,
		updateRoutes,
		updateDesignRoutes,
		updateInitialize,
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
	} );
	const navigate = useNavigate();
	useEffect( () => {
		if ( false === validateFlow( brandConfig, SITEGEN_FLOW ) ) {
			const currentFlow = window.nfdOnboarding.currentFlow;
			const getData = resolveGetDataForFlow( DEFAULT_FLOW );
			const data = getData();
			updateAllSteps( data.steps );
			updateTopSteps( data?.topSteps );
			updateRoutes( data.routes );
			updateDesignRoutes( data?.designRoutes );
			if ( SITEGEN_FLOW !== currentFlow ) {
				window.nfdOnboarding.oldFlow = currentFlow;
			}
			window.nfdOnboarding.currentFlow = DEFAULT_FLOW;
			currentData.activeFlow = DEFAULT_FLOW;
			setCurrentOnboardingData( currentData );
			updateInitialize( true );
			navigate( data.steps[ 1 ].path );
		}
	} );

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: DEFAULT_FLOW;

	const content = getContents();
	return (
		<SitegenAiStateHandler>
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
				{ migrationUrl && (
					<a
						className="nfd-onboarding-step--site-gen__fork__importsite"
						href={ migrationUrl }
						target={ '_blank' }
						rel={ 'noreferrer' }
					>
						{ content.importtext }
					</a>
				) }
				<a
					className="nfd-onboarding-step--site-gen__fork__exit"
					href={ pluginDashboardPage }
				>
					{ content.exitToWordPress }
				</a>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default TheFork;
