import { __ } from '@wordpress/i18n';
import { memo } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useLocation, useNavigate } from 'react-router-dom';

import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, pluginDashboardPage } from '../../../constants';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { CATEGORY } from '../../utils/analytics/hiive/constants';

const SkipButton = ( { callback = false } ) => {
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
		// Redirect to Admin Page for normal customers
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce()
			? pluginDashboardPage
			: wpAdminPage;
		window.location.replace( exitLink );
	}

	function skip() {
		if ( typeof callback === 'function' ) {
			callback();
		}
		navigate( nextStep.path );
	}

	function skipStep() {
		if ( isLastStep ) {
			return (
				<Button
					className="skip-button"
					onClick={ () => saveData( location.pathname ) }
				>
					{ __( 'Skip this Step', 'wp-module-onboarding' ) }
				</Button>
			);
		}
		return (
			<Button className="skip-button" onClick={ () => skip() }>
				{ __( 'Skip this Step', 'wp-module-onboarding' ) }
			</Button>
		);
	}

	return skipStep();
};

/*
 * check if this is the last step
 */
const exitToWordpressForEcommerce = () => {
	if ( window.nfdOnboarding.currentFlow === 'ecommerce' ) {
		return true;
	}
	return false;
};

const SkipButtonMemo = memo( SkipButton );
export default SkipButtonMemo;
