import { memo } from '@wordpress/element';
import { Fill } from '@wordpress/components';

import HeaderEnd from './HeaderEnd';
import { HEADER_END, HEADER_SITEBUILD } from '../../../../../constants';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const SiteBuildHeader = () => {
	return (
		<Fill name={ `${ HEADER_SITEBUILD }/${ HEADER_END }` }>
			<HeaderEnd />
		</Fill>
	);
};

export default memo( SiteBuildHeader );
