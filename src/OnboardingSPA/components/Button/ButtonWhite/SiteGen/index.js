import { Button } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import classNames from 'classnames';

const ButtonSiteGen = ( { className, value, text, onClick, icon } ) => {
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
