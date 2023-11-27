import { useSelect } from '@wordpress/data';
import { Icon, chevronRight, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import classNames from 'classnames';

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
		<div
			role="button"
			tabIndex="0"
			onClick={ customize }
			onKeyDown={ ( event ) => {
				if ( event.key === 'Enter' ) {
					customize();
				}
			} }
			aria-label="Customize"
			className={ classNames('navigation-buttons-editor__customize', 'navigation-buttons-editor') }
		>
			<Icon icon={ settings } />
			{ __( 'Customize', 'wp-module-onboarding' ) }
		</div>
	);
};

const Save = () => {
	const save = () => {
		alert('save');
	};
	return (
		<div
			role="button"
			tabIndex="0"
			onClick={ save }
			onKeyDown={ ( event ) => {
				if ( event.key === 'Enter' ) {
					save();
				}
			} }
			aria-label="Save"
			className={ classNames('navigation-buttons-editor') }
		>
			<span className='navigation-buttons-editor__continue'>
				{/* { __( 'Save & Continue', 'wp-module-onboarding' ) } */}
			</span>
			<Icon icon={ chevronRight } />
		</div>
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
