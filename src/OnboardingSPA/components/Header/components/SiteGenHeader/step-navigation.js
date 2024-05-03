// WordPress
import { useSelect, useDispatch } from '@wordpress/data';
import { Icon, chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

// Third-party
import { useNavigate } from 'react-router-dom';

// Components
import ButtonDark from '../../../Button/ButtonDark';

// Misc
import { store as nfdOnboardingStore } from '../../../../store';
import { stepSiteGenPreview } from '../../../../steps/SiteGen/Preview/step';
import { stepSiteGenSiteLogo } from '../../../../steps/SiteGen/SiteLogo/step';

const Back = ( { path } ) => {
	const { siteGenErrorStatus } = useSelect( ( select ) => {
		return {
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
		};
	} );

	const { updateSiteGenErrorStatus } = useDispatch( nfdOnboardingStore );

	const navigate = useNavigate();

	const navigateBack = () => {
		if ( true === siteGenErrorStatus ) {
			updateSiteGenErrorStatus( false );
		}

		navigate( path, { state: { origin: 'header' } } );
	};

	return (
		<ButtonDark onClick={ navigateBack } variant="secondary">
			<Icon icon={ chevronLeft } />
			{ __( 'Back', 'wp-module-onboarding' ) }
		</ButtonDark>
	);
};

const StepNavigation = () => {
	const { previousStep, currentStep } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
		};
	}, [] );

	const isFirstStep = null === previousStep || false === previousStep;
	const isPreviewStep = currentStep?.path === stepSiteGenPreview?.path;

	return (
		<div className="nfd-onboarding-header--sitegen__step-navigation">
			{ isFirstStep ? (
				<></>
			) : (
				<Back
					path={
						isPreviewStep
							? stepSiteGenSiteLogo.path
							: previousStep.path
					}
				/>
			) }
		</div>
	);
};

export default StepNavigation;
