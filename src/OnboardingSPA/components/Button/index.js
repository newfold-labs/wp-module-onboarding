/**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @return Button
 */

const Button = ( { text, handleClick, disabled, className } ) => {
	const handleBtnClick = () => {
		if ( handleClick ) {
			handleClick();
		}
	};

	return (
		<button
			type="button"
			className={ `${ className } nfd-card-button` }
			onClick={ handleBtnClick }
			disabled={ disabled }
		>
			{ text }
		</button>
	);
};

export default Button;
