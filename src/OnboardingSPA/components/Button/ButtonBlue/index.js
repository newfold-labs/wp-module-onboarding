import { Button } from '@wordpress/components';
import classNames from 'classnames';

const ButtonBlue = ( { className, text, onClick = false } ) => {
	return (
		<Button
			variant="primary"
			className={ classNames( 'nfd-onboarding-button--blue', className ) }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonBlue;
