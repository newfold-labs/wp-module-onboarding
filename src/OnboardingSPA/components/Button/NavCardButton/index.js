import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import Button from '../../Button';

/**
 * Navigation Button Component on Card
 *
 * @returns
 */

const NavCardButton = ({ text, disabled, onClick }) => {
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
		if(onClick) onClick();
		navigate(nextStep.path);
	};

	return (
		<Button
			className="nfd-nav-card-button"
			text={text}
			handleClick={handleBtnClick}
			disabled={disabled}
		/>
	);
};

export default NavCardButton;
