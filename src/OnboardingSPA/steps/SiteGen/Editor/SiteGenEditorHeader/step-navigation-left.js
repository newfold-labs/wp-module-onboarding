import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Icon, chevronLeft, reusableBlock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import ButtonDark from '../../../../components/Button/ButtonDark';

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
		<ButtonDark className='navigation-buttons' onClick={ navigateBack } variant="secondary">
			<Icon icon={ chevronLeft } />
			{ __( 'Back', 'wp-module-onboarding' ) }
		</ButtonDark>
	);
};

const Regenerate = () => {
	const regenerate = () => {
		alert('regenerate');
	};
	return (
		<ButtonDark onClick={ regenerate } variant="secondary">
			<Icon icon={ reusableBlock } />
			{ __( 'Regenerate', 'wp-module-onboarding' ) }
		</ButtonDark>
	);
};

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationLeft = () => {
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );
	
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<Back
				path={ previousStep.path }
				showErrorDialog={ showErrorDialog }
			/>
			<Regenerate />
		</div>
	);
};

export default StepNavigationLeft;
