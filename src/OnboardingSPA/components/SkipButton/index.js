import { __ } from '@wordpress/i18n';
import { memo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { useLocation, useNavigate } from 'react-router-dom';

import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, dashboardPage } from '../../../constants';

/**
 * Interface Text Inputs with standard design.
 *
 * @return {WPComponent} SkipButton Component
 */
const SkipButton = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { nextStep, currentData } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const isLastStep = null === nextStep || false === nextStep;

	async function syncSocialSettingsFinish() {
		const initialData = await getSettings();
		const result = await setSettings( currentData?.data?.socialData );
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
				const socialData = await syncSocialSettingsFinish(
					currentData
				);

				// If Social Data is changed then Sync that also to the store
				if ( socialData && currentData?.data ) {
					currentData.data.socialData = socialData;
				}
			}
			setFlow( currentData );
		}
		// Redirect to Admin Page for normal customers
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce()
			? dashboardPage
			: wpAdminPage;
		window.location.replace( exitLink );
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
			<Button
				className="skip-button"
				onClick={ () => navigate( nextStep.path ) }
			>
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
