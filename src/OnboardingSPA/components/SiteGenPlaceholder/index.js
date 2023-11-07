import { useNavigate } from 'react-router-dom';

import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { store as nfdOnboardingStore } from '../../store';

const SiteGenPlaceholder = ( { heading } ) => {
	const navigate = useNavigate();
	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );
	return (
		<div className="nfd-onboarding-placeholder--site-gen">
			<h1 className="nfd-onboarding-placeholder--site-gen__heading">
				{ heading }
			</h1>
			<Button
				className="nfd-onboarding-placeholder--site-gen__button"
				onClick={ () => {
					navigate( nextStep.path );
				} }
			>
				Go Next
			</Button>
		</div>
	);
};

export default SiteGenPlaceholder;
