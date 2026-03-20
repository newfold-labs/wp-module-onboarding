/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * Internal dependencies
 */
import { iconBase } from '@/components/constants.js';
import Spinner from '@/components/progress/Spinner.jsx';
import TaskStatusIcon from '@/components/progress/TaskStatusIcon.jsx';
import usePublish from '@/hooks/usePublish';

/**
 * PublishProgress — auto-runs publishing steps sequentially when mounted.
 *
 * @param {Object}   props                Props.
 * @param {Object}   props.generationData Data from the generation phase.
 * @param {Object}   props.discoveryData  Data from the discovery phase.
 * @param {Function} props.onComplete     Callback when all tasks finish.
 * @return {JSX.Element} The PublishProgress component.
 */
const PublishProgress = ( { generationData, discoveryData, onComplete } ) => {
	const { tasks, isComplete } = usePublish( generationData, discoveryData );
	const [ expanded, setExpanded ] = useState( true );
	const userToggledRef = useRef( false );
	const didNotifyRef = useRef( false );

	useEffect( () => {
		if ( isComplete && ! userToggledRef.current ) {
			setExpanded( false );
		}
		if ( isComplete && ! didNotifyRef.current ) {
			didNotifyRef.current = true;
			onComplete?.();
		}
	}, [ isComplete, onComplete ] );

	const visibleTasks = tasks.filter( ( t ) => t.status !== 'pending' );
	const doneCount = tasks.filter( ( t ) => t.status === 'done' || t.status === 'failed' ).length;
	const progressSuffix = doneCount > 0 ? ` — ${ doneCount }/${ tasks.length }` : '';

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
				{ ! isComplete && <Spinner /> }
				{ isComplete && (
					<span className={ `${ iconBase } nfd-text-emerald-500` }>
						<Check size={ 14 } />
					</span>
				) }
				<span className="nfd-flex-1 nfd-font-medium">
					{ isComplete
						? __( 'Publishing complete', 'wp-module-onboarding' ) + progressSuffix
						: __( 'Publishing your site', 'wp-module-onboarding' ) + progressSuffix }
				</span>
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
						className="nfd-pt-0 nfd-px-3.5 nfd-pb-3 nfd-overflow-hidden"
					>
						<ul className="nfd-task-progress__list nfd-list-none nfd-m-0 nfd-p-0 nfd-flex nfd-flex-col nfd-gap-3 nfd-whitespace-normal nfd-max-h-[300px] nfd-overflow-y-auto">
							<AnimatePresence>
								{ visibleTasks.map( ( task ) => (
									<motion.li
										key={ task.key }
										initial={ { opacity: 0, height: 0 } }
										animate={ { opacity: 1, height: 'auto' } }
										transition={ { duration: 0.25 } }
										className="nfd-flex nfd-items-start nfd-gap-2 nfd-text-sm nfd-leading-5"
									>
										<TaskStatusIcon status={ task.status } />
										<span className="nfd-font-medium">{ task.label }</span>
									</motion.li>
								) ) }
							</AnimatePresence>
						</ul>
					</motion.div>
				) }
			</AnimatePresence>
		</div>
	);
};

export default PublishProgress;
