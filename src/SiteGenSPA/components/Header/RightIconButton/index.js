import { Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const RightIconButton = ( { icon, title } ) => {
	return (
		<Button
        className="nfd-sitegen-header-navigation-buttons"
		variant="primary"
		>
			{ title }
		    <Icon icon={ icon } />
		</Button>
	);
};

export default RightIconButton;