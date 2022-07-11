 /**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @returns Button
 */

const Button = ({text, handleClick, disabled}) => {

    const handleBtnClick = () => {
        handleClick();
    }

	return (
    <button 
        type="button" 
        className="nfd-steps-card-large-button" 
        onClick={handleBtnClick}
        disabled={disabled}
      >
      {text}
    </button>

	);
};

export default Button;
