/**
 * External dependencies
 */
import { Check, Circle, Minus } from 'lucide-react';

/**
 * Internal dependencies
 */
import { ICON_SIZE, iconBase } from '@/components/constants.js';
import Spinner from '@/components/progress/Spinner.jsx';

const TaskStatusIcon = ( { status } ) => {
	if ( status === 'done' ) {
		return (
			<span className={ `${ iconBase } nfd-mt-[3px] nfd-text-emerald-500` }>
				<Check size={ ICON_SIZE } />
			</span>
		);
	}

	if ( status === 'running' ) {
		return <Spinner className="nfd-mt-[3px]" />;
	}

	if ( status === 'failed' ) {
		return (
			<span className={ `${ iconBase } nfd-mt-[3px] nfd-text-red-500` }>
				<Minus size={ ICON_SIZE } />
			</span>
		);
	}

	if ( status === 'skipped' ) {
		return (
			<span className={ `${ iconBase } nfd-mt-[3px] nfd-text-[rgba(0,0,0,0.25)]` }>
				<Minus size={ ICON_SIZE } />
			</span>
		);
	}

	return (
		<span className={ `${ iconBase } nfd-mt-[3px] nfd-text-[rgba(0,0,0,0.2)]` }>
			<Circle size={ ICON_SIZE } />
		</span>
	);
};

export default TaskStatusIcon;
