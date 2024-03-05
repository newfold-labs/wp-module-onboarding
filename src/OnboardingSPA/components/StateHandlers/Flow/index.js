import { useEffect, useState } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { getFragment } from '@wordpress/url';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';

import { store as nfdOnboardingStore } from '../../../store';
import { switchFlow } from '../../../utils/api/flow';
import { MAX_RETRIES_FLOW_SWITCH } from '../../../../constants';
import {
	DEFAULT_FLOW,
	ECOMMERCE_FLOW,
	SITEGEN_FLOW,
} from '../../../data/flows/constants';
import { removeQueryParam } from '../../../utils';
import { commerce } from '../../../chapters/commerce';
import EcommerceStepLoader from '../../Loaders/Step/Ecommerce';
import SiteBuild from '../../NewfoldInterfaceSkeleton/SiteBuild';
import SiteGen from '../../NewfoldInterfaceSkeleton/SiteGen';
import {
	validateFlow,
	removeFromAllSteps,
	removeFromTopSteps,
	removeFromRoutes,
} from '../../../data/flows/utils';
import { resolveGetDataForFlow } from '../../../data/flows';
import { stepTheFork } from '../../../steps/TheFork/step';

const FlowStateHandler = () => {
	const location = useLocation();
	const [ newFlow, setNewFlow ] = useState( false );

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
	} = useDispatch( nfdOnboardingStore );

	const handleCommerceFlow = async ( flow, retries = 0 ) => {
		if ( retries >= MAX_RETRIES_FLOW_SWITCH ) {
			return setNewFlow( false );
		}
		const response = await switchFlow( flow );
		if ( response?.error ) {
			retries = retries + 1;
			return handleCommerceFlow( flow, retries );
		}
		await HiiveAnalytics.dispatchEvents();

		// TODO: Remove code below once Chapter Prioritization is enabled.
		const firstEcommerceStep = commerce.steps[ 0 ];
		const fragment = getFragment( window.location.href );
		const redirect = removeQueryParam(
			window.location.href,
			'flow'
		).replace( fragment, '' );
		window.location.replace( `${ redirect }#${ firstEcommerceStep.path }` );
		window.location.reload();
	};

	const switchToNewFlow = async ( flow ) => {
		if ( ! validateFlow( brandConfig, flow ) ) {
			return;
		}

		switch ( flow ) {
			case ECOMMERCE_FLOW:
				return handleCommerceFlow( flow );
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
		}
	};

	useEffect( () => {
		if ( window.nfdOnboarding?.newFlow ) {
			const flow = window.nfdOnboarding.newFlow;
			disableNavigation();
			setNewFlow( flow );
			switchToNewFlow( flow );
			window.nfdOnboarding.newFlow = undefined;
		} else if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname ] );

	// TODO: Remove handleRender and replace with only children once Chapter Prioritization is enabled.
	const handleRender = () => {
		switch ( newFlow ) {
			case ECOMMERCE_FLOW:
				return <EcommerceStepLoader />;
		}

		switch ( window.nfdOnboarding.currentFlow ) {
			case DEFAULT_FLOW:
			case ECOMMERCE_FLOW:
				checkCapability();
				return <SiteBuild />;
			case SITEGEN_FLOW:
				return <SiteGen />;
		}
	};

	return <>{ handleRender() }</>;
};

export default FlowStateHandler;
