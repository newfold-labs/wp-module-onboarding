import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { StepLoader } from '../../Loaders';
import { store as nfdOnboardingStore } from '../../../store';
import {
	expedite,
	getThemeStatus,
	install as installTheme,
} from '../../../utils/api/themes';
import {
	THEME_STATUS_INIT,
	THEME_STATUS_INSTALLING,
	THEME_STATUS_NOT_ACTIVE,
	THEME_STATUS_ACTIVE,
	DESIGN_STEPS_THEME,
	THEME_STATUS_FAILURE,
} from '../../../../constants';
import { StepErrorState } from '../../ErrorState';
import getContents from './contents';
import ExitToWordPress from '../../ExitToWordPress';

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

	const expediteInstall = async () => {
		const status = await expedite( DESIGN_STEPS_THEME );
		if ( ! status.error ) {
			window.location.reload();
			return;
		}

		installThemeManually();
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

	const handleNavigationState = () => {
		switch ( storedThemeStatus ) {
			case THEME_STATUS_FAILURE:
			case THEME_STATUS_ACTIVE:
				return handleNavigationStateCallback();
			default:
				disableNavigation();
		}
	};

	const handleThemeStatus = async () => {
		const themeStatus = await checkThemeStatus();
		switch ( themeStatus ) {
			case THEME_STATUS_INSTALLING:
				expediteInstall();
				break;
			case THEME_STATUS_ACTIVE:
				window.location.reload();
				break;
			default:
				updateThemeStatus( themeStatus );
		}
	};

	useEffect( () => {
		handleNavigationState();

		if ( storedThemeStatus === THEME_STATUS_INIT ) {
			handleThemeStatus( storedThemeStatus );
		}
	}, [ storedThemeStatus ] );

	const installThemeManually = async () => {
		updateThemeStatus( THEME_STATUS_INSTALLING );
		const themeInstallStatus = await installTheme(
			DESIGN_STEPS_THEME,
			true,
			false
		);
		if ( themeInstallStatus.error ) {
			return updateThemeStatus( THEME_STATUS_FAILURE );
		}

		return window.location.reload();
	};

	const handleRender = () => {
		switch ( storedThemeStatus ) {
			case THEME_STATUS_NOT_ACTIVE:
				return (
					<ExitToWordPress
						showButton={ false }
						isModalOpen={ true }
						modalTitle={ __(
							'It looks like you may have an existing website',
							'wp-module-onboarding'
						) }
						modalText={ __(
							'Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?',
							'wp-module-onboarding'
						) }
						modalOnClose={ installThemeManually }
						modalExitButtonText={ __(
							'Exit to WordPress',
							'wp-module-onboarding'
						) }
					/>
				);
			case THEME_STATUS_FAILURE:
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
