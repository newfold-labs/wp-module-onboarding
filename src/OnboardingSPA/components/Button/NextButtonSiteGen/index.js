import { useNavigate } from 'react-router-dom';

import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { store as nfdOnboardingStore } from '../../../store';
import classNames from 'classnames';

const NextButtonSiteGen = ( { text, className } ) => {
	const navigate = useNavigate();
	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );
	return (
		<Button
			className={ classNames(
				'nfd-onboarding-button--site-gen-next',
				className
			) }
			onClick={ () => {
				if ( nextStep ) {
					navigate( nextStep.path );
				}
			} }
		>
			{ text }
		</Button>
	);
};

export default NextButtonSiteGen;
