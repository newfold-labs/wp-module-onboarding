// WordPress
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Third-party
import { useLocation } from 'react-router-dom';

// Classes and functions
import {
	validateFlow,
	removeFromAllSteps,
	removeFromTopSteps,
	removeFromRoutes,
} from '../../../data/flows/utils';
import { resolveGetDataForFlow } from '../../../data/flows';

// Components
import SiteBuild from '../../NewfoldInterfaceSkeleton/SiteBuild';
import SiteGen from '../../NewfoldInterfaceSkeleton/SiteGen';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import { DEFAULT_FLOW, SITEGEN_FLOW } from '../../../data/flows/constants';
import { stepTheFork } from '../../../steps/TheFork/step';

const FlowStateHandler = () => {
	const { brandConfig, onboardingFlow } = useSelect( ( select ) => {
		return {
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			onboardingFlow: select( nfdOnboardingStore ).getOnboardingFlow(),
		};
	}, [] );

	const {
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		setActiveFlow,
		setActiveStep,
		updateAllSteps,
		updateTopSteps,
		updateRoutes,
		updateInitialize,
	} = useDispatch( nfdOnboardingStore );

	const location = useLocation();

	useEffect( () => {
		if ( window.nfdOnboarding?.newFlow ) {
			const flow = window.nfdOnboarding.newFlow;
			disableNavigation();
			switchToNewFlow( flow );
			window.nfdOnboarding.newFlow = undefined;
		} else if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname ] );

	const switchToNewFlow = async ( flow ) => {
		if ( ! validateFlow( brandConfig, flow ) ) {
			return Promise.resolve();
		}
	};

	const disableNavigation = () => {
		setIsDrawerOpened( false );
		setIsDrawerSuppressed( true );
		setIsHeaderNavigationEnabled( false );
		setSidebarActiveView( false );
	};

	const checkCapability = () => {
		if ( ! validateFlow( brandConfig, SITEGEN_FLOW ) ) {
			const getData = resolveGetDataForFlow(
				window.nfdOnboarding.currentFlow
			);
			const data = getData();

			const updateAllStep = removeFromAllSteps( data.steps, [
				stepTheFork,
			] );
			updateAllSteps( updateAllStep.allSteps );

			const updateTopStep = removeFromTopSteps( data?.topSteps, [
				stepTheFork,
			] );
			updateTopSteps( updateTopStep.topSteps );

			const updateRoute = removeFromRoutes( data.routes, [
				stepTheFork,
			] );
			updateRoutes( updateRoute.routes );
			updateInitialize( true );
		}
	};

	// TODO: Remove handleRender and replace with only children once Chapter Prioritization is enabled.
	const handleRender = () => {
		switch ( window.nfdOnboarding.currentFlow ) {
			case DEFAULT_FLOW:
				checkCapability();
				return <SiteBuild />;
			case SITEGEN_FLOW:
				return <SiteGen />;
			default:
				// Default to SiteBuild for any unrecognized flow
				checkCapability();
				return <SiteBuild />;
		}
	};

	return <>{ handleRender() }</>;
};

export default FlowStateHandler;
