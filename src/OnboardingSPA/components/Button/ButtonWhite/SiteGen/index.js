import { Button } from '@wordpress/components';
import classNames from 'classnames';

const ButtonSiteGen = ( { className, value, text, onClick } ) => {
	return (
		<Button
			className={ classNames( className ) }
			value={ value }
			onClick={ typeof onClick === 'function' && onClick }
		>
			{ text }
		</Button>
	);
};

export default ButtonSiteGen;
