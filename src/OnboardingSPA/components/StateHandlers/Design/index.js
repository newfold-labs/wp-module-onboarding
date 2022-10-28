import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

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

const DesignStateHandler = ( { children } ) => {
	const { storedThemeStatus } = useSelect( ( select ) => {
		return {
			storedThemeStatus: select( nfdOnboardingStore ).getThemeStatus(),
		};
	}, [] );

	const { updateThemeStatus } = useDispatch( nfdOnboardingStore );

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

	useEffect( async () => {
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
						title={ __(
							'Preparing your Bluehost design studio',
							'wp-module-onboarding'
						) }
						subtitle={ __(
							'Hang tight while we show you some of the best WordPress has to offer!',
							'wp-module-onboarding'
						) }
						error={ __(
							'Uh-oh, something went wrong. Please contact support.',
							'wp-module-onboarding'
						) }
					/>
				);
			case THEME_STATUS_ACTIVE:
				return children;
			default:
				return (
					<StepLoader
						title={ __(
							'Preparing your Bluehost design studio',
							'wp-module-onboarding'
						) }
						subtitle={ __(
							'Hang tight while we show you some of the best WordPress has to offer!',
							'wp-module-onboarding'
						) }
					/>
				);
		}
	};

	return <Fragment>{ handleRender() }</Fragment>;
};

export default DesignStateHandler;
