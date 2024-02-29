import { useViewportMatch } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import getContents from './contents';
import { Button, Fill } from '@wordpress/components';
import { store as nfdOnboardingStore } from '../../store';
import CommonLayout from '../Layouts/Common';
import OrbAnimation from '../OrbAnimation';
import { SITEGEN_FLOW, DEFAULT_FLOW } from '../../data/flows/constants';
import { validateFlow } from '../../data/flows/utils';
import { resolveGetDataForFlow } from '../../data/flows';
import { useNavigate } from 'react-router-dom';
import {
	FOOTER_SITEGEN,
	FOOTER_END,
	HEADER_SITEGEN,
	pluginDashboardPage,
} from '../../../constants';

const SiteGenSiteError = () => {
	const navigate = useNavigate();
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
		setContinueWithoutAi,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
	} );

	const { brandConfig, currentData } = useSelect( ( select ) => {
		return {
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );
	const isLargeViewport = useViewportMatch( 'small' );

	const content = getContents();
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
		updateSiteGenErrorStatus( false );
		if ( SITEGEN_FLOW !== newFlow ) {
			updateInitialize( true );
		}
		navigate( data.steps[ 1 ].path );
	};
	const handleRetry = () => {
		updateSiteGenErrorStatus( false );
	};
	return (
		<CommonLayout className="nfd-onboarding-step--site-gen__error">
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
						<a
							className="nfd-onboarding-step--site-gen__error__container__sub-heading__exit"
							href={ pluginDashboardPage }
						>
							{ content.buttonExit }
						</a>
					</p>
				</div>
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
						>
							<p className="nfd-onboarding-button--site-gen-next--text">
								{ content.buttonText }
							</p>
						</Button>
					) : (
						<Fill name={ `${ FOOTER_SITEGEN }/${ FOOTER_END }` }>
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
						</Fill>
					) }
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteError;
