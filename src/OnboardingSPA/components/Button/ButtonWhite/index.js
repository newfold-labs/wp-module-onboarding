import { Button } from '@wordpress/components';

const ButtonWhite = ( {
	className = 'nfd-onboarding-button--white',
	text,
	onClick = false,
} ) => {
	return (
		<Button
			className={ className }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonWhite;
