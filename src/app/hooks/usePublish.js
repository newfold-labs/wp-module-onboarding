/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { createPublishTasks } from '@/hooks/publish/tasks';
import { STEP_RUNNERS } from '@/hooks/publish/steps';

/**
 * usePublish hook
 *
 * Auto-runs sequential publishing steps when mounted with valid data.
 * Each step creates WordPress content using the generation/discovery data.
 *
 * @param {Object} generationData Data from sitegen_content_generation_completed.
 * @param {Object} discoveryData  Data collected during the discovery phase.
 * @return {Object} { tasks, isComplete }
 */
const usePublish = ( generationData, discoveryData ) => {
	const [ tasks, setTasks ] = useState( createPublishTasks );
	const [ isComplete, setIsComplete ] = useState( false );
	const hasStarted = useRef( false );

	const updateTask = useCallback( ( key, status, result = null ) => {
		setTasks( ( prev ) =>
			prev.map( ( t ) =>
				t.key === key ? { ...t, status, result } : t
			)
		);
	}, [] );

	useEffect( () => {
		if ( hasStarted.current || ! generationData ) {
			return;
		}
		hasStarted.current = true;
		console.log('generationData', generationData);
		const run = async () => {
			const ctx = { createdPages: [] };

			for ( const [ key, stepFn ] of STEP_RUNNERS ) {
				updateTask( key, 'running' );
				try {
					const result = await stepFn( {
						generationData,
						discoveryData,
						ctx,
					} );
					updateTask( key, 'done', result );
				} catch ( err ) {
					// eslint-disable-next-line no-console
					console.error( `[Publish] ${ key } error`, err );
					updateTask( key, 'failed', 'Failed' );
				}
			}

			setIsComplete( true );
		};

		run();
	}, [ generationData, discoveryData, updateTask ] );

	return { tasks, isComplete };
};

export default usePublish;
