import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import { StepLoader } from '../../Loaders';
import { store as nfdOnboardingStore } from '../../../store';
import { getThemeStatus } from '../../../utils/api/themes';
import {
	THEME_STATUS_INIT,
	THEME_STATUS_INSTALLING,
	THEME_STATUS_NOT_ACTIVE,
	THEME_STATUS_ACTIVE,
	DESIGN_STEPS_THEME,
	THEME_INSTALL_WAIT_TIMEOUT,
} from '../../../../constants';
import { StepErrorState } from '../../ErrorState';
import getContents from './contents';

const DesignStateHandler = ( {
	children,
	navigationStateCallback = false,
} ) => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const { storedThemeStatus, brandName } = useSelect( ( select ) => {
		return {
			storedThemeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	}, [] );

	const contents = getContents( brandName );

	const {
		updateThemeStatus,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const checkThemeStatus = async () => {
		const themeStatus = await getThemeStatus( DESIGN_STEPS_THEME );
		if ( themeStatus?.error ) {
			return THEME_STATUS_NOT_ACTIVE;
		}
		return themeStatus.body.status;
	};

	const waitForInstall = () => {
		setTimeout( async () => {
			const themeStatus = await checkThemeStatus();
			if ( themeStatus !== THEME_STATUS_ACTIVE ) {
				return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
			}
			window.location.reload();
		}, THEME_INSTALL_WAIT_TIMEOUT );
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

	const handleNavigationState = ( themeStatus ) => {
		switch ( themeStatus ) {
			case THEME_STATUS_NOT_ACTIVE:
				return handleNavigationStateCallback();
			case THEME_STATUS_ACTIVE:
				return handleNavigationStateCallback();
			default:
				disableNavigation();
		}
	};

	useEffect( async () => {
		handleNavigationState( storedThemeStatus );

		if ( storedThemeStatus === THEME_STATUS_INIT ) {
			const themeStatus = await checkThemeStatus();
			switch ( themeStatus ) {
				case THEME_STATUS_INSTALLING:
					waitForInstall();
					break;
				case THEME_STATUS_ACTIVE:
					window.location.reload();
					break;
				default:
					updateThemeStatus( themeStatus );
			}
		}
	}, [ storedThemeStatus ] );

	const handleRender = () => {
		switch ( storedThemeStatus ) {
			case THEME_STATUS_NOT_ACTIVE:
				return (
					<StepErrorState
						title={ contents.errorState.title }
						subtitle={ contents.errorState.subtitle }
						error={ contents.errorState.error }
					/>
				);
			case THEME_STATUS_ACTIVE:
				return children;
			default:
				return (
					<StepLoader
						title={ contents.loader.title }
						subtitle={ contents.loader.subtitle }
					/>
				);
		}
	};

	return <Fragment>{ handleRender() }</Fragment>;
};

export default DesignStateHandler;
