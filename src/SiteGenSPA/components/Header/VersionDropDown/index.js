import { Icon, chevronDown, lock} from '@wordpress/icons';
import { Button } from '@wordpress/components';

const VersionDropDown = ( { title } ) => {
	return (
		<Button
        className="nfd-sitegen-header-navigation-buttons nfd-sitegen-header-navigation-buttons-version"
		variant="primary"
		>
		    <Icon icon={ lock } />
            { title }
			<Icon icon={ chevronDown } />
		</Button>
	);
};

export default VersionDropDown;