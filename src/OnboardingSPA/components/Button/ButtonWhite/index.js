import { Button } from '@wordpress/components';
import classNames from 'classnames';

const ButtonWhite = ( { className, text, onClick = false } ) => {
	return (
		<Button
			className={ classNames(
				'nfd-onboarding-button--white',
				className
			) }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonWhite;
