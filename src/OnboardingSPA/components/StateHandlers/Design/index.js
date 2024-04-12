import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

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
import { setFlow } from '../../../utils/api/flow';

const DesignStateHandler = ( {
	children,
	navigationStateCallback = false,
	refresh = true,
	render = true,
} ) => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const { storedThemeStatus, brandName, isFreshInstallation, currentData } =
		useSelect( ( select ) => {
			return {
				storedThemeStatus:
					select( nfdOnboardingStore ).getThemeStatus(),
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				isFreshInstallation:
					select( nfdOnboardingStore ).getIsFreshInstallation(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
			};
		}, [] );

	const contents = getContents( brandName );

	const {
		updateThemeStatus,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setCurrentOnboardingData,
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
		if ( ! status.error && true === refresh ) {
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
				if ( true === refresh ) {
					window.location.reload();
				}
				break;
			case THEME_STATUS_NOT_ACTIVE:
				installThemeManually();
				break;
			default:
				updateThemeStatus( themeStatus );
		}
	};

	useEffect( () => {
		handleNavigationState();

		if (
			true === render &&
			! isFreshInstallation &&
			currentData.data.siteOverrideConsent === false
		) {
			return;
		}

		if ( storedThemeStatus === THEME_STATUS_INIT ) {
			handleThemeStatus( storedThemeStatus );
		}
	}, [ storedThemeStatus, isFreshInstallation, currentData ] );

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

		if ( true === refresh ) {
			window.location.reload();
		}
	};

	const handleModalClose = () => {
		currentData.data.siteOverrideConsent = true;
		setCurrentOnboardingData( currentData );
		setFlow( currentData );
	};

	const handleRender = () => {
		if (
			! isFreshInstallation &&
			currentData.data.siteOverrideConsent === false
		) {
			return (
				<ExitToWordPress
					showButton={ false }
					isModalOpen={ true }
					modalTitle={ contents.exitModal.title }
					modalText={ contents.exitModal.description }
					modalOnClose={ handleModalClose }
					modalExitButtonText={ contents.exitModal.buttonText }
				/>
			);
		}
		switch ( storedThemeStatus ) {
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

	return <Fragment>{ render ? handleRender() : children }</Fragment>;
};

export default DesignStateHandler;
