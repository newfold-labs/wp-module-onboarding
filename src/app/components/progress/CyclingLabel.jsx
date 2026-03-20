/**
 * External dependencies
 */
import { AnimatePresence, motion } from 'motion/react';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef } from '@wordpress/element';

const cyclingTextClass = 'nfd-block nfd-whitespace-nowrap nfd-overflow-hidden nfd-text-ellipsis';

const CyclingLabel = ( { tasks } ) => {
	const activeTasks = tasks.filter( ( t ) => t.status === 'running' || t.status === 'pending' );
	const [ index, setIndex ] = useState( 0 );
	const intervalRef = useRef( null );

	useEffect( () => {
		setIndex( 0 );

		if ( activeTasks.length <= 1 ) {
			return;
		}
		intervalRef.current = setInterval( () => {
			setIndex( ( prev ) => ( prev + 1 ) % activeTasks.length );
		}, 4000 );
		return () => clearInterval( intervalRef.current );
	}, [ activeTasks.length ] );

	if ( activeTasks.length === 0 ) {
		const doneCount = tasks.filter( ( t ) => t.status === 'done' ).length;
		return (
			<span className={ cyclingTextClass }>{ `${ doneCount }/${ tasks.length } complete` }</span>
		);
	}

	const current = activeTasks[ index % activeTasks.length ];

	return (
		<AnimatePresence mode="wait">
			<motion.span
				key={ current?.key }
				className={ cyclingTextClass }
				initial={ { opacity: 0 } }
				animate={ { opacity: 1 } }
				exit={ { opacity: 0 } }
				transition={ { duration: 0.4 } }
			>
				{ current?.label }...
			</motion.span>
		</AnimatePresence>
	);
};

export default CyclingLabel;
