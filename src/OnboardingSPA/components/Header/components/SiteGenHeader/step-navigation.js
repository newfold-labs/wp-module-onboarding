import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Icon, chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import ButtonDark from '../../../Button/ButtonDark';

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const Back = ( { path, showErrorDialog } ) => {
	const { setNavErrorContinuePath } = useDispatch( nfdOnboardingStore );
	const navigate = useNavigate();
	const navigateBack = () => {
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
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );
	const isFirstStep = null === previousStep || false === previousStep;
	return (
		<div className="nfd-onboarding-header--sitegen__step-navigation">
			{ isFirstStep ? null : (
				<Back
					path={ previousStep.path }
					showErrorDialog={ showErrorDialog }
				/>
			) }
		</div>
	);
};

export default StepNavigation;
