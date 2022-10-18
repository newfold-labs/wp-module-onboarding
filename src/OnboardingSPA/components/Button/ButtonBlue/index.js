import { Button } from '@wordpress/components';

const ButtonBlue = ( {
	className = 'nfd-onboarding-button--blue',
	text,
	onClick = false,
} ) => {
	return (
		<Button
			variant="primary"
			className={ className }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonBlue;
