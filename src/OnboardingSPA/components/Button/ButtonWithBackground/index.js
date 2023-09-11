import { Button } from '@wordpress/components';
import classNames from 'classnames';

const ButtonWithBackground = ( { className, text, onClick = false } ) => {
	return (
		<Button
			variant="primary"
			className={ classNames( 'nfd-onboarding-button--background', className ) }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonWithBackground;
