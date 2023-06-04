import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getPluginStatus } from '../../../utils/api/plugins';
import {
	PLUGIN_STATUS_INIT,
	PLUGIN_STATUS_INSTALLING,
	PLUGIN_STATUS_NOT_ACTIVE,
	PLUGIN_STATUS_ACTIVE,
	ECOMMERCE_STEPS_PLUGIN,
	PLUGIN_INSTALL_WAIT_TIMEOUT,
} from '../../../../constants';
import { StepErrorState } from '../../ErrorState';
import getContents from './contents';
import EcommerceStepLoader from '../../Loaders/Step/Ecommerce';

const EcommerceStateHandler = ( {
	children,
	navigationStateCallback = false,
} ) => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const { storedPluginsStatus, brandName } = useSelect( ( select ) => {
		return {
			storedPluginsStatus:
				select( nfdOnboardingStore ).getPluginsStatus(),
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	}, [] );

	const contents = getContents( brandName );
	const woocommerceStatus = storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ];

	const {
		updatePluginsStatus,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const checkPluginStatus = async () => {
		const pluginStatus = await getPluginStatus( ECOMMERCE_STEPS_PLUGIN );
		if ( pluginStatus?.error ) {
			return PLUGIN_STATUS_NOT_ACTIVE;
		}
		return pluginStatus.body.status;
	};

	const waitForInstall = () => {
		setTimeout( async () => {
			const pluginStatus = await checkPluginStatus();
			if ( pluginStatus !== PLUGIN_STATUS_ACTIVE ) {
				storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] =
					PLUGIN_STATUS_NOT_ACTIVE;
				updatePluginsStatus( storedPluginsStatus );
			}
			window.location.reload();
		}, PLUGIN_INSTALL_WAIT_TIMEOUT );
	};

	const enableNavigation = () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsDrawerSuppressed( false );
		setIsHeaderNavigationEnabled( true );
	};

	const disableNavigation = () => {
		setIsDrawerOpened( false );
		setIsDrawerSuppressed( true );
		setIsHeaderNavigationEnabled( false );
	};

	const handleNavigationStateCallback = () => {
		if ( typeof navigationStateCallback === 'function' ) {
			return navigationStateCallback();
		}
		enableNavigation();
	};

	const handleNavigationState = ( pluginStatus ) => {
		switch ( pluginStatus ) {
			case PLUGIN_STATUS_NOT_ACTIVE:
				return handleNavigationStateCallback();
			case PLUGIN_STATUS_ACTIVE:
				return handleNavigationStateCallback();
			default:
				disableNavigation();
		}
	};

	useEffect( () => {
		handleNavigationState( woocommerceStatus );
	}, [ storedPluginsStatus ] );

	const handlePluginsStatus = async ( pluginsStatus ) => {
		const pluginStatus = await checkPluginStatus();
		switch ( pluginStatus ) {
			case PLUGIN_STATUS_INSTALLING:
				waitForInstall();
				break;
			case PLUGIN_STATUS_ACTIVE:
				window.location.reload();
				break;
			default:
				pluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] = pluginStatus;
				updatePluginsStatus( pluginsStatus );
		}
	};

	useEffect( () => {
		if (
			storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] === PLUGIN_STATUS_INIT
		) {
			handlePluginsStatus( storedPluginsStatus );
		}
	}, [ storedPluginsStatus ] );

	const handleRender = () => {
		switch ( woocommerceStatus ) {
			case PLUGIN_STATUS_NOT_ACTIVE:
				return (
					<StepErrorState
						title={ contents.errorState.title }
						subtitle={ contents.errorState.subtitle }
						error={ contents.errorState.error }
					/>
				);
			case PLUGIN_STATUS_ACTIVE:
				return children;
			default:
				return <EcommerceStepLoader />;
		}
	};

	return <>{ handleRender() }</>;
};

export default EcommerceStateHandler;
