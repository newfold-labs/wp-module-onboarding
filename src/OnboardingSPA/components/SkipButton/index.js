import { __ } from '@wordpress/i18n';
import { memo } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';

import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { pluginDashboardPage } from '../../../constants';
import { CATEGORY } from '../../utils/analytics/hiive/constants';
import classNames from 'classnames';

const SkipButton = ( { callback = false, className, text } ) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { nextStep, currentData, socialData } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			socialData: select( nfdOnboardingStore ).getOnboardingSocialData(),
		};
	}, [] );

	const isLastStep = null === nextStep || false === nextStep;
	const { setOnboardingSocialData } = useDispatch( nfdOnboardingStore );

	async function syncSocialSettingsFinish() {
		const initialData = await getSettings();
		const result = await setSettings( socialData );
		if ( result?.error !== null ) {
			return initialData?.body;
		}
		return result?.body;
	}

	async function saveData( path ) {
		if ( currentData ) {
			currentData.isComplete = new Date().getTime();

			// If Social Data is changed then sync it
			if ( path?.includes( 'basic-info' ) ) {
				const socialDataResp = await syncSocialSettingsFinish();

				// If Social Data is changed then Sync that also to the store
				if ( socialDataResp ) {
					setOnboardingSocialData( socialDataResp );
				}
				await HiiveAnalytics.dispatchEvents( CATEGORY );
			}
			setFlow( currentData );
		}

		window.location.replace( pluginDashboardPage );
	}

	function skip() {
		if ( typeof callback === 'function' ) {
			callback();
		}
		navigate( nextStep.path );
	}

	function skipStep() {
		return (
			<Button
				className={ classNames( 'skip-button', className ) }
				onClick={
					isLastStep
						? () => saveData( location.pathname )
						: () => skip()
				}
			>
				{ text ? text : __( 'Skip this Step', 'wp-module-onboarding' ) }
			</Button>
		);
	}

	return skipStep();
};

const SkipButtonMemo = memo( SkipButton );
export default SkipButtonMemo;
