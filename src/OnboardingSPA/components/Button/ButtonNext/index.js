import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { Icon, chevronRight } from '@wordpress/icons';

import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';

const ButtonNext = ( { disabled = false } ) => {
	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );
	/* [TODO]: some sense of isStepComplete to enable/disable */
	const navigate = useNavigate();
	const navigateNext = () => {
		if ( disabled ) {
			return;
		}

		navigate( nextStep.path, { state: { origin: 'header' } } );
	};
	return (
		<Button
			onClick={ () => navigateNext() }
			className={ classNames( 'nfd-onboarding-button--next', {
				'nfd-onboarding-button--next--disabled': disabled,
			} ) }
		>
			<span className="nfd-onboarding-button--next__text">
				{ __( 'Next', 'wp-module-onboarding' ) }
			</span>
			<Icon
				className="nfd-onboarding-button--next__icon"
				icon={ chevronRight }
			/>
		</Button>
	);
};

export default ButtonNext;
