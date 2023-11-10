import { useSelect } from '@wordpress/data';
import { Icon, chevronRight, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import ButtonDark from '../../../../components/Button/ButtonDark';
// import {ReactComponent as Equalizer} from '../../../../static/icons/equalizer.svg'

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const Customize = ( ) => {
	const customize = () => {
		alert('customize');
	};
	return (
		<ButtonDark onClick={ customize } variant="secondary">
			<Icon icon={ settings } />
			{ __( 'Customize', 'wp-module-onboarding' ) }
		</ButtonDark>
	);
};

const Save = () => {
	const save = () => {
		alert('save');
	};
	return (
		<ButtonDark onClick={ save } variant="secondary">
			{ __( 'Save & Continue', 'wp-module-onboarding' ) }
			<Icon icon={ chevronRight } />
		</ButtonDark>
	);
};

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationRight = () => {
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );
	
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<Customize />
			<Save />
		</div>
	);
};

export default StepNavigationRight;
