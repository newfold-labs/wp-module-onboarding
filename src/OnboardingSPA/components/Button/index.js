/**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @return Button
 */

const Button = ( { children, handleClick, disabled, className } ) => {
	const handleBtnClick = () => {
		handleClick();
	};

	return (
		<button
			type="button"
			className={ `${ className } nfd-card-button` }
			onClick={ handleBtnClick }
			disabled={ disabled }
		>
			{ children }
		</button>
	);
};

export default Button;
