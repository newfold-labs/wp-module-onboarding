import { Button } from '@wordpress/components';
import classNames from 'classnames';

const ButtonDark = ( { children, onClick } ) => {
	return (
		<Button
			onClick={ () => onClick() }
			className={ classNames( 'nfd-onboarding-button--dark' ) }
		>
			{ children }
		</Button>
	);
};

export default ButtonDark;
