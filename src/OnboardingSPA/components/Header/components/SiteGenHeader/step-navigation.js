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
import { stepSiteGenEditor } from '../../../../steps/SiteGen/Editor/step';

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
	const isEditorStep = currentStep?.path === stepSiteGenEditor?.path;
	return (
		<div className="nfd-onboarding-header--sitegen__step-navigation">
			{ isFirstStep || isEditorStep ? (
				<></>
			) : (
				<Back path={ previousStep.path } />
			) }
		</div>
	);
};

export default StepNavigation;
