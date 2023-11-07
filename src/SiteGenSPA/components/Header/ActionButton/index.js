import { Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const ActionButton = ( { icon, title } ) => {
	return (
		<Button
        className="navigation-buttons navigation-buttons_back"
		variant="secondary"
		>
		    <Icon icon={ icon } />
            { title }
		</Button>
	);
};

export default ActionButton;