/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef } from '@wordpress/element';

/**
 * External dependencies
 */
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

/**
 * Internal dependencies
 */
import Spinner from '@/components/progress/Spinner.jsx';
import TaskStatusIcon from '@/components/progress/TaskStatusIcon.jsx';
import CyclingLabel from '@/components/progress/CyclingLabel.jsx';
import { iconBase } from '@/components/constants.js';

const STATUS_CLASS = {
	pending: 'nfd-opacity-[0.45]',
	skipped: 'nfd-opacity-50',
};

/**
 * TaskProgress — a collapsible panel showing task progress.
 *
 * @param {Object}                   props                 - The component props.
 * @param {string}                   props.title           - Title shown when expanded.
 * @param {Array}                    props.tasks           - Array of { key, label, status, result } objects.
 * @param {boolean}                  props.defaultExpanded - Whether to start expanded (default: false).
 * @param {'discovery'|'generation'} props.variant         - Render variant (default: 'discovery').
 * @return {JSX.Element} The TaskProgress component.
 */
const TaskProgress = ( { title, tasks = [], defaultExpanded = false, variant = 'discovery' } ) => {
	const isActive = tasks.some( ( t ) => t.status === 'running' || t.status === 'pending' );
	const allDone =
		tasks.length > 0 && tasks.every( ( t ) => t.status === 'done' || t.status === 'skipped' );
	const [ expanded, setExpanded ] = useState( defaultExpanded );
	const userToggledRef = useRef( false );
	const prevActiveRef = useRef( false );

	useEffect( () => {
		if ( isActive && ! prevActiveRef.current && ! userToggledRef.current ) {
			setExpanded( true );
		}
		if ( allDone && ! userToggledRef.current ) {
			setExpanded( false );
		}
		prevActiveRef.current = isActive;
	}, [ isActive, allDone ] );

	const doneCount = tasks.filter( ( t ) => t.status === 'done' ).length;
	const hasProgress = doneCount > 0 && tasks.length > 0;
	const progressSuffix = hasProgress ? ` — ${ doneCount }/${ tasks.length } complete` : '';

	return (
		<div className="nfd-task-progress nfd-self-start nfd-shrink-0 nfd-w-[85%] nfd-rounded-2xl nfd-bg-white nfd-border nfd-border-solid nfd-border-[rgba(0,0,0,0.08)] nfd-overflow-hidden nfd-antialiased">
			<button
				className="nfd-task-progress__header nfd-flex nfd-items-center nfd-gap-2 nfd-w-full nfd-border-0 nfd-bg-transparent nfd-cursor-pointer nfd-text-left nfd-outline-none nfd-min-h-12 nfd-box-border nfd-py-3 nfd-px-4 nfd-text-[15px] nfd-leading-6 nfd-text-[rgb(31,31,31)] hover:nfd-bg-[rgba(0,0,0,0.02)]"
				onClick={ () => {
					userToggledRef.current = true;
					setExpanded( ( prev ) => ! prev );
				} }
				type="button"
			>
				{ isActive && <Spinner /> }
				{ allDone && (
					<span className={ `${ iconBase } nfd-text-emerald-500` }>
						<Check size={ 14 } />
					</span>
				) }
				<div className="nfd-flex-1 nfd-min-w-0 nfd-overflow-hidden nfd-relative nfd-h-6">
					{ expanded && `${ title }${ progressSuffix }` }
					{ ! expanded && allDone && `${ title }${ progressSuffix }` }
					{ ! expanded && ! allDone && <CyclingLabel tasks={ tasks } /> }
				</div>
				<motion.span
					className="nfd-inline-flex nfd-shrink-0 nfd-text-[rgba(0,0,0,0.35)]"
					animate={ { rotate: expanded ? 180 : 0 } }
					transition={ { duration: 0.2 } }
				>
					<ChevronDown size={ 16 } />
				</motion.span>
			</button>

			<AnimatePresence>
				{ expanded && (
					<motion.div
						initial={ { height: 0, opacity: 0 } }
						animate={ { height: 'auto', opacity: 1 } }
						exit={ { height: 0, opacity: 0 } }
						transition={ { duration: 0.25 } }
						className="nfd-py-2 nfd-px-3.5 nfd-overflow-hidden"
					>
						<ul className="nfd-task-progress__list nfd-list-none nfd-m-0 nfd-p-0 nfd-flex nfd-flex-col nfd-gap-2 nfd-whitespace-normal nfd-max-h-[300px] nfd-overflow-y-auto">
							{ tasks.map( ( task ) => (
								<li
									key={ task.key }
									className={ `nfd-flex nfd-items-start nfd-gap-2 nfd-text-sm nfd-leading-5 nfd-transition-opacity nfd-duration-200 ${
										STATUS_CLASS[ task.status ] || ''
									}` }
								>
									<TaskStatusIcon status={ task.status } />
									{ variant === 'discovery' ? (
										<div className="nfd-flex nfd-flex-col nfd-gap-1 nfd-min-w-0">
											<span className="nfd-font-medium">{ task.label }</span>
											{ task.status === 'done' && task.result && (
												<span className="nfd-font-normal nfd-text-xs nfd-leading-5 nfd-text-[rgba(0,0,0,0.4)]">
													{ task.result }
												</span>
											) }
										</div>
									) : (
										<div className="nfd-flex nfd-items-baseline nfd-gap-1.5 nfd-min-w-0">
											<span className="nfd-font-medium">{ task.label }</span>
											{ task.status === 'running' && task.description && (
												<span className="nfd-font-normal nfd-text-xs nfd-text-[rgba(0,0,0,0.4)]">
													{ task.description }
												</span>
											) }
										</div>
									) }
								</li>
							) ) }
						</ul>
					</motion.div>
				) }
			</AnimatePresence>
		</div>
	);
};

export default TaskProgress;
