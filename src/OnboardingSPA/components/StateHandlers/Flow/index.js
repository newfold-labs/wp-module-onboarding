import { useEffect, useState } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { getFirstEcommerceStep } from '../../../data/routes/ecommerce-flow';
import EcommerceStepLoader from '../../Loaders/Step/Ecommerce';
import { switchFlow } from '../../../utils/api/flow';
import { removeQueryParam } from '../../../utils';
import { MAX_RETRIES_FLOW_SWITCH } from '../../../../constants';
import { getFragment } from '@wordpress/url';

const FlowStateHandler = ( { children } ) => {
	const location = useLocation();
	const [ newFlow, setNewFlow ] = useState( false );

	const { brandConfig } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
		};
	}, [] );

	const {
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
	} = useDispatch( nfdOnboardingStore );

	const disableNavigation = () => {
		setIsDrawerOpened( false );
		setIsDrawerSuppressed( true );
		setIsHeaderNavigationEnabled( false );
		setSidebarActiveView( false );
	};

	const handleCommerceFlow = async ( flow, retries = 0 ) => {
		if ( retries >= MAX_RETRIES_FLOW_SWITCH ) {
			return setNewFlow( false );
		}
		const response = await switchFlow( flow );
		if ( response?.error ) {
			retries = retries + 1;
			return handleCommerceFlow( flow, retries );
		}
		const firstEcommerceStep = getFirstEcommerceStep();
		const fragment = getFragment( window.location.href );
		const redirect = removeQueryParam(
			window.location.href,
			'flow'
		).replace( fragment, '' );
		window.location.replace( `${ redirect }#${ firstEcommerceStep.path }` );
		window.location.reload();
	};

	const switchToNewFlow = async ( flow ) => {
		const enabledFlows = brandConfig?.enabled_flows ?? {};
		if ( ! ( flow in enabledFlows ) || enabledFlows[ flow ] !== true ) {
			return setNewFlow( false );
		}

		switch ( flow ) {
			case 'ecommerce':
				handleCommerceFlow( flow );
				break;
			default:
				setNewFlow( false );
		}
	};

	useEffect( () => {
		if ( window.nfdOnboarding?.newFlow ) {
			const flow = window.nfdOnboarding.newFlow;
			disableNavigation();
			setNewFlow( flow );
			switchToNewFlow( flow );
			window.nfdOnboarding.newFlow = undefined;
		}
	}, [ location.pathname ] );

	const handleRender = () => {
		switch ( newFlow ) {
			case 'ecommerce':
				return <EcommerceStepLoader />;
			default:
				return children;
		}
	};
	return <>{ handleRender() }</>;
};

export default FlowStateHandler;
