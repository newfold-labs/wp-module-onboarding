import { Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { addThemeSuffix } from '../../../utils/helper';

const RightIconButton = ( { icon, title } ) => {
	return (
		<Button
        className={ addThemeSuffix( 'nfd-sitegen-header-navigation-buttons' ) }
		variant="primary"
		>
			{ title }
		    <Icon icon={ icon } />
		</Button>
	);
};

export default RightIconButton;