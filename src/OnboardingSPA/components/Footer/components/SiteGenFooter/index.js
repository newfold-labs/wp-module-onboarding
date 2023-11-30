import { Fill } from '@wordpress/components';
import { FOOTER_SITEGEN, FOOTER_START } from '../../../../../constants';
import ToggleDarkMode from '../../../ToggleDarkMode';

const SiteGenFooter = () => {
	return (
		<>
			<Fill name={ `${ FOOTER_SITEGEN }/${ FOOTER_START }` }>
				<ToggleDarkMode />
			</Fill>
		</>
	);
};

export default SiteGenFooter;
