import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import Button from '../../Button';

/**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @return Button
 */

const NavCardButton = ({ text, disabled }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const { nextStep } = useSelect(
		(select) => {
			return {
				nextStep: select(nfdOnboardingStore).getNextStep(),
			};
		},
		[location.path]
	);

	const handleBtnClick = () => {
		navigate(nextStep.path);
	};

	return (
		<Button
            className='nfd-nav-card-button'
            text={text}
			handleClick={handleBtnClick}
			disabled={disabled}
		/>
	);
};

export default NavCardButton;
