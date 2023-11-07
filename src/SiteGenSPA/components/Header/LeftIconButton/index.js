import { Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { addThemeSuffix } from '../../../utils/helper';

const LeftIconButton = ( { icon, title } ) => {
	return (
		<Button
        className={ addThemeSuffix( 'nfd-sitegen-header-navigation-buttons' ) }
		variant="primary"
		>
		    <Icon icon={ icon } />
            { title }
		</Button>
	);
};

export default LeftIconButton;