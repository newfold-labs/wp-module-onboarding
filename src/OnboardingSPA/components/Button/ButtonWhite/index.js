import { Button } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import classNames from 'classnames';

const ButtonWhite = ( { className, text, onClick, icon } ) => {
	return (
		<Button
			className={ classNames(
				'nfd-onboarding-button--white',
				className
			) }
			onClick={ typeof onClick === 'function' && onClick }
		>
			<span className={ `${ className }__text` }>{ text }</span>
			{ icon && (
				<Icon className={ `${ className }__icon` } icon={ icon } />
			) }
		</Button>
	);
};

export default ButtonWhite;
