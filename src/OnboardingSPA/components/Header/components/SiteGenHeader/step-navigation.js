import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Icon, chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import ButtonDark from '../../../Button/ButtonDark';
import { stepSiteGenPreview } from '../../../../steps/SiteGen/Preview/step';
import { stepSiteGenSiteLogo } from '../../../../steps/SiteGen/SiteLogo/step';

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const Back = ( { path, showErrorDialog } ) => {
	const { setNavErrorContinuePath, updateSiteGenErrorStatus } =
		useDispatch( nfdOnboardingStore );
	const navigate = useNavigate();
	const navigateBack = () => {
		updateSiteGenErrorStatus( false );
		if ( showErrorDialog !== false ) {
			setNavErrorContinuePath( path );
		} else {
			navigate( path, { state: { origin: 'header' } } );
		}
	};
	return (
		<ButtonDark onClick={ navigateBack } variant="secondary">
			<Icon icon={ chevronLeft } />
			{ __( 'Back', 'wp-module-onboarding' ) }
		</ButtonDark>
	);
};

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigation = () => {
	const { previousStep, currentStep, showErrorDialog } = useSelect(
		( select ) => {
			return {
				previousStep: select( nfdOnboardingStore ).getPreviousStep(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				showErrorDialog:
					select( nfdOnboardingStore ).getShowErrorDialog(),
			};
		},
		[]
	);
	const isFirstStep = null === previousStep || false === previousStep;
	const isPreviewStep = currentStep.path === stepSiteGenPreview.path;
	return (
		<div className="nfd-onboarding-header--sitegen__step-navigation">
			{ isFirstStep ? null : (
				<Back
					path={
						isPreviewStep
							? stepSiteGenSiteLogo.path
							: previousStep.path
					}
					showErrorDialog={ showErrorDialog }
				/>
			) }
		</div>
	);
};

export default StepNavigation;
