import { memo } from '@wordpress/element';
import { Fill } from '@wordpress/components';
import { useLocation } from 'react-router-dom';

import HeaderEnd from './HeaderEnd';
import ExitToWordPress from '../../../ExitToWordPress';
import {
	HEADER_START,
	HEADER_END,
	HEADER_SITEBUILD,
} from '../../../../../constants';
import { stepWelcome } from '../../../../steps/GetStarted/Welcome/step';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const SiteBuildHeader = () => {
	const location = useLocation();
	const isGettingStarted = stepWelcome.path === location?.pathname;

	return (
		<>
			<Fill name={ `${ HEADER_SITEBUILD }/${ HEADER_START }` }>
				{ isGettingStarted ? (
					<ExitToWordPress origin="header-first-step" />
				) : null }
			</Fill>
			<Fill name={ `${ HEADER_SITEBUILD }/${ HEADER_END }` }>
				<HeaderEnd />
			</Fill>
		</>
	);
};

export default memo( SiteBuildHeader );
