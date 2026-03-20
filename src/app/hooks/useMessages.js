/**
 * WordPress dependencies
 */
import { useCallback, useState, useRef, useEffect } from '@wordpress/element';

/**
 * Hook for managing a message list with task-aware mutations.
 *
 * @return {Object} Message state and mutation helpers.
 */
const useMessages = () => {
	const [ messages, setMessages ] = useState( [] );
	const messagesEndRef = useRef( null );
	const nextIdRef = useRef( 1 );

	const getNextId = useCallback( () => {
		return nextIdRef.current++;
	}, [] );

	// Auto-scroll to bottom when messages change.
	useEffect( () => {
		messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
	}, [ messages ] );

	const addMessage = useCallback(
		( msg ) => {
			const id = msg.id ?? getNextId();
			setMessages( ( prev ) => [ ...prev, { ...msg, id } ] );
			return id;
		},
		[ getNextId ]
	);

	const patchMessage = useCallback( ( msgId, patch ) => {
		setMessages( ( prev ) =>
			prev.map( ( msg ) => ( msg.id === msgId ? { ...msg, ...patch } : msg ) )
		);
	}, [] );

	const completeTask = useCallback( ( msgId, taskKey, result ) => {
		setMessages( ( prev ) =>
			prev.map( ( msg ) => {
				if ( msg.id !== msgId || ! msg.tasks ) {
					return msg;
				}
				return {
					...msg,
					tasks: msg.tasks.map( ( t ) =>
						t.key === taskKey ? { ...t, status: 'done', result } : t
					),
				};
			} )
		);
	}, [] );

	const startAllTasks = useCallback( ( msgId ) => {
		setMessages( ( prev ) =>
			prev.map( ( msg ) => {
				if ( msg.id !== msgId || ! msg.tasks ) {
					return msg;
				}
				return {
					...msg,
					tasks: msg.tasks.map( ( t ) => ( {
						...t,
						status: t.status === 'pending' ? 'running' : t.status,
					} ) ),
				};
			} )
		);
	}, [] );

	const finishAllTasks = useCallback( ( msgId ) => {
		setMessages( ( prev ) =>
			prev.map( ( msg ) => {
				if ( msg.id !== msgId || ! msg.tasks ) {
					return msg;
				}
				return {
					...msg,
					isTyping: false,
					tasks: msg.tasks.map( ( t ) => ( t.status !== 'done' ? { ...t, status: 'done' } : t ) ),
				};
			} )
		);
	}, [] );

	const resetMessages = useCallback( () => {
		setMessages( [] );
		nextIdRef.current = 1;
	}, [] );

	return {
		messages,
		setMessages,
		messagesEndRef,
		getNextId,
		addMessage,
		patchMessage,
		completeTask,
		startAllTasks,
		finishAllTasks,
		resetMessages,
	};
};

export default useMessages;
