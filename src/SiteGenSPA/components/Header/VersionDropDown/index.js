import { Icon, chevronDown, lock} from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { addThemeSuffix } from '../../../utils/helper';

const VersionDropDown = ( { title } ) => {
	return (
		<Button
        className={ addThemeSuffix( 'nfd-sitegen-header-navigation-buttons' ) }
		variant="primary"
		>
		    <Icon icon={ lock } />
            { title }
			<Icon icon={ chevronDown } />
		</Button>
	);
};

export default VersionDropDown;