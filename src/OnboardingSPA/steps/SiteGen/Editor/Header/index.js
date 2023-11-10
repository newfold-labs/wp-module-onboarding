import { memo } from '@wordpress/element';
import { Fill } from '@wordpress/components';
import {
	HEADER_CENTER,
	HEADER_SITEGEN,
	HEADER_START,
	HEADER_END,
} from '../../../../../constants';

import StepNavigationLeft from './step-navigation-left';
import StepNavigationCenter from './step-navigation-center';
import StepNavigationRight from './step-navigation-right';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const Header = () => {
	return (
		<>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
				<StepNavigationLeft />
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_CENTER }` }>
				<StepNavigationCenter />
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_END }` }>
				<StepNavigationRight />
			</Fill>
		</>
	);
};

export default memo( Header );