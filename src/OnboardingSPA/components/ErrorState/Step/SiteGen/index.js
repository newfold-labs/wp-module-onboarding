// WordPress
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, Fill } from '@wordpress/components';

// Third-party
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

// Classes and functions
import getContents from './contents';
import { validateFlow, removeFromAllSteps } from '../../../../data/flows/utils';
import { resolveGetDataForFlow } from '../../../../data/flows';

// Components
import CommonLayout from '../../../Layouts/Common';
import OrbAnimation from '../../../OrbAnimation';
import { stepSiteGenMigration } from '../../../../steps/SiteGen/Migration/step';

// Misc
import { store as nfdOnboardingStore } from '../../../../store';
import { SITEGEN_FLOW, DEFAULT_FLOW } from '../../../../data/flows/constants';
import {
	FOOTER_SITEGEN,
	FOOTER_END,
	HEADER_SITEGEN,
	pluginDashboardPage,
} from '../../../../../constants';
import { setFlow } from '../../../../utils/api/flow';

const SiteGenStepErrorState = () => {
	const navigate = useNavigate();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ disableRetry, setDisableRetry ] = useState( false );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setIsHeaderNavigationEnabled,
		updateAllSteps,
		updateTopSteps,
		updateRoutes,
		updateDesignRoutes,
		updateInitialize,
		setCurrentOnboardingData,
		updateSiteGenErrorStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
		setSidebarActiveView( false );
		setDisableRetry(
			currentData.sitegen?.siteGenErrorMeta?.retryCount >
				currentData.sitegen?.siteGenErrorMeta?.maxRetryCount
		);
	}, [] );

	const { brandConfig, currentData, currentStep, previousStep, allSteps } =
		useSelect( ( select ) => {
			return {
				brandConfig:
					select( nfdOnboardingStore ).getNewfoldBrandConfig(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				previousStep: select( nfdOnboardingStore ).getPreviousStep(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
			};
		} );

	const isMigrationStep = currentStep?.path === stepSiteGenMigration?.path;

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: DEFAULT_FLOW;
	const switchFlow = ( newFlow ) => {
		if ( ! validateFlow( brandConfig, newFlow ) ) {
			return false;
		}
		const currentFlow = window.nfdOnboarding.currentFlow;
		const getData = resolveGetDataForFlow( newFlow );
		const data = getData();
		updateAllSteps( data.steps );
		updateTopSteps( data?.topSteps );
		updateRoutes( data.routes );
		updateDesignRoutes( data?.designRoutes );
		if ( SITEGEN_FLOW !== currentFlow ) {
			window.nfdOnboarding.oldFlow = currentFlow;
		}

		window.nfdOnboarding.currentFlow = newFlow;
		currentData.activeFlow = newFlow;
		currentData.continueWithoutAi = true;
		setCurrentOnboardingData( currentData );
		if ( SITEGEN_FLOW !== newFlow ) {
			updateInitialize( true );
		}
		navigate( data.steps[ 1 ].path );
	};

	const handleRetry = async () => {
		updateSiteGenErrorStatus( false );
		await setFlow( currentData );
	};

	const handleGoBack = () => {
		updateSiteGenErrorStatus( false );
		const updates = removeFromAllSteps( allSteps, [
			stepSiteGenMigration,
		] );
		updateAllSteps( updates.allSteps );
		navigate( previousStep.path );
	};

	const content = ! isMigrationStep
		? getContents( 'siteGenErrorContent' )
		: getContents( 'siteMigrationErrorContent' );

	return (
		<CommonLayout
			className={ classNames( 'nfd-onboarding-step--site-gen__error', {
				'nfd-onboarding-step--site-gen__migrationerror':
					isMigrationStep,
			} ) }
		>
			<div className="nfd-onboarding-step--site-gen__error__container">
				<div className="nfd-onboarding-step--site-gen__error__container__orb">
					<OrbAnimation height={ `100px` } />
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__heading">
					<p className="nfd-onboarding-step--site-gen__error__container__heading__text">
						{ content.heading }
					</p>
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__sub-heading">
					<p className="nfd-onboarding-step--site-gen__error__container__sub-heading__text">
						{ content.subHeading }
					</p>
					<p className="nfd-onboarding-step--site-gen__error__container__sub-heading__message">
						{ content.message }
						{ ! isMigrationStep && (
							<a
								className="nfd-onboarding-step--site-gen__error__container__sub-heading__exit"
								href={ pluginDashboardPage }
							>
								{ content.buttonExit }
							</a>
						) }
					</p>
				</div>
				{ isMigrationStep ? (
					<div className="nfd-onboarding-step--site-gen__error__container__buttons">
						<Button
							className="nfd-onboarding-step--site-gen__error__container__buttons__skip"
							onClick={ () => {
								handleGoBack();
							} }
						>
							{ content.buttonExit }
						</Button>
						<Button
							className="nfd-onboarding-step--site-gen__error__container__buttons__retry"
							onClick={ () => {
								handleRetry();
							} }
						>
							<p className="nfd-onboarding-button--site-gen-next--text">
								{ content.buttonText }
							</p>
						</Button>
					</div>
				) : (
					<div className="nfd-onboarding-step--site-gen__error__container__buttons">
						<Button
							className="nfd-onboarding-step--site-gen__error__container__buttons__skip"
							onClick={ () => {
								switchFlow( oldFlow );
							} }
						>
							{ content.buttonSkip }
						</Button>
						{ isLargeViewport ? (
							<Button
								className="nfd-onboarding-step--site-gen__error__container__buttons__retry"
								onClick={ () => {
									handleRetry();
								} }
								disabled={ true === disableRetry }
							>
								<p className="nfd-onboarding-button--site-gen-next--text">
									{ content.buttonText }
								</p>
							</Button>
						) : (
							<Fill
								name={ `${ FOOTER_SITEGEN }/${ FOOTER_END }` }
							>
								<Button
									className="nfd-onboarding-step--site-gen__error__container__buttons__retry"
									onClick={ () => {
										handleRetry();
									} }
									disabled={ true === disableRetry }
								>
									<p className="nfd-onboarding-button--site-gen-next--text">
										{ content.buttonText }
									</p>
								</Button>
							</Fill>
						) }
					</div>
				) }
			</div>
		</CommonLayout>
	);
};

export default SiteGenStepErrorState;
