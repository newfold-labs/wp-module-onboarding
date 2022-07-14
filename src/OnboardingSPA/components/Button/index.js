/**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @returns Button
 */

const Button = ({ text, handleClick, disabled, className }) => {
	const handleBtnClick = () => {
		handleClick();
	};

	return (
		<button
			type="button"
			className={`${className} nfd-card-button`}
			onClick={handleBtnClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
