/**
 * WordPress dependencies
 */
import { useCallback, useState, useRef, useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

/**
 * Internal dependencies
 */
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import {
	ACTION_ONBOARDING_STARTED,
	ACTION_ONBOARDING_COMPLETE,
	ACTION_ONBOARDING_RESTARTED,
	ACTION_INTAKE_PROMPT_SET,
	ACTION_SITEGEN_SITE_GENERATION_TIME,
	ACTION_ERROR_STATE_TRIGGERED,
} from '@/utils/analytics/hiive/constants';
import { handshake, intake, startGeneration, streamSSE } from '@/utils/api/ai-platform';
import { initializeEcommercePlugins } from '@/utils/api/wordpress';
import formatTaskResult from '@/utils/helpers/formatTaskResult';
import useMessages from '@/hooks/useMessages';
import {
	MAX_RETRIES,
	EVENT_TO_TASK_KEY,
	GENERATION_ITEM_KEY_MAP,
	GENERATION_TASK_KEYS,
	createInitialTasks,
	createGenerationTasks,
} from '@/hooks/chat/tasks';

/**
 * useChat hook
 *
 * Manages the intake conversation → discovery → generation → auto-publish flow.
 * Chat input is only enabled when the agent asks the user a question.
 *
 * @return {Object} The useChat hook.
 */
const useChat = () => {
	const [ prompt, setPrompt ] = useState( '' );
	const [ mode, setMode ] = useState( () =>
		window.nfdOnboarding?.origin?.prompt ? 'chat' : 'prompt'
	);
	const [ chatInput, setChatInput ] = useState( '' );
	const [ isWaiting, setIsWaiting ] = useState( false );
	const [ inputEnabled, setInputEnabled ] = useState( false );
	const siteIdRef = useRef( null );
	const abortRef = useRef( null );
	const originalPromptRef = useRef( '' );
	const conversationRef = useRef( [] );
	const generationDataRef = useRef( null );
	const discoveryDataRef = useRef( {} );
	const retryCountRef = useRef( 0 );
	const startTimeRef = useRef( null );

	const {
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
	} = useMessages();

	// Abort any in-flight stream on unmount.
	useEffect( () => {
		return () => {
			abortRef.current?.abort();
		};
	}, [] );

	const handleDiscoveryEvent = useCallback(
		( msgId, event, data ) => {
			const taskKey = EVENT_TO_TASK_KEY[ event ];
			if ( taskKey ) {
				completeTask( msgId, taskKey, formatTaskResult( taskKey, data ) );
				return;
			}

			if ( event === 'sitegen_discovery_completed' ) {
				finishAllTasks( msgId );
			}
		},
		[ completeTask, finishAllTasks ]
	);

	/**
	 * Run the SSE stream for discovery + generation.
	 */
	const runStream = useCallback(
		async ( discoveryMsgId ) => {
			const controller = new AbortController();
			abortRef.current = controller;

			let generationMsgId = null;

			try {
				const validConversation = conversationRef.current.filter( ( msg ) => msg.content );
				const response = await startGeneration(
					siteIdRef.current,
					originalPromptRef.current,
					controller.signal,
					validConversation.length ? validConversation : null
				);

				await streamSSE( response, ( { event, data } ) => {
					if ( event === 'sitegen_started' ) {
						dispatch( nfdOnboardingStore ).setSiteGenId( data );
						return;
					}

					// Side-effect dispatches for these two events; fall through to the
					// EVENT_TO_TASK_KEY block below so the corresponding task is also completed.
					if ( event === 'sitegen_discovery_prompt_enhance_completed' ) {
						dispatch( nfdOnboardingStore ).setEnhancedPrompt( data );
					}

					if ( event === 'sitegen_discovery_site_type_completed' ) {
						dispatch( nfdOnboardingStore ).setSiteType( data );
					}

					// --- Discovery phase events ---
					if ( event === 'sitegen_discovery_started' ) {
						startAllTasks( discoveryMsgId );
						return;
					}

					const discoveryTaskKey = EVENT_TO_TASK_KEY[ event ];
					if ( discoveryTaskKey ) {
						if (
							discoveryTaskKey === 'brand_identity' ||
							discoveryTaskKey === 'sitemap' ||
							discoveryTaskKey === 'site_type'
						) {
							try {
								discoveryDataRef.current[ discoveryTaskKey ] =
									typeof data === 'string' ? JSON.parse( data ) : data;
							} catch {
								discoveryDataRef.current[ discoveryTaskKey ] = data;
							}
							if ( discoveryTaskKey === 'site_type' && discoveryDataRef.current.site_type === 'eCommerce' ) {
								initializeEcommercePlugins();
							}
						}

						handleDiscoveryEvent( discoveryMsgId, event, data );
						return;
					}

					if ( event === 'sitegen_discovery_completed' ) {
						finishAllTasks( discoveryMsgId );
						dispatch( nfdOnboardingStore ).setDiscoveryData( data );

						addMessage( {
							role: 'assistant',
							content: 'Now building your site...',
						} );

						generationMsgId = getNextId();
						addMessage( {
							id: generationMsgId,
							role: 'generation',
							title: 'Site generation',
							tasks: createGenerationTasks(),
						} );
						return;
					}

					// --- Generation phase events ---
					if ( event === 'sitegen_content_generation_started' ) {
						if ( generationMsgId ) {
							startAllTasks( generationMsgId );
						}
						return;
					}

					// Two backend event shapes complete a generation task:
					//   sitegen_content_generation_item<key>_completed — needs key remap
					//   sitegen_sitekit_step_<key>                     — suffix is already the task key
					const taskEventMatch = event.match(
						/^sitegen_content_generation_item(.+)_completed$|^sitegen_sitekit_step_(.+)$/
					);
					if ( taskEventMatch && generationMsgId ) {
						const [ , genKey, stepKey ] = taskEventMatch;
						const taskKey = genKey
							? GENERATION_ITEM_KEY_MAP[ genKey ]
							: GENERATION_TASK_KEYS.has( stepKey )
								? stepKey
								: null;
						if ( taskKey ) {
							completeTask( generationMsgId, taskKey, 'Done' );
						}
						return;
					}

					if ( event === 'sitegen_content_generation_completed' ) {
						try {
							generationDataRef.current = typeof data === 'string' ? JSON.parse( data ) : data;
						} catch {
							// eslint-disable-next-line no-console
							console.error( '[SSE] Failed to parse generation data' );
						}

						if ( generationMsgId ) {
							finishAllTasks( generationMsgId );
						}
						return;
					}

					if ( event === 'sitegen_completed' ) {
						retryCountRef.current = 0;

						if ( startTimeRef.current ) {
							const elapsed = Math.round( ( Date.now() - startTimeRef.current ) / 1000 );
							sendOnboardingEvent(
								new OnboardingEvent( ACTION_SITEGEN_SITE_GENERATION_TIME, `${ elapsed }s` )
							);
						}
						sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_COMPLETE, 'ai_chat' ) );

						addMessage( {
							role: 'assistant',
							content: 'Your site is ready! Publishing now...',
						} );

						addMessage( {
							role: 'publish',
							generationData: generationDataRef.current,
							discoveryData: {
								...discoveryDataRef.current,
							},
						} );
					}
				} );

				// Stream ended normally — mark any leftover tasks as skipped.
				setMessages( ( prev ) =>
					prev.map( ( msg ) => {
						if ( msg.id !== discoveryMsgId && msg.id !== generationMsgId ) {
							return msg;
						}
						return {
							...msg,
							isTyping: false,
							tasks: msg.tasks?.map( ( t ) =>
								t.status === 'running' || t.status === 'pending' ? { ...t, status: 'skipped' } : t
							),
						};
					} )
				);
			} catch ( err ) {
				if ( err.name === 'AbortError' ) {
					return;
				}
				// eslint-disable-next-line no-console
				console.error( '[SSE] stream error', err );

				sendOnboardingEvent(
					new OnboardingEvent( ACTION_ERROR_STATE_TRIGGERED, 'stream_error' )
				);

				retryCountRef.current++;

				if ( retryCountRef.current < MAX_RETRIES ) {
					addMessage( {
						role: 'assistant',
						content: 'Something went wrong during site generation. Please try again.',
						action: 'retry',
					} );
				} else {
					addMessage( {
						role: 'assistant',
						content: 'Site generation failed after multiple attempts. Please start over.',
						action: 'restart',
					} );
				}
			} finally {
				setIsWaiting( false );
				abortRef.current = null;
			}
		},
		[ setMessages, startAllTasks, handleDiscoveryEvent, finishAllTasks, addMessage, completeTask, getNextId ]
	);

	/**
	 * Auto-start: when window.nfdOnboarding.origin.prompt is set, skip PromptView
	 * and the intake conversation and jump straight to generation.
	 * The handshake is handled PHP-side so siteId is already in the store.
	 */
	const handleOriginStart = useCallback( () => {
		const originPrompt = window.nfdOnboarding?.origin?.prompt;
		if ( ! originPrompt ) {
			return;
		}

		const userPrompt = originPrompt.trim();
		originalPromptRef.current = userPrompt;
		conversationRef.current = [ { role: 'user', content: userPrompt } ];
		siteIdRef.current = select( nfdOnboardingStore ).getSiteId();

		addMessage( { role: 'user', content: userPrompt } );

		startTimeRef.current = Date.now();
		sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_STARTED ) );
		sendOnboardingEvent( new OnboardingEvent( ACTION_INTAKE_PROMPT_SET, userPrompt ) );

		setIsWaiting( true );

		const discoveryId = getNextId();
		addMessage( {
			id: discoveryId,
			role: 'discovery',
			title: 'Site discovery',
			tasks: createInitialTasks(),
		} );

		runStream( discoveryId );
	}, [ addMessage, getNextId, runStream ] );

	useEffect( () => {
		handleOriginStart();
	}, [ handleOriginStart ] );

	/**
	 * Retry the generation stream with the same site_id and prompt.
	 */
	const handleRetry = useCallback( () => {
		setIsWaiting( true );

		const discoveryId = getNextId();
		addMessage( {
			id: discoveryId,
			role: 'discovery',
			title: 'Site discovery',
			tasks: createInitialTasks(),
		} );

		runStream( discoveryId );
	}, [ getNextId, addMessage, runStream ] );

	/**
	 * Reset everything and go back to the prompt view.
	 */
	const handleRestart = useCallback( () => {
		sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_RESTARTED, 'chat' ) );
		resetMessages();
		setPrompt( '' );
		setChatInput( '' );
		setIsWaiting( false );
		setInputEnabled( false );
		setMode( 'prompt' );
		siteIdRef.current = null;
		originalPromptRef.current = '';
		conversationRef.current = [];
		generationDataRef.current = null;
		discoveryDataRef.current = {};
		retryCountRef.current = 0;
		abortRef.current?.abort();
		abortRef.current = null;
	}, [ resetMessages ] );

	/**
	 * Run the intake agent. Shows understanding, then either asks a question
	 * or starts discovery.
	 */
	const runIntake = useCallback( async () => {
		setIsWaiting( true );
		setInputEnabled( false );

		const controller = new AbortController();
		abortRef.current = controller;

		const typingId = getNextId();
		addMessage( {
			id: typingId,
			role: 'assistant',
			content: '',
			isTyping: true,
		} );

		try {
			const result = await intake(
				siteIdRef.current,
				originalPromptRef.current,
				conversationRef.current.length ? conversationRef.current : null,
				controller.signal
			);

			const { understanding, is_complete: isComplete, question } = result;

			let messageText = understanding || '';
			if ( ! isComplete && question ) {
				messageText += '\n\n' + question;
			}

			if ( messageText ) {
				conversationRef.current = [
					...conversationRef.current,
					{ role: 'assistant', content: messageText },
				];
			}

			if ( isComplete ) {
				patchMessage( typingId, {
					content: understanding,
					isTyping: false,
				} );

				const discoveryId = getNextId();
				addMessage( {
					id: discoveryId,
					role: 'discovery',
					title: 'Site discovery',
					tasks: createInitialTasks(),
				} );

				await runStream( discoveryId );
			} else {
				patchMessage( typingId, {
					content: messageText,
					isTyping: false,
				} );
				setIsWaiting( false );
				setInputEnabled( true );
			}
		} catch ( err ) {
			if ( err.name === 'AbortError' ) {
				return;
			}
			// eslint-disable-next-line no-console
			console.error( '[Intake] error', err );
			sendOnboardingEvent(
				new OnboardingEvent( ACTION_ERROR_STATE_TRIGGERED, 'intake_error' )
			);
			patchMessage( typingId, {
				content: 'Failed to connect to AI platform. Please try again.',
				isTyping: false,
			} );
			setIsWaiting( false );
		}
	}, [ getNextId, addMessage, patchMessage, runStream ] );

	/**
	 * Handle initial prompt submission from the prompt view.
	 */
	const handlePromptSubmit = useCallback( () => {
		if ( ! prompt.trim() || isWaiting ) {
			return;
		}

		const userPrompt = prompt.trim();
		originalPromptRef.current = userPrompt;
		conversationRef.current = [ { role: 'user', content: userPrompt } ];

		addMessage( { role: 'user', content: userPrompt } );
		setMode( 'chat' );
		setPrompt( '' );

		startTimeRef.current = Date.now();
		sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_STARTED ) );
		sendOnboardingEvent( new OnboardingEvent( ACTION_INTAKE_PROMPT_SET, userPrompt ) );

		setIsWaiting( true );
		( async () => {
			try {
				let siteId = select( nfdOnboardingStore ).getSiteId();
				if ( ! siteId ) {
					const response = await handshake();
					siteId = response.site_id;
					dispatch( nfdOnboardingStore ).setSiteId( siteId );
				}

				siteIdRef.current = siteId;

				await runIntake();
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error( '[Handshake] error', err );
				sendOnboardingEvent(
					new OnboardingEvent( ACTION_ERROR_STATE_TRIGGERED, 'handshake_error' )
				);
				addMessage( {
					role: 'assistant',
					content: 'Failed to connect to AI platform. Please try again.',
				} );
				setIsWaiting( false );
			}
		} )();
	}, [ prompt, isWaiting, addMessage, runIntake ] );

	/**
	 * Handle chat replies (user answering the agent's questions).
	 */
	const handleChatSubmit = useCallback( () => {
		if ( ! chatInput.trim() || isWaiting || ! inputEnabled ) {
			return;
		}

		const userText = chatInput.trim();

		conversationRef.current = [ ...conversationRef.current, { role: 'user', content: userText } ];

		addMessage( { role: 'user', content: userText } );
		setChatInput( '' );
		setInputEnabled( false );

		runIntake();
	}, [ chatInput, isWaiting, inputEnabled, addMessage, runIntake ] );

	return {
		mode,
		prompt,
		setPrompt,
		messages,
		messagesEndRef,
		chatInput,
		setChatInput,
		isWaiting,
		inputEnabled,
		handlePromptSubmit,
		handleChatSubmit,
		handleRetry,
		handleRestart,
	};
};

export default useChat;
