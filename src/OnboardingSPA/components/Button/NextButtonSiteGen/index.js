import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { Icon, chevronRight } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../store';

const NextButtonSiteGen = ( {
	text,
	className,
	callback = null,
	disabled = false,
	showChevronRight = true,
} ) => {
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
				{ 'nfd-onboarding-button--site-gen-next--disabled': disabled },
				className
			) }
			onClick={ () => {
				if ( disabled ) {
					return;
				}
				if ( callback && typeof callback === 'function' ) {
					callback();
				}
				if ( nextStep ) {
					navigate( nextStep.path );
				}
			} }
		>
			{ text }
		{
				showChevronRight && (
				<Icon
					className={ 'nfd-onboarding-button--site-gen-next--icon' }
					icon={ chevronRight }
				/> 
				)
			}
		</Button>
	);
};

export default NextButtonSiteGen;
