import { useSelect } from '@wordpress/data';
import { Icon, chevronDown } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import ButtonDark from '../../../../components/Button/ButtonDark';
import {ReactComponent as Wishlist} from '../../../../static/icons/site-features/wishlist.svg'

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const VersionDropDown = ( ) => {
	const version = () => { 
	};
	return (
		<ButtonDark onClick={ version } variant="secondary">
			<Wishlist />
			{ __( 'Version 1', 'wp-module-onboarding' ) }
			<Icon icon={ chevronDown } />
		</ButtonDark>
	);
};

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationCenter = () => {
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );
	
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<VersionDropDown
				path={ previousStep.path }
				showErrorDialog={ showErrorDialog }
			/>
		</div>
	);
};

export default StepNavigationCenter;