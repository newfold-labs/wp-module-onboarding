import { Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const LeftIconButton = ( { icon, title } ) => {
	return (
		<Button
        className="nfd-sitegen-header-navigation-buttons"
		variant="primary"
		>
		    <Icon icon={ icon } />
            { title }
		</Button>
	);
};

export default LeftIconButton;